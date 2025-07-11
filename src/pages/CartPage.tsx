import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import apiService from '../services/api';

interface CartItem {
  id: string;
  quantity: number;
  jewelry_item: {
    id: string;
    name: string;
    price: number | string;
    image_url: string;
  };
}

const CartPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantityEdits, setQuantityEdits] = useState<Record<string, number>>({});
  // const [couponCode, setCouponCode] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  const fetchCart = () => {
    apiService.getCart()
      .then((res) => {
        const cartData = Array.isArray(res.data) ? res.data[0] : res.data;
        const items = cartData?.items || [];
        setCartItems(items);
        const initialEdits: Record<string, number> = {};
        items.forEach((item:any) => {
          initialEdits[item.id] = item.quantity;
        });
        setQuantityEdits(initialEdits);
      })
      .catch((err) => {
        console.error("Error loading cart:", err.response?.data || err.message);
        setCartItems([]);
      });
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, isLoading]);

  const handleUpdateQuantity = async (itemId: string) => {
    const newQuantity = quantityEdits[itemId];
    if (newQuantity <= 0) return;
    setUpdatingId(itemId);
    try {
      await apiService.updateCartItem(itemId, { quantity: newQuantity });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    setUpdatingId(itemId);
    try {
      await apiService.deleteCartItem(itemId);
      fetchCart();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    } finally {
      setUpdatingId(null);
    }
  };
  
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * Number(item.jewelry_item?.price || 0),
    0
  );
  const handleCreateOrder = async () => {
    setCreatingOrder(true);
    setOrderError('');
    try {
      await apiService.createOrder(); // This should POST to /api/orders/
      setOrderSuccess(true);
      fetchCart(); // to clear the UI cart
    } catch (error: any) {
      setOrderError(error.response?.data?.error || 'Failed to create order');
    } finally {
      setCreatingOrder(false);
    }
  };

  

  if (isLoading) {
    return <Layout><p className="text-center p-10">Loading...</p></Layout>;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Please log in to view your cart</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">You must be authenticated to access the shopping cart.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b py-4 gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.jewelry_item?.image_url || ''}
                    alt={item.jewelry_item?.name || 'Jewelry Item'}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.jewelry_item?.name || 'Unnamed Item'}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ${Number(item.jewelry_item?.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={quantityEdits[item.id] || item.quantity}
                    onChange={(e) => setQuantityEdits({ ...quantityEdits, [item.id]: Number(e.target.value) })}
                    className="w-16 text-center px-2 py-1 border rounded dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    onClick={() => handleUpdateQuantity(item.id)}
                    disabled={updatingId === item.id}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded disabled:opacity-50"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    disabled={updatingId === item.id}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between text-lg mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* 
              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  placeholder="Enter coupon code"
                />
              </div>
              */}

            <button
              onClick={handleCreateOrder}
              disabled={creatingOrder}
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-md font-semibold disabled:opacity-50"
            >
              {creatingOrder ? 'Placing Order...' : 'Proceed to Checkout'}
            </button>

            {orderSuccess && (
              <p className="mt-4 text-green-600 font-medium">Order placed successfully!</p>
            )}

            {orderError && (
              <p className="mt-4 text-red-600 font-medium">{orderError}</p>
            )}

            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
