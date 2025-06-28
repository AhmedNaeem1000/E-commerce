import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Send, Gift } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { toast } from 'react-hot-toast';

const EmailSubscriptionBanner = () => {
  const { lang } = useLang();

  const schema = yup.object({
    email: yup
      .string()
      .email(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email')
      .required(lang === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(
        lang === 'ar'
          ? 'تم الاشتراك بنجاح! تحقق من بريدك الإلكتروني للحصول على الخصم'
          : 'Successfully subscribed! Check your email for the discount',
        { duration: 5000, icon: '🎉' }
      );
      reset();
    } catch (error) {
      toast.error(
        lang === 'ar'
          ? 'حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى'
          : 'An error occurred while subscribing. Please try again',
        { duration: 4000 }
      );
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
          >
            <Gift className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {lang === 'ar'
              ? 'اشترك واحصل على خصم 10% على طلبك الأول!'
              : 'Subscribe and get 10% off your first order!'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            {lang === 'ar'
              ? 'كن أول من يعرف عن أحدث المنتجات والعروض الخاصة. اشترك الآن واحصل على خصم حصري!'
              : 'Be the first to know about our latest products and special offers. Subscribe now and get an exclusive discount!'}
          </motion.p>
        </div>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto"
        >
          <div className="relative">
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 flex items-center gap-2 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">
                  {lang === 'ar' ? 'اشتراك' : 'Subscribe'}
                </span>
              </motion.button>
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-200 text-sm mt-2 text-center"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-sm text-center mt-4"
          >
            {lang === 'ar'
              ? 'يمكنك إلغاء الاشتراك في أي وقت. نحترم خصوصيتك.'
              : 'You can unsubscribe at any time. We respect your privacy.'}
          </motion.p>
        </motion.form>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex justify-center items-center gap-8 mt-8 text-white/80 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{lang === 'ar' ? 'لا رسوم إضافية' : 'No hidden fees'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>{lang === 'ar' ? 'إلغاء في أي وقت' : 'Cancel anytime'}</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EmailSubscriptionBanner; 