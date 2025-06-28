import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const Testimonials = () => {
  const { t, lang } = useLang();
  const { colorTheme } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: lang === 'ar' ? 'مدير تسويق' : 'Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: lang === 'ar'
        ? 'تجربة تسوق رائعة! المنتجات عالية الجودة والشحن سريع جداً. أنصح الجميع بالتسوق من هذا المتجر.'
        : 'Amazing shopping experience! High-quality products and very fast shipping. I recommend everyone to shop from this store.',
      location: lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'
    },
    {
      id: 2,
      name: lang === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      role: lang === 'ar' ? 'مصممة جرافيك' : 'Graphic Designer',
      avatar: 'https://media.istockphoto.com/id/1207262542/photo/business-meeting.jpg?s=2048x2048&w=is&k=20&c=i--yfssSN8R4tYBLmAbWxdRxGIjcs5mpdrZhVtRb3DU=',
      rating: 5,
      review: lang === 'ar'
        ? 'أفضل متجر إلكتروني جربته! الأسعار معقولة والخدمة ممتازة. سأعود بالتأكيد للشراء مرة أخرى.'
        : 'The best e-commerce store I\'ve tried! Reasonable prices and excellent service. I will definitely return to shop again.',
      location: lang === 'ar' ? 'الإسكندرية، مصر' : 'Alexandria, Egypt'
    },
    {
      id: 3,
      name: lang === 'ar' ? 'محمد علي' : 'Mohamed Ali',
      role: lang === 'ar' ? 'مهندس برمجيات' : 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: lang === 'ar'
        ? 'متجر موثوق وموثوق به. المنتجات كما هو موصوف تماماً والدعم الفني متجاوب جداً. شكراً لكم!'
        : 'A reliable and trustworthy store. Products are exactly as described and technical support is very responsive. Thank you!',
      location: lang === 'ar' ? 'الجيزة، مصر' : 'Giza, Egypt'
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300 dark:text-gray-600'
          }`}
      />
    ));
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/20" />

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
            {lang === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {lang === 'ar'
              ? 'اكتشف تجارب عملائنا المميزين مع منتجاتنا وخدماتنا'
              : 'Discover the experiences of our valued customers with our products and services'
            }
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quote Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="relative z-10 flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({testimonial.rating}/5)
                  </span>
                </div>

                {/* Review Text */}
                <div className="relative z-10 mb-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{testimonial.review}"
                  </p>
                </div>

                {/* Customer Info */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-16 h-16 text-purple-500" />
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {lang === 'ar' ? 'انضم لعملائنا المميزين' : 'Join Our Valued Customers'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 