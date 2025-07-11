import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Exclusive Jewelry Collection
              </h1>
              <p className="text-xl text-gray-300">
                Discover our handcrafted luxury pieces
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/shop" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-md font-semibold transition-colors text-center"
                >
                  Shop Now
                </a>
                <a 
                  href="/about" 
                  className="border border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md font-semibold transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury Jewelry" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', href: '/shop?category=rings' },
              { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', href: '/shop?category=necklaces' },
              { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', href: '/shop?category=earrings' },
              { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', href: '/shop?category=bracelets' }
            ].map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <a 
                        href={category.href} 
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Shop {category.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 1, name: 'Diamond Ring', price: '$1,250', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { id: 2, name: 'Gold Necklace', price: '$890', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { id: 3, name: 'Pearl Earrings', price: '$245', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { id: 4, name: 'Silver Bracelet', price: '$159', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
            ].map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">{product.name}</h3>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4 transition-colors">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter Section */}
      {/* <section className="bg-gray-900 dark:bg-gray-950 text-white py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 transition-colors">Subscribe to our newsletter for exclusive offers and new arrivals</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 border dark:border-gray-600 transition-colors"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-black dark:text-white px-6 py-3 rounded-md font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default HomePage;
