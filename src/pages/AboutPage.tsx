import Layout from '../components/Layout';

const AboutPage = () => {
  return (
    <Layout>
      {/* Page Title */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">About Us</h1>
            <nav className="text-gray-600 dark:text-gray-400 transition-colors">
              <a href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</a> 
              <span className="mx-2">/</span> 
              <span className="text-gray-900 dark:text-white transition-colors">About Us</span>
            </nav>
          </div>
        </div>
      </section>

      {/* About Hero Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Our Story</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                Founded in 1990, Frankjewelry has been at the forefront of luxury jewelry design for over three decades. What started as a small family business has grown into one of the most trusted names in fine jewelry.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                Our journey began with a simple mission: to create exceptional jewelry pieces that celebrate life's most precious moments. From engagement rings to anniversary gifts, each piece we craft tells a unique story of love, commitment, and beauty.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="About Frankjewelry" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Quality Craftsmanship</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Every piece is meticulously crafted by skilled artisans using only the finest materials and traditional techniques passed down through generations.</p>
            </div>
            <div className="text-center group">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Customer Dedication</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">We believe in building lasting relationships with our customers, providing personalized service and ensuring complete satisfaction with every purchase.</p>
            </div>
            <div className="text-center group">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Trust & Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Our reputation is built on honesty, transparency, and ethical business practices. We stand behind every piece we sell with comprehensive warranties.</p>
            </div>
            <div className="text-center group">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">While respecting traditional craftsmanship, we embrace modern design trends and cutting-edge techniques to create contemporary masterpieces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Frank Williams" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 transition-colors">Frank Williams</h3>
              <span className="text-yellow-600 dark:text-yellow-500 font-medium mb-2 block transition-colors">Founder & CEO</span>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">With over 40 years of experience in the jewelry industry, Frank founded the company with a vision to make luxury jewelry accessible to everyone.</p>
            </div>
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Sarah Martinez" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 transition-colors">Sarah Martinez</h3>
              <span className="text-yellow-600 dark:text-yellow-500 font-medium mb-2 block transition-colors">Head Designer</span>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Sarah brings a fresh perspective to our designs, combining classical elegance with contemporary style to create timeless pieces.</p>
            </div>
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Michael Johnson" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 transition-colors">Michael Johnson</h3>
              <span className="text-yellow-600 dark:text-yellow-500 font-medium mb-2 block transition-colors">Master Craftsman</span>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Michael's expertise in traditional jewelry-making techniques ensures that every piece meets our exacting standards of quality and craftsmanship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors">Our Crafting Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">01</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Design Conceptualization</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Our designers work closely with clients to understand their vision and create unique concepts that reflect their personal style and preferences.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">02</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Material Selection</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">We carefully source the finest materials, including ethically-sourced diamonds and precious metals, ensuring quality and sustainability.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">03</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Expert Craftsmanship</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Our master craftsmen bring the design to life using time-honored techniques combined with modern precision tools and technology.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">04</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Every piece undergoes rigorous quality checks to ensure it meets our standards before being presented to our valued customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-500 mb-2">30+</div>
              <div className="text-gray-300">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-500 mb-2">50,000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-500 mb-2">1,000+</div>
              <div className="text-gray-300">Unique Designs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-500 mb-2">25+</div>
              <div className="text-gray-300">Expert Craftsmen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Ready to Find Your Perfect Piece?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors">Explore our extensive collection or contact our experts for personalized assistance</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/shop" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-md font-semibold transition-colors">
              Browse Collection
            </a>
            <a href="/contact" className="border border-gray-900 dark:border-gray-300 hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white text-gray-900 dark:text-gray-300 px-8 py-3 rounded-md font-semibold transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
