import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is MusicStore?',
        answer: 'MusicStore is a digital music platform where users can discover, purchase, and stream high-quality music while supporting artists directly.'
      },
      {
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button in the top navigation, fill out the registration form, and choose whether you want to be a regular user or an artist account.'
      },
      {
        question: 'Is it free to use?',
        answer: 'Creating an account is free. You only pay for the music you purchase. Artists pay a small commission on sales.'
      }
    ]
  },
  {
    category: 'For Users',
    questions: [
      {
        question: 'How do I purchase music?',
        answer: 'Browse our catalog, add songs to your cart, and proceed to checkout. We accept all major credit cards and PayPal.'
      },
      {
        question: 'What formats are available for download?',
        answer: 'All purchases include high-quality MP3 downloads. Some tracks may also offer lossless formats like FLAC.'
      },
      {
        question: 'Can I re-download my purchases?',
        answer: 'Yes! All your purchases are saved in your account and can be re-downloaded anytime from your dashboard.'
      }
    ]
  },
  {
    category: 'For Artists',
    questions: [
      {
        question: 'How do I upload my music?',
        answer: 'Register as an artist, go to your dashboard, and use the upload section. Your music will be reviewed before going live.'
      },
      {
        question: 'What file formats can I upload?',
        answer: 'We accept MP3, WAV, and FLAC files. Maximum file size is 50MB. We recommend high-quality files for the best listener experience.'
      },
      {
        question: 'How much do I earn from sales?',
        answer: 'Artists keep 70% of the sale price. The remaining 30% covers platform costs, payment processing, and other services.'
      },
      {
        question: 'When do I get paid?',
        answer: 'Payments are processed monthly. You\'ll receive your earnings via PayPal or bank transfer on the 1st of each month.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'What browsers are supported?',
        answer: 'Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated.'
      },
      {
        question: 'Can I use the platform on mobile?',
        answer: 'Yes! Our platform is fully responsive and works great on phones and tablets.'
      },
      {
        question: 'I\'m having trouble with playback',
        answer: 'Try refreshing the page, checking your internet connection, or clearing your browser cache. Contact support if issues persist.'
      }
    ]
  }
];

export const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our platform
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            icon={Search}
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQ.map((category) => (
            <Card key={category.category} className="overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.category}
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, index) => {
                  const itemId = `${category.category}-${index}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <div key={itemId}>
                      <button
                        className="w-full px-6 py-4 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
                        onClick={() => toggleItem(itemId)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900 pr-4">
                            {item.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {filteredFAQ.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              No FAQ items found matching your search.
            </p>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="p-8 mt-12 text-center bg-purple-50 border-purple-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@musicstore.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-purple-300 text-base font-medium rounded-lg text-purple-700 bg-white hover:bg-purple-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </Card>
      </div>
    </Layout>
  );
};