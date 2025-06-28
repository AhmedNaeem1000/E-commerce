import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Truck,
  CreditCard,
  Headphones,
  Zap,
  Users,
  Award,
  Globe
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const WhyChooseUs = () => {
  const { t, lang } = useLang();
  const { colorTheme } = useTheme();

  const features = [
    {
      icon: Shield,
      title: lang === 'ar' ? 'أمان مضمون' : 'Secure Shopping',
      description: lang === 'ar'
        ? 'تسوق بأمان مع حماية متقدمة للمعاملات والبيانات الشخصية'
        : 'Shop with confidence using advanced transaction and data protection',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Truck,
      title: lang === 'ar' ? 'شحن سريع' : 'Fast Delivery',
      description: lang === 'ar'
        ? 'توصيل سريع لجميع أنحاء البلاد مع تتبع مباشر للشحنات'
        : 'Fast delivery nationwide with real-time shipment tracking',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CreditCard,
      title: lang === 'ar' ? 'دفع آمن' : 'Secure Payment',
      description: lang === 'ar'
        ? 'خيارات دفع متعددة وآمنة مع دعم جميع البطاقات والدفع الإلكتروني'
        : 'Multiple secure payment options supporting all cards and digital payments',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Headphones,
      title: lang === 'ar' ? 'دعم 24/7' : '24/7 Support',
      description: lang === 'ar'
        ? 'فريق دعم متاح على مدار الساعة لمساعدتك في أي وقت'
        : 'Round-the-clock support team ready to help you anytime',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-900/20 dark:to-secondary-900/20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {lang === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {lang === 'ar'
              ? 'نحن نقدم تجربة تسوق استثنائية مع أفضل الخدمات والمنتجات عالية الجودة'
              : 'We provide an exceptional shopping experience with the best services and high-quality products'
            }
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <feature.icon className="w-12 h-12 text-primary-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-gradient hover:bg-primary-gradient-hover text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {lang === 'ar' ? 'ابدأ التسوق الآن' : 'Start Shopping Now'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 