import { useState } from 'react';
import Layout from '../components/Layout';
import { apiService } from '../services/api';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeToDataCollection: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.agreeToDataCollection) {
      newErrors.agreeToDataCollection = 'You must agree to data collection';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      apiService.sendEmail({
        subject: formData.subject,
        message: formData.message,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      })
      .then(response => {
        prompt(response.data.message);
      })
      // Form is valid, submit it
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToDataCollection: false
      });
      alert('Thank you for your message! We will get back to you soon.');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Layout>
      {/* Page Title */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Contact Us</h1>
            <nav className="text-gray-600 dark:text-gray-300 transition-colors">
              <a href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</a> 
              <span className="mx-2">/</span> 
              <span className="text-gray-900 dark:text-white transition-colors">Contact</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Contact Hero */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">GET IN TOUCH</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors">
            We'd love to hear from you. Whether you have questions about our jewelry, need assistance with an order, or want to discuss custom design options, our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border dark:border-gray-700 transition-colors">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Send us a Message</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="product-question">Product Question</option>
                      <option value="custom-design">Custom Design</option>
                      <option value="order-status">Order Status</option>
                      <option value="repair-service">Repair Service</option>
                      <option value="returns-exchanges">Returns & Exchanges</option>
                      <option value="gift-certificate">Gift Certificate</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <span className="text-red-500 text-sm mt-1">{errors.subject}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message}</span>}
                </div>

                <div>
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name="agreeToDataCollection"
                      checked={formData.agreeToDataCollection}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded transition-colors"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                      I agree that my submitted data is being collected and stored. *
                    </span>
                  </label>
                  {errors.agreeToDataCollection && <span className="text-red-500 text-sm mt-1">{errors.agreeToDataCollection}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border dark:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">Get in touch with us through any of the following methods:</p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors">Visit Our Store</h4>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors">123 Jewelry Street<br />New York, NY 10001<br />United States</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors">
                        <a href="tel:+12025550174" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">+1-202-555-0174</a>
                      </p>
                      <small className="text-gray-500 dark:text-gray-400 transition-colors">Mon-Fri: 9 AM - 6 PM EST<br />Sat: 10 AM - 4 PM EST</small>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors">
                        <a href="mailto:contact@frankjewelry.com" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">contact@frankjewelry.com</a>
                      </p>
                      <small className="text-gray-500 dark:text-gray-400 transition-colors">We respond within 24 hours</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border dark:border-gray-700 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 transition-colors">Monday - Friday</span>
                    <span className="font-medium text-gray-900 dark:text-white transition-colors">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 transition-colors">Saturday</span>
                    <span className="font-medium text-gray-900 dark:text-white transition-colors">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 transition-colors">Sunday</span>
                    <span className="font-medium text-gray-900 dark:text-white transition-colors">Closed</span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border dark:border-gray-700 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.197-1.526L3.715 16.988h-1.33l2.636-2.636C4.596 13.645 4.596 12.643 4.596 11.988s0-1.657.425-2.364L2.385 6.988h1.33l1.537 1.526c.749-.93 1.9-1.526 3.197-1.526s2.448.596 3.197 1.526l1.537-1.526h1.33l-2.636 2.636c.425.707.425 1.709.425 2.364s0 1.657-.425 2.364l2.636 2.636h-1.33l-1.537-1.526c-.749.93-1.9 1.526-3.197 1.526z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">What are your store hours?</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">We're open Monday-Friday 9 AM to 6 PM, Saturday 10 AM to 4 PM, and closed on Sundays.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Do you offer jewelry repair services?</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Yes, we provide comprehensive jewelry repair services including resizing, stone setting, and restoration.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Can I schedule a private consultation?</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Absolutely! We offer private consultations for custom designs and high-value purchases. Call us to schedule.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Do you buy or trade jewelry?</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">We offer jewelry evaluation and trade-in services. Bring your pieces in for a professional assessment.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              Have more questions? <a href="/faq" className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors">Visit our comprehensive FAQ page</a>
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      {/* <section className="py-16 bg-gray-900 dark:bg-gray-800 text-white transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 transition-colors">Subscribe to our newsletter for exclusive offers, new arrivals, and jewelry care tips</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-700 border dark:border-gray-600 transition-colors"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default ContactPage;
