import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const PostPurchase = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Thank You for Your Purchase!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              We hope you love your new items. Your feedback helps us improve our
              service.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Rate Your Experience
            </h2>
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingHover(star)}
                  onMouseLeave={handleRatingLeave}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${star <= (hoverRating || rating)
                      ? 'text-secondary fill-current'
                      : 'text-gray-200 dark:text-gray-800'
                      }`}
                  />
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700/80 dark:text-gray-300/80"
              >
                Share Your Thoughts
              </label>
              <textarea
                id="feedback"
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-primary-500/20 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-primary-500/5 transition-colors duration-200">
              <ThumbsUp className="w-5 h-5" />
              <span>Like Our Service</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-primary-500/5 transition-colors duration-200">
              <MessageSquare className="w-5 h-5" />
              <span>Leave a Review</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-primary-500/5 transition-colors duration-200">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              What's Next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Track Your Order
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Follow your package's journey to your doorstep
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Explore More Products
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover our latest collections and deals
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Join Our Community
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get exclusive offers and updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPurchase;
