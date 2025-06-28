import { Facebook, Twitter, Instagram } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { colorTheme } = useTheme();

  return (
    <footer className="relative z-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 backdrop-blur-md shadow-2xl rounded-t-3xl overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">About Us</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              eCommerce - The ultimate shopping experience.
            </p>
          </div>

          {/* Center Column - Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Helpful Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/shipping-info"
                  className="text-sm hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/customer-support"
                  className="text-sm hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                >
                  Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-red transition-colors duration-200"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} eCommerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
