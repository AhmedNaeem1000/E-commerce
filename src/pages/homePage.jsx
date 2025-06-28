import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import WhyChooseUs from '../components/WhyChooseUs'
import FeaturedProducts from '../components/FeaturedProducts'
import BestSellers from '../components/BestSellers'
import Testimonials from '../components/Testimonials'
import PromoBanner from '../components/PromoBanner'
import EmailSubscriptionBanner from '../components/EmailSubscriptionBanner'
import { useLang } from '../context/LangContext'
import { Helmet } from 'react-helmet-async'

const HomePage = () => {
  const { t } = useLang();
  return (
    <>
      <Helmet>
        <title>SpearHawk</title>
        <meta name="description" content="تسوق أفضل المنتجات بأفضل الأسعار مع شحن سريع ودعم مميز. اكتشف العروض الحصرية الآن!" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Trust Bar Section */}
      <TrustBar />

      {/* Why Choose Us Section */}
      <div id="why-choose-us">
        <WhyChooseUs />
      </div>

      {/* Featured Products Section */}
      <section className="min-h-[40vh] py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FeaturedProducts />
        </div>
      </section>

      {/* Best Sellers Section */}
      <BestSellers />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Promo Banner Section */}
      <PromoBanner />

      {/* Email Subscription Banner */}
      <EmailSubscriptionBanner />

      <Footer />
    </>
  )
}

export default HomePage