import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
// import { Button } from './components/ui/button';
// import DummyComponent from './DummyComponent';
import CustomCursor from './CustomCursor';

// Import jewelry store pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import NotificationPage from './pages/NotificationPage';
import FAQPage from './pages/FAQPage';
import CartPage from './pages/CartPage';
import About from './pages/Profilepage';
// import ConnectionTest from './pages/ConnectionTest';
import NavBar from './components/NavBar';
// import ProductDetails from './pages/ProductDetails';
import OrdersPage from './pages/OrdersPage';



// Product Details Page
import ProductDetails from './pages/ProductDetails';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';


// function Home() {

// // new Cursor({})
//   return (

//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors">
//       <div className="max-w-4xl mx-auto text-center px-4">
//         <div className="mb-8">
//           <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//             <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//             </svg>
//           </div>
//         </div>
        
//         <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6 transition-colors">
//           Welcome to FrankJewelry Platform
//         </h1>
//         <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors">
//           Experience seamless authentication with Auth0 and powerful backend services with Django. 
//           Explore our beautiful jewelry collection and admin features.
//         </p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors border dark:border-gray-700">
//             <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">Jewelry Store</h3>
//             <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">Browse our exquisite collection of fine jewelry</p>
//             <Link 
//               to="/jewelry" 
//               className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors shadow-lg"
//             >
//               Visit Store
//             </Link>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors border dark:border-gray-700">
//             <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors">Admin Panel</h3>
//             <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">Manage your profile and access backend features</p>
//             <Link 
//               to="/admin" 
//               className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
//             >
//               Admin Access
//             </Link>
//           </div>
//         </div>
        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link 
//             to="/shop" 
//             className="px-8 py-3 bg-gray-900 dark:bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-lg"
//           >
//             Shop Now
//           </Link>
//           <Link 
//             to="/about-us" 
//             className="px-8 py-3 border-2 border-gray-900 dark:border-gray-600 text-gray-900 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//           >
//             Learn More
//           </Link>
//           <Button
//             onClick={() => alert('This is a dummy button!')}
//             className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
//           >
//             Test Feature
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }




function App() {
  return (
    <>
      <CustomCursor />
      <Router>
        <NavBar />
        <br />
        <br />
        <Routes>
          {/* Original routes */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/Profile" element={<About />} />
          {/* <Route path="/dummy" element={<DummyComponent/>} /> */}
          {/* <Route path="/connection-test" element={<ConnectionTest />} /> */}
          
          {/* Jewelry store routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
