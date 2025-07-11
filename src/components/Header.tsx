

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <span>Call Us: +1-202-555-0174</span>
              <span>Email: contact@frankjewelry.com</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">Facebook</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">FRANKJEWELRY</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="/shop" className="hover:text-gray-300 transition-colors">Shop</a>
              <a href="/about" className="hover:text-gray-300 transition-colors">About</a>
              <a href="/notifications" className="hover:text-gray-300 transition-colors">Notifications</a>
              <a href="/contact" className="hover:text-gray-300 transition-colors">Contact</a>
              <a href="/faq" className="hover:text-gray-300 transition-colors">FAQ</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a href="/cart" className="hover:text-gray-300 transition-colors">Cart (0)</a>
              <a href="/wishlist" className="hover:text-gray-300 transition-colors">Wishlist</a>
              <a href="/account" className="hover:text-gray-300 transition-colors">Account</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
