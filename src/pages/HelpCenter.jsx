import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Search,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import Navbar from '../components/navbar';

const HelpCenter = () => {
  const { t, lang } = useLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      category: lang === 'ar' ? 'الطلبات والشحن' : 'Orders & Shipping',
      questions: [
        {
          question: lang === 'ar' ? 'كيف يمكنني تتبع طلبي؟' : 'How can I track my order?',
          answer: lang === 'ar'
            ? 'يمكنك تتبع طلبك من خلال صفحة "طلباتي" في حسابك الشخصي، أو من خلال رقم التتبع المرسل إليك عبر البريد الإلكتروني.'
            : 'You can track your order through the "My Orders" page in your account, or through the tracking number sent to you via email.'
        },
        {
          question: lang === 'ar' ? 'ما هي أوقات التوصيل؟' : 'What are the delivery times?',
          answer: lang === 'ar'
            ? 'أوقات التوصيل تختلف حسب المنطقة. الرياض: 1-2 أيام عمل، جدة والدمام: 2-3 أيام عمل، باقي المناطق: 3-5 أيام عمل.'
            : 'Delivery times vary by region. Riyadh: 1-2 business days, Jeddah & Dammam: 2-3 business days, other regions: 3-5 business days.'
        },
        {
          question: lang === 'ar' ? 'هل الشحن مجاني؟' : 'Is shipping free?',
          answer: lang === 'ar'
            ? 'نعم، الشحن مجاني للطلبات التي تزيد قيمتها عن 1000 جنيه مصري.'
            : 'Yes, shipping is free for orders over 1000 Egyptian Pounds.'
        }
      ]
    },
    {
      id: 2,
      category: lang === 'ar' ? 'الدفع والأمان' : 'Payment & Security',
      questions: [
        {
          question: lang === 'ar' ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?',
          answer: lang === 'ar'
            ? 'نحن نقبل البطاقات الائتمانية (فيزا، ماستركارد)، والمدى، والدفع عند الاستلام.'
            : 'We accept credit cards (Visa, Mastercard), Mada, and cash on delivery.'
        },
        {
          question: lang === 'ar' ? 'هل بياناتي آمنة؟' : 'Is my data secure?',
          answer: lang === 'ar'
            ? 'نعم، نستخدم أحدث تقنيات التشفير لحماية بياناتك الشخصية ومعلومات الدفع.'
            : 'Yes, we use the latest encryption technologies to protect your personal data and payment information.'
        }
      ]
    },
    {
      id: 3,
      category: lang === 'ar' ? 'المنتجات والجودة' : 'Products & Quality',
      questions: [
        {
          question: lang === 'ar' ? 'ما هي سياسة الإرجاع؟' : 'What is the return policy?',
          answer: lang === 'ar'
            ? 'يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام إذا كان بحالته الأصلية.'
            : 'You can return the product within 14 days of receipt if it is in its original condition.'
        },
        {
          question: lang === 'ar' ? 'هل المنتجات أصلية؟' : 'Are the products original?',
          answer: lang === 'ar'
            ? 'نعم، جميع منتجاتنا أصلية 100% ومضمونة من الشركات المصنعة.'
            : 'Yes, all our products are 100% original and guaranteed by the manufacturers.'
        }
      ]
    },
    {
      id: 4,
      category: lang === 'ar' ? 'الحساب والتسجيل' : 'Account & Registration',
      questions: [
        {
          question: lang === 'ar' ? 'كيف يمكنني تغيير كلمة المرور؟' : 'How can I change my password?',
          answer: lang === 'ar'
            ? 'يمكنك تغيير كلمة المرور من صفحة الإعدادات في حسابك الشخصي.'
            : 'You can change your password from the settings page in your account.'
        },
        {
          question: lang === 'ar' ? 'كيف يمكنني تحديث معلوماتي الشخصية؟' : 'How can I update my personal information?',
          answer: lang === 'ar'
            ? 'يمكنك تحديث معلوماتك الشخصية من صفحة الملف الشخصي في حسابك.'
            : 'You can update your personal information from the profile page in your account.'
        }
      ]
    }
  ];

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const supportOptions = [
    {
      icon: MessageCircle,
      title: t('liveChat'),
      description: lang === 'ar' ? 'احصل على مساعدة فورية' : 'Get instant help',
      action: () => window.open('https://wa.me/966500000000', '_blank'),
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Mail,
      title: t('emailSupport'),
      description: lang === 'ar' ? 'راسلنا عبر البريد الإلكتروني' : 'Contact us via email',
      action: () => window.open('mailto:support@ecmorece.com', '_blank'),
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: Phone,
      title: t('phoneSupport'),
      description: lang === 'ar' ? 'اتصل بنا مباشرة' : 'Call us directly',
      action: () => window.open('tel:+966500000000', '_blank'),
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('helpCenter')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {lang === 'ar'
                ? 'كيف يمكننا مساعدتك؟ ابحث عن إجابة لسؤالك أو تواصل معنا مباشرة.'
                : 'How can we help you? Search for an answer to your question or contact us directly.'
              }
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'ابحث في الأسئلة الشائعة...' : 'Search FAQs...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={index}
                  onClick={option.action}
                  className={`p-6 rounded-2xl ${option.bgColor} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  <IconComponent className={`h-8 w-8 ${option.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {filteredFaq.map((category) => (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(`${category.id}-${index}`)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        {expandedFaq === `${category.id}-${index}` ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === `${category.id}-${index}` && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {lang === 'ar' ? 'لم تجد ما تبحث عنه؟' : "Couldn't find what you're looking for?"}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {lang === 'ar'
                ? 'فريق الدعم الفني لدينا متاح 24/7 لمساعدتك'
                : 'Our support team is available 24/7 to help you'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/966500000000', '_blank')}
                className="px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('liveChat')}
              </button>
              <button
                onClick={() => window.open('mailto:support@ecmorece.com', '_blank')}
                className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                {t('emailSupport')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter; 