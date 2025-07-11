import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import apiService, { setAuthToken } from '@/services/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  image_url: string;
  weight: string;
  slug: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface Comment {
  id: string;
  user:string;
  jewelry_item: string;
  rating: number;
  comment: string;
  created_at: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user,isAuthenticated, loginWithRedirect, isLoading, getAccessTokenSilently } = useAuth0();
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ text: '', rating: 0 });

  useEffect(() => {
    if (!id) return;
    apiService.getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Product fetch error:", err);
        setError('Product not found');
      })
      .finally(() => setLoading(false));

    apiService.getReviews(id)
      .then((res) => setComments(res.data))
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError('Failed to load comments');
      });
  }, [id]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRatingChange = (rating: number) => {
    setForm((prev) => ({ ...prev, rating }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('You must be logged in to submit a comment');
      return;
    }
    if (!form.text.trim() || form.rating <= 0) {
      setError('Please fill out all fields');
      return;
    }

    try {
      // Get the authentication token and set it
      const token = await getAccessTokenSilently();
      setAuthToken(token);

      // Create the review data with the format expected by the backend
      // Note: user field is not needed as the backend assigns it automatically from the authenticated user
      const reviewData = {
        user: user?.name, // This will be ignored by the backend
        jewelry_item: id!, // The product ID
        rating: form.rating,
        comment: form.text.trim(), // Backend expects 'comment', not 'text'
      };

      const response = await apiService.createReview(reviewData);
      
      // Add the new review to the comments list
      setComments((prev) => [...prev, response.data]);
      setForm({ text: '', rating: 0 });
      setError('');
    } catch (err: any) {
      console.error("Error submitting comment:", err.response?.data || err.message);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to submit comment. Please try again.');
      }
    }
  };

  const renderStars = (rating: number, onClick?: (star: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={onClick ? () => onClick(star) : undefined}
          className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} ${onClick ? 'hover:scale-125 focus:outline-none' : ''}`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-800 dark:text-white">Loading product...</div>;
  }

  if (!product || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-blue-600 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }
  const getAverageRating = () => {
  if (comments.length === 0) return 0;
  const total = comments.reduce((sum, c) => sum + c.rating, 0);
  return total / comments.length;
};

  return (
    <div className="py-10 px-2 w-full flex justify-center">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image_url || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-xl text-yellow-600">₹{parseFloat(product.price).toFixed(2)}</p>
            <p>{product.description}</p>
            <p><strong>Weight:</strong> {product.weight} gm</p>
            <p><strong>Category ID:</strong> {product.category}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-600 font-medium">Rating:</span>
              {renderStars(Math.round(getAverageRating()))} {/* placeholder rating */}
              <span className="text-sm text-gray-500">({comments.length} reviews)</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments & Ratings</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((c, idx) => (
                <li key={idx} className="p-4 border rounded-lg dark:border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">User {c.user}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div>{renderStars(c.rating)}</div>
                  <p className="mt-2">{c.comment}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Comment Form */}
          {isLoading ? (
            <p className="text-gray-500">Loading user info...</p>
          ) : isAuthenticated ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Your Rating:</span>
                {renderStars(form.rating, handleRatingChange)}
              </div>
              <textarea
                name="text"
                value={form.text}
                onChange={handleInputChange}
                rows={3}
                placeholder="Write your comment..."
                className="w-full border rounded-md p-2 dark:bg-gray-700"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-600"
              >
                Submit Comment
              </button>
            </form>
          ) : (
            <div className="text-center mt-4">
              <p className="mb-2">Login to add a review.</p>
              <button
                onClick={() => loginWithRedirect()}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
