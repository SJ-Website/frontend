import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link, useLocation } from 'react-router-dom';
import apiService, { setAuthToken } from '../services/api';
import { useAuth0 } from '@auth0/auth0-react';

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

interface Subcategory {
  id: string;
  name: string;
  category: string;
  slug: string;
}

interface JewelryItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  subcategory: string;
  image_url?: string;
  weight?: number;
  slug: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

const useQuery = () => new URLSearchParams(useLocation().search);

const ShopPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<JewelryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Subcategory | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const query = useQuery();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    const setupAuth = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
        } catch (error) {
          console.error('Failed to get auth token:', error);
        }
      }
    };
    setupAuth();
  }, [isAuthenticated, getAccessTokenSilently]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCategories();
      setCategories(response.data);
    } catch (error: any) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await apiService.getSubcategories();
      setSubcategories(response.data);
    } catch (error: any) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await apiService.getProducts();
      setProducts(response.data);
    } catch (error: any) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle query param logic when data is loaded
  const [initializedFromURL, setInitializedFromURL] = useState(false);

useEffect(() => {
  if (!categories.length || !subcategories.length || initializedFromURL) return;

  const categorySlug = query.get('category');
  const subcategorySlug = query.get('subcategory');

  const matchedCategory = categories.find(cat => cat.slug.toLowerCase() === categorySlug?.toLowerCase());
  if (matchedCategory) {
    setSelectedCategory(matchedCategory);

    if (subcategorySlug) {
      const matchedSub = subcategories.find(
        sub => sub.slug.toLowerCase() === subcategorySlug.toLowerCase() && sub.category === matchedCategory.id
      );
      setSelectedSubCategory(matchedSub || null);
    }
  }

  setInitializedFromURL(true);
}, [categories, subcategories, query, initializedFromURL]);


  const getCategorySubcategories = (categoryId: string): Subcategory[] => {
    return subcategories.filter(sub => sub.category === categoryId);
  };

  const getSubcategoryProducts = (subcategoryId: string): JewelryItem[] => {
    return products.filter(product => product.subcategory === subcategoryId);
  };

  const renderStars = (rating: number = 0) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
    ));
  };

  const addToCart = async (productId: string) => {
    if (!isAuthenticated) {
      alert('Please log in to add items to cart');
      return;
    }

    try {
      setLoading(true);
      await apiService.addToCart({
        jewelry_item_id: productId,
        quantity: 1
      });
      alert('Product added to cart successfully!');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = (productId: string) => {
    alert(`Product ${productId} added to wishlist! (Feature coming soon)`);
  };

  const getSortedProducts = (products: JewelryItem[]) => {
    let sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        break;
    }
    return sorted;
  };
  return (
    <Layout>
      {/* Page Title */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Shop</h1>
            <nav className="text-gray-600 dark:text-gray-400 transition-colors">
              <a href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</a> 
              <span className="mx-2">/</span> 
              <span className="text-gray-900 dark:text-white transition-colors">Shop</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar: Categories and Subcategories */}
          <aside className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 border dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Categories</h3>
              {loading && <p className="text-gray-500">Loading categories...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedSubCategory(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory?.id === cat.id ? 'bg-yellow-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      {cat.name}
                    </button>
                    {/* Subcategories */}
                    {selectedCategory?.id === cat.id && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {getCategorySubcategories(cat.id).map((sub) => (
                          <li key={sub.id}>
                            <button
                              onClick={() => setSelectedSubCategory(sub)}
                              className={`w-full text-left px-3 py-1 rounded-md transition-colors ${selectedSubCategory?.id === sub.id ? 'bg-yellow-400 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </aside>
          {/* Main Content: Products */}
          <main className="lg:w-3/4">
            {/* Main Content Logic */}
            {/* No category selected: show all categories as cards */}
            {!selectedCategory && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors text-center">Browse Categories</h2>
                {loading && <p className="text-center text-gray-500">Loading categories...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center border dark:border-gray-700 hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      {/* Optionally add an icon or image here */}
                      <span className="text-3xl mb-2">📦</span>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">{cat.name}</span>
                      {cat.description && (
                        <span className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">{cat.description}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category selected, but no subcategory: show subcategories */}
            {selectedCategory && !selectedSubCategory && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors text-center">{selectedCategory.name}: Subcategories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {getCategorySubcategories(selectedCategory.id).map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCategory(sub)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center border dark:border-gray-700 hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      {/* Optionally add an icon or image here */}
                      <span className="text-2xl mb-2">📁</span>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">{sub.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-yellow-600 dark:text-yellow-400 hover:underline"
                  >
                    ← Back to Categories
                  </button>
                </div>
              </div>
            )}

            {/* Category and subcategory selected: show products */}
            {selectedCategory && selectedSubCategory && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors text-center">
                  {selectedCategory.name} / {selectedSubCategory.name}: Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {getSortedProducts(getSubcategoryProducts(selectedSubCategory.id)).map((product) => (
                    <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group border dark:border-gray-700 transition-colors">
                      <div className="relative">
                        <img
                          src={product.image_url || '/api/placeholder/400/300'}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* For now, we don't have sale/new indicators in the API, but we can show if product is active */}
                        {!product.is_active && (
                          <span className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 text-xs font-medium rounded">
                            Inactive
                          </span>
                        )}
                        {/* Check if product is newly created (within last 30 days) */}
                        {new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
                            New
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => addToCart(product.id)}
                              disabled={loading}
                              className="bg-white p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-colors disabled:opacity-50"
                              title="Add to Cart"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L9 18h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => addToWishlist(product.id)}
                              className="bg-white p-2 rounded-full hover:bg-yellow-500 hover:text-white transition-colors"
                              title="Add to Wishlist"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
                          <Link
                            to={`/product/${product.id}`}
                            className="hover:underline text-yellow-700 dark:text-yellow-400 cursor-pointer"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        {product.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        {product.weight && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Weight: {product.weight}g
                          </p>
                        )}
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">{renderStars()}</div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors">(No reviews yet)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 transition-colors">
                              ${Number(product.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {getSubcategoryProducts(selectedSubCategory.id).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No products found in this subcategory.</p>
                  </div>
                )}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setSelectedSubCategory(null)}
                    className="text-yellow-600 dark:text-yellow-400 hover:underline mr-4"
                  >
                    ← Back to Subcategories
                  </button>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-yellow-600 dark:text-yellow-400 hover:underline"
                  >
                    ← Back to Categories
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
