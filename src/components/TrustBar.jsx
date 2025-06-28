import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, CreditCard, RotateCcw } from 'lucide-react';
import { useLang } from '../context/LangContext';

const TrustBar = () => {
  const { lang } = useLang();

  const trustItems = [
    {
      icon: Truck,
      title: lang === 'ar' ? 'شحن مجاني' : 'Free Shipping',
      subtitle: lang === 'ar' ? 'لجميع الطلبات' : 'On all orders',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: lang === 'ar' ? 'دفع آمن' : 'Secure Checkout',
      subtitle: lang === 'ar' ? 'حماية كاملة' : '100% Protected',
      color: 'text-blue-600'
    },
    {
      icon: CreditCard,
      title: lang === 'ar' ? 'خيارات دفع متعددة' : 'Multiple Payment',
      subtitle: lang === 'ar' ? 'بطاقات ودفع إلكتروني' : 'Cards & Digital',
      color: 'text-purple-600'
    },
    {
      icon: RotateCcw,
      title: lang === 'ar' ? 'إرجاع سهل' : 'Easy Returns',
      subtitle: lang === 'ar' ? 'خلال 30 يوم' : 'Within 30 days',
      color: 'text-orange-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors duration-200`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TrustBar; 