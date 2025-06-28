import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Breadcrumbs = ({ items = [] }) => {
  const location = useLocation();

  // Generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs = [
      { name: 'Home', path: '/', icon: Home }
    ];

    let currentPath = '';
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;

      // Convert pathname to readable name
      const readableName = name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name: readableName,
        path: currentPath,
        icon: null
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const Icon = item.icon;

        return (
          <React.Fragment key={item.path}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              {isLast ? (
                <span className="font-medium text-gray-900 dark:text-white flex items-center">
                  {Icon && <Icon className="w-4 h-4 mr-1" />}
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                >
                  {Icon && <Icon className="w-4 h-4 mr-1" />}
                  {item.name}
                </Link>
              )}
            </motion.div>

            {!isLast && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs; 