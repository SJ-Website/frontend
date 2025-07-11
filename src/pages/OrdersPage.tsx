import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import Layout from '../components/Layout';

interface OrderItem {
  id: string;
  quantity: number;
  jewelry_item: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const OrdersPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  // const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiService.getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Layout><div className="p-4">Loading orders...</div></Layout>;

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="p-4 text-center">You have no orders yet.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-600">₹{Number(order.total_amount).toFixed(2)}</p>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center py-2">
                    <img src={item.jewelry_item.image_url} alt={item.jewelry_item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-600">{item.jewelry_item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      ₹{(item.jewelry_item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
