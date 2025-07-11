import { useState } from 'react';
import Layout from '../components/Layout';

interface Question {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: Question[];
}

const FAQPage = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faqData: FAQCategory[] = [
    {
      category: "Ordering & Payment",
      questions: [
        {
          question: "How do I place an order?",
          answer: "You can place an order by browsing our collection, selecting your desired items, and adding them to your cart. Then proceed to checkout where you'll provide shipping and payment information."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and bank transfers for larger purchases."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use SSL encryption and work with trusted payment processors to ensure your payment information is completely secure."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "Orders can be modified or cancelled within 2 hours of placement. After that, please contact our customer service team for assistance."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 days) and overnight shipping are also available."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination."
        },
        {
          question: "How much does shipping cost?",
          answer: "Standard shipping is free for orders over $500. For smaller orders, shipping costs $15 within the US. International shipping rates vary by destination."
        },
        {
          question: "How do I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account on our website."
        }
      ]
    },
    {
      category: "Products & Quality",
      questions: [
        {
          question: "Are your diamonds certified?",
          answer: "Yes, all our diamonds come with certificates from renowned institutions like GIA, AGS, or similar reputable laboratories."
        },
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unworn items in their original condition. Custom-made pieces may have different return terms."
        },
        {
          question: "Do you offer warranty on jewelry?",
          answer: "All our jewelry comes with a 1-year warranty covering manufacturing defects. Extended warranties are available for purchase."
        },
        {
          question: "Can I resize my ring?",
          answer: "Most rings can be resized. We offer one free resizing within 60 days of purchase. Additional resizing services are available for a fee."
        }
      ]
    },
    {
      category: "Custom Design & Services",
      questions: [
        {
          question: "Do you offer custom jewelry design?",
          answer: "Yes, we specialize in custom jewelry design. Our expert designers will work with you to create a unique piece that reflects your vision."
        },
        {
          question: "How long does custom design take?",
          answer: "Custom pieces typically take 4-6 weeks to complete, depending on the complexity of the design and current workload."
        },
        {
          question: "Do you offer jewelry repair services?",
          answer: "Yes, we provide comprehensive jewelry repair services including ring resizing, stone setting, chain repair, and restoration."
        },
        {
          question: "Can you appraise my jewelry?",
          answer: "We offer professional jewelry appraisal services for insurance purposes, estate planning, or resale value determination."
        }
      ]
    },
    {
      category: "Care & Maintenance",
      questions: [
        {
          question: "How should I clean my jewelry?",
          answer: "Different materials require different care. Generally, use a soft cloth and mild soap solution. We provide specific care instructions with each purchase."
        },
        {
          question: "How often should I have my jewelry serviced?",
          answer: "We recommend professional cleaning and inspection every 6-12 months to maintain your jewelry's beauty and ensure stone security."
        },
        {
          question: "How should I store my jewelry?",
          answer: "Store jewelry in individual pouches or compartments to prevent scratching. Keep pieces away from extreme temperatures and moisture."
        },
        {
          question: "What should I avoid when wearing jewelry?",
          answer: "Avoid exposure to chemicals, perfumes, lotions, and remove jewelry before swimming, exercising, or doing household chores."
        }
      ]
    }
  ];

  let questionIndex = 0;

  return (
    <Layout>
      {/* Page Title */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Frequently Asked Questions</h1>
            <nav className="text-gray-600 dark:text-gray-300 transition-colors">
              <a href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</a> 
              <span className="mx-2">/</span> 
              <span className="text-gray-900 dark:text-white transition-colors">FAQ</span>
            </nav>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">How can we help you?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">Find answers to commonly asked questions about our jewelry, services, and policies.</p>
          </div>

          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden transition-colors">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b dark:border-gray-600 transition-colors">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">{category.category}</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-600">
                  {category.questions.map((item, itemIndex) => {
                    const currentIndex = questionIndex++;
                    return (
                      <div key={itemIndex}>
                        <button
                          onClick={() => toggleAccordion(currentIndex)}
                          className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white pr-4 transition-colors">{item.question}</h4>
                            <svg
                              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
                                openAccordion === currentIndex ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        {openAccordion === currentIndex && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Still have questions?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors">Can't find the answer you're looking for? Our customer service team is here to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="tel:+12025550174" 
              className="border border-gray-900 dark:border-gray-600 text-gray-900 dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Call Us: +1-202-555-0174
            </a>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-colors">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border dark:border-gray-700 text-center hover:shadow-xl transition-all">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Ordering</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Learn about placing orders and payment options</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border dark:border-gray-700 text-center hover:shadow-xl transition-all">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Information about delivery and tracking</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border dark:border-gray-700 text-center hover:shadow-xl transition-all">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Quality</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Details about our products and certifications</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border dark:border-gray-700 text-center hover:shadow-xl transition-all">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Services</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">Custom design and repair services</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
