import { useState, useEffect } from 'react';
import apiService from '@/services/api';
import Footer from '../components/Footer';

// Define the Notice interface
interface Notice {
  id: string;
  message: string;
  notice_type?: string;
  created_at: string;
}

const metalPriceHistory = [
  { date: '2025-07-09', gold: 2420, silver: 31.2 },
  { date: '2025-07-08', gold: 2410, silver: 31.5 },
  { date: '2025-07-07', gold: 2400, silver: 31.0 },
  { date: '2025-07-06', gold: 2390, silver: 30.8 },
  { date: '2025-07-05', gold: 2385, silver: 30.5 },
];

const NotificationPage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await apiService.getNotifications();
        setNotices(response.data || []);
      } catch (error) {
        console.error('Error fetching notices:', error);
        setNotices([]); // Set empty array on error
      }
    };
    fetchNotices();
  }, []);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  console.log('Notices:', notices);

  const offers = notices.filter(n => n.notice_type?.toLowerCase() === 'offer');
  const priceChanges = notices.filter(n => n.notice_type?.toLowerCase().includes('price'));
  const generalNotices = notices.filter(n => n.notice_type?.toLowerCase() === 'notice');

  return (
    <div className="relative max-w-3xl mx-auto p-6 bg-gradient-to-br from-yellow-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 min-h-screen transition-colors rounded-2xl shadow-2xl border border-yellow-100 dark:border-gray-800">
      <div className="absolute top-0 right-0 m-4 flex items-center gap-2 opacity-60 pointer-events-none select-none">
        <svg className="w-8 h-8 text-yellow-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <span className="font-bold text-yellow-500 text-lg">Live</span>
      </div>

      <h1 className="text-4xl font-extrabold text-center text-yellow-700 dark:text-yellow-400 mb-8 tracking-tight drop-shadow-lg transition-colors">
        Notifications & Metal Prices
      </h1>

      {/* Offers Section */}
      {offers.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            Current Offers
          </h2>
          <ul className="space-y-3">
            {offers.map(offer => (
              <li key={offer.id} className="bg-yellow-100/80 dark:bg-yellow-900/40 p-4 rounded-lg border-l-8 border-yellow-400 text-gray-900 dark:text-yellow-100 shadow-sm flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                <span className="font-semibold">{offer.message}</span>
                <span className="text-xs text-gray-500 ml-2">({formatDate(offer.created_at)})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Price Changes Section */}
      {priceChanges.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            Price Changes
          </h2>
          <ul className="space-y-3">
            {priceChanges.map(change => (
              <li key={change.id} className="bg-red-100/80 dark:bg-red-900/40 p-4 rounded-lg border-l-8 border-red-400 text-gray-900 dark:text-red-100 shadow-sm flex items-center gap-3">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
                </svg>
                <span className="font-semibold">{change.message}</span>
                <span className="text-xs text-gray-500 ml-2">({formatDate(change.created_at)})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Notices Section */}
      {generalNotices.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            Notices & Closures
          </h2>
          <ul className="space-y-3">
            {generalNotices.map(notice => (
              <li key={notice.id} className="bg-blue-100/80 dark:bg-blue-900/40 p-4 rounded-lg border-l-8 border-blue-400 text-gray-900 dark:text-blue-100 shadow-sm flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2z" />
                </svg>
                <span className="font-semibold">{notice.message}</span>
                <span className="text-xs text-gray-500 ml-2">({formatDate(notice.created_at)})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Gold & Silver History */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          Gold & Silver Price History (USD/oz)
        </h2>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-yellow-200 dark:border-yellow-900 bg-yellow-50/40 dark:bg-gray-900/40">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-yellow-200 dark:bg-yellow-900/60">
                <th className="px-4 py-2 border-b text-left font-bold">Date</th>
                <th className="px-4 py-2 border-b text-left font-bold text-yellow-800 dark:text-yellow-300">Gold</th>
                <th className="px-4 py-2 border-b text-left font-bold text-gray-800 dark:text-gray-200">Silver</th>
              </tr>
            </thead>
            <tbody>
              {metalPriceHistory.map(row => (
                <tr key={row.date} className="even:bg-yellow-100/60 dark:even:bg-yellow-900/20">
                  <td className="px-4 py-2 border-b">{row.date}</td>
                  <td className="px-4 py-2 border-b text-yellow-700 dark:text-yellow-400 font-semibold">${row.gold.toLocaleString()}</td>
                  <td className="px-4 py-2 border-b text-gray-700 dark:text-gray-200 font-semibold">${row.silver.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const NotificationPageWithFooter = () => (
  <>
    <br />
    <br />
    <NotificationPage />
    <Footer />
  </>
);

export default NotificationPageWithFooter;
