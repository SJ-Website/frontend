import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import apiService from '@/services/api';
import { Button } from '../components/ui/button';

const AdminPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [jewelryItems, setJewelryItems] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [role, setRole] = useState('');
  const [notices, setNotices] = useState<any[]>([]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newSubcategory, setNewSubcategory] = useState({ name: '', categoryId: '' });
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    weight: 0,
    image_url: '',
    categoryId: '',
    subcategoryId: ''
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAll = async () => {
      try {
        const [catRes, subRes, prodRes, ordRes, roleRes, noticeRes] = await Promise.all([
          apiService.getCategories(),
          apiService.getSubcategories(),
          apiService.getProducts(),
          apiService.getOrders(),
          apiService.getRole(),
          apiService.getNotifications()
        ]);
        setCategories(catRes.data);
        setSubcategories(subRes.data);
        setJewelryItems(prodRes.data);
        setOrders(ordRes.data);
        setRole(roleRes.data.role);
        setNotices(noticeRes.data);
      } catch (err) {
        console.error("Admin data fetch failed", err);
      }
    };
    fetchAll();
  }, [isAuthenticated]);

  if (!isAuthenticated || role !== 'owner') {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Owner Access Only</h1>
          <p className="text-gray-600 mb-6">You must be logged in as the owner to access this page.</p>
        </div>
      </Layout>
    );
  }

  const cancelOrder = async (orderId: string) => {
    try {
      await apiService.put(`/orders/${orderId}/cancel/`);
      setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: 'cancelled' } : order));
    } catch (err:any) {
      console.error('Error cancelling order:', err.response?.data || err.message);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: 'pending' | 'accepted' | 'completed' | 'cancelled') => {
    try {
      await apiService.put(`/admin/orders/${orderId}/update_status/`, { status: newStatus });
      setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    } catch (error:any) {
      console.error('Error updating status:', error.response?.data || error.message);
    }
  };

  const addCategory = async () => {
    try {
      const res = await apiService.post('/categories/', newCategory);
      setCategories([...categories, res.data]);
      setNewCategory({ name: '', description: '' });
    } catch (err) {
      console.error('Add category failed', err);
    }
  };

  const removeCategory = async (id: string) => {
    try {
      await apiService.delete(`/categories/${id}/`);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      console.error('Remove category failed', err);
    }
  };

  const addSubcategory = async () => {
    try {
      const res = await apiService.post('/subcategories/', {
        name: newSubcategory.name,
        category: newSubcategory.categoryId
      });
      setSubcategories([...subcategories, res.data]);
      setNewSubcategory({ name: '', categoryId: '' });
    } catch (err) {
      console.error('Add subcategory failed', err);
    }
  };

  const removeSubcategory = async (id: string) => {
    try {
      await apiService.delete(`/subcategories/${id}/`);
      setSubcategories(subcategories.filter(sc => sc.id !== id));
    } catch (err) {
      console.error('Remove subcategory failed', err);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) {
      alert("File must be an image under 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const timestamp = Math.round(Date.now() / 1000);
      const publicId = `jewelry_${timestamp}`;
      const paramsToSign: Record<string, string | number> = { public_id: publicId, timestamp };
      const paramsString = Object.keys(paramsToSign).sort().map(key => `${key}=${paramsToSign[key]}`).join('&');
      const signature = await generateSignature(paramsString);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp.toString());
      formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
      formData.append('public_id', publicId);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setUploadedImageUrl(data.secure_url);
        alert("Image uploaded successfully!");
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const generateSignature = async (paramsString: string) => {
    const apiSecret = 'ArcDdqPIgzMCyVZPJlfUDZBGkOU';
    const encoder = new TextEncoder();
    const data = encoder.encode(paramsString + apiSecret);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const addJewelryItem = async () => {
    const { subcategoryId, categoryId, ...rest } = newItem;
    const imageUrlToUse = uploadedImageUrl || newItem.image_url;
    if (!imageUrlToUse) return alert("Please upload an image or provide a URL.");

    try {
      const res = await apiService.post('/products/', {
        ...rest,
        image_url: imageUrlToUse,
        category: categoryId,
        subcategory: subcategoryId
      });
      setJewelryItems([...jewelryItems, res.data]);
      setNewItem({ name: '', description: '', price: 0, weight: 0, image_url: '', categoryId: '', subcategoryId: '' });
      setUploadedImageUrl('');
    } catch (err) {
      console.error('Add product failed', err);
    }
  };

  const removeJewelryItem = async (id: string) => {
    try {
      await apiService.delete(`/products/${id}/`);
      setJewelryItems(jewelryItems.filter(j => j.id !== id));
    } catch (err) {
      console.error('Delete item failed', err);
    }
  };

  const toggleJewelryItemActive = async (id: string) => {
    const item = jewelryItems.find(j => j.id === id);
    if (!item) return;
    try {
      const res = await apiService.patch(`/products/${id}/`, { is_active: !item.is_active });
      setJewelryItems(jewelryItems.map(j => j.id === id ? res.data : j));
    } catch (err) {
      console.error('Toggle item status failed', err);
    }
  };

  const editNotification = async (id: string, updatedData: any) => {
    try {
      const response = await apiService.editNotification(id, updatedData);
      setNotices(prev => prev.map(n => n.id === id ? response.data : n));
    } catch (error:any) {
      console.error('Error updating notification:', error.response?.data || error.message);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await apiService.deleteNotification(id);
      setNotices(prev => prev.filter(n => n.id !== id));
    } catch (error:any) {
      console.error('Error deleting notification:', error.response?.data || error.message);
    }
  };

  const createNotification = async (data: any) => {
    try {
      const response = await apiService.createNotification(data);
      setNotices(prev => [...prev, response.data]);
      setNewCategory({ name: '', description: '' });
    } catch (error:any) {
      console.error('Error creating notification:', error.response?.data || error.message);
    }
  };  return (
    <Layout>
  <div className="max-w-6xl mx-auto px-6 py-8">
    <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>

    {/* Categories */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <input type="text" placeholder="Name" className="h-10 text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition pl-3" value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
        <input type="text" placeholder="Description " className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400" value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={addCategory}>Add</button>
      </div>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center border p-3 rounded shadow-sm">
            <span>{cat.name}</span>
            <button onClick={() => removeCategory(cat.id)} className="text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
    </section>

    {/* Subcategories */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <input type="text" placeholder="Name" className="input h-10 text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition pl-3" value={newSubcategory.name}
          onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })} />
        <select className="input w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400" value={newSubcategory.categoryId}
          onChange={(e) => setNewSubcategory({ ...newSubcategory, categoryId: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={addSubcategory}>Add</button>
      </div>
      <ul className="space-y-2">
        {subcategories.map(sub => (
          <li key={sub.id} className="flex justify-between items-center border p-3 rounded shadow-sm">
            <span>{sub.name}</span>
            <button onClick={() => removeSubcategory(sub.id)} className="text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
    </section>

    {/* Jewelry Items */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Add New Jewelry Item</h2>
    <div className="grid md:grid-cols-3 gap-6 mb-10 bg-white dark:bg-gray-900 p-6 rounded-lg shadow transition-colors">
  {/* Name */}
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Item Name</label>
    <input type="text" placeholder="e.g. Gold Necklace"
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newItem.name}
      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
  </div>

  {/* Description */}
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Description</label>
    <input type="text" placeholder="Short product description"
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newItem.description}
      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
  </div>

  {/* Price */}
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Price (₹)</label>
    <input type="number" placeholder="e.g. 4999"
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newItem.price}
      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} />
  </div>

  {/* Weight */}
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Weight (grams)</label>
    <input type="number" placeholder="e.g. 15.5"
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newItem.weight}
      onChange={(e) => setNewItem({ ...newItem, weight: Number(e.target.value) })} />
  </div>

  {/* Category */}
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Category</label>
    <select
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newItem.categoryId}
      onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
    >
      <option value="">Select a category</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  </div>

  {/* Subcategory */}
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Subcategory</label>
    <select
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newItem.subcategoryId}
      onChange={(e) => setNewItem({ ...newItem, subcategoryId: e.target.value })}
    >
      <option value="">Select a subcategory</option>
      {subcategories
        .filter(sc => sc.category === newItem.categoryId)
        .map(sc => (
          <option key={sc.id} value={sc.id}>{sc.name}</option>
        ))}
    </select>
  </div>

  {/* Image URL */}
  <div className="flex flex-col md:col-span-2">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Image URL (optional)</label>
    <input
      type="text"
      placeholder="https://..."
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newItem.image_url}
      onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
    />
  </div>

  {/* File Upload */}
  <div className="flex flex-col md:col-span-2">
    <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">Or Upload Image</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      className="w-full text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
    />
  </div>

  {/* Submit Button */}
  <div className="flex items-end">
    <button
      className={`w-full px-4 py-2 rounded-md font-semibold transition ${
        isUploading 
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700 text-white'
      }`}
      onClick={addJewelryItem}
      disabled={isUploading}
    >
      {isUploading ? 'Uploading...' : 'Add Item'}
    </button>
  </div>
</div>

      {/* Current Jewelry Items */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Current Items</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jewelryItems.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
              <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover rounded mb-3" />
              <h4 className="font-semibold text-gray-800 dark:text-white">{item.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
              <p className="text-lg font-bold text-green-600">₹{parseFloat(item.price).toFixed(2)}</p>
              <p className="text-sm text-gray-500">{item.weight}g</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleJewelryItemActive(item.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    item.is_active 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {item.is_active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => removeJewelryItem(item.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* Orders */}
    <section>
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <ul className="space-y-6">
  {orders.map(order => (
    <li key={order.id} className="border rounded-lg p-5 shadow-sm bg-white dark:bg-gray-900 transition">
      <div className="mb-3">
        <p><strong className="text-gray-700 dark:text-gray-200">Order ID:</strong> {order.id}</p>
        <p><strong className="text-gray-700 dark:text-gray-200">User ID:</strong> {order.user}</p>
        <p>
          <strong>Status:</strong> 
  <span className={`ml-2 px-2 py-0.5 rounded text-white ${
    order.status === 'pending' ? 'bg-yellow-500' :
    order.status === 'accepted' ? 'bg-blue-500' :
    order.status === 'completed' ? 'bg-green-600' :
    'bg-red-500'
  }`}>
    {order.status}
  </span>
</p>
        <p><strong className="text-gray-700 dark:text-gray-200">Total Amount:</strong> ₹{parseFloat(order.total_amount).toFixed(2)}</p>
        <p><strong className="text-gray-700 dark:text-gray-200">Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <p><strong className="text-gray-700 dark:text-gray-200">Updated At:</strong> {new Date(order.updated_at).toLocaleString()}</p>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Items</h3>
        <ul className="space-y-4">
          {order.items.map((item: any) => (
            <li key={item.id} className="flex gap-4 items-center border p-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <img src={item.jewelry_item.image_url} alt={item.jewelry_item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{item.jewelry_item.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Price: ₹{parseFloat(item.jewelry_item.price).toFixed(2)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Subtotal: ₹{(parseFloat(item.jewelry_item.price) * item.quantity).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 mt-4">
        {order.status === 'pending' && (
          <>
            <Button onClick={() => cancelOrder(order.id)}>Cancel</Button>
            <Button onClick={() => updateOrderStatus(order.id, 'accepted')}>Accept</Button>
          </>
        )}

        {order.status === 'accepted' && (
          <button
            onClick={() => updateOrderStatus(order.id, 'completed')}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Mark as Completed
          </button>
        )}
      </div>

    </li>
  ))}
</ul>

    </section>
    {/* Notifications Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Notices / Notifications</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="New notice message"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <select
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="w-full md:w-64 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Type</option>
              <option value="offer">Offer</option>
              <option value="notice">Notice</option>
              <option value="price change">Price Change</option>
            </select>
            <Button onClick={() => createNotification({ message: newCategory.name, notice_type: newCategory.description || 'info' })}>
              Create Notice
            </Button>
          </div>

          {/* Notices list */}
          <ul className="space-y-4">
            {notices.map(notice => (
              <li key={notice.id} className="border p-4 rounded shadow flex justify-between items-start bg-gray-50 dark:bg-gray-800">
                <div>
                  <p className="text-gray-800 dark:text-white font-medium">{notice.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Type: {notice.notice_type} | {new Date(notice.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newMessage = prompt('Edit message:', notice.message);
                      const newType = prompt(`Edit type ('offer'/'notice'/'price change'):`, notice.notice_type);
                      if (newMessage && newMessage !== notice.message && newType && ['offer', 'notice', 'price change'].includes(newType)) {
                        editNotification(notice.id, { message: newMessage , notice_type: newType || notice.notice_type });
                      }
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => deleteNotification(notice.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
  </div>
</Layout>

  );
};

export default AdminPage;
