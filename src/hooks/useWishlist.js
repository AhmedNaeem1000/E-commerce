import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isLoading: false,

      // Actions
      addToWishlist: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);

          if (existingItem) {
            toast(`${product.name} is already in your wishlist`);
            return state;
          } else {
            const newItem = {
              ...product,
              addedAt: new Date().toISOString()
            };

            toast.success(`Added ${product.name} to wishlist`);
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => {
          const item = state.items.find(item => item.id === productId);
          const updatedItems = state.items.filter(item => item.id !== productId);

          if (item) {
            toast.success(`Removed ${item.name} from wishlist`);
          }

          return { items: updatedItems };
        });
      },

      clearWishlist: () => {
        set({ items: [] });
        toast.success('Wishlist cleared');
      },

      // Computed values
      getItemCount: () => {
        const { items } = get();
        return items.length;
      },

      getItemById: (productId) => {
        const { items } = get();
        return items.find(item => item.id === productId);
      },

      // Check if product is in wishlist
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },

      // Get wishlist items
      getWishlistItems: () => {
        const { items } = get();
        return items;
      },

      // Move items to cart
      moveToCart: (productIds) => {
        const { items } = get();
        const selectedItems = items.filter(item => productIds.includes(item.id));

        if (selectedItems.length === 0) {
          toast.error('No items selected');
          return [];
        }

        // Remove from wishlist
        set((state) => ({
          items: state.items.filter(item => !productIds.includes(item.id))
        }));

        toast.success(`Moved ${selectedItems.length} items to cart`);
        return selectedItems;
      },

      // Bulk operations
      addMultipleToWishlist: (products) => {
        set((state) => {
          const newItems = [...state.items];
          let addedCount = 0;

          products.forEach(product => {
            const existingItem = newItems.find(item => item.id === product.id);
            if (!existingItem) {
              newItems.push({
                ...product,
                addedAt: new Date().toISOString()
              });
              addedCount++;
            }
          });

          if (addedCount > 0) {
            toast.success(`Added ${addedCount} items to wishlist`);
          } else {
            toast('All items are already in your wishlist');
          }

          return { items: newItems };
        });
      },

      // Remove multiple items
      removeMultipleFromWishlist: (productIds) => {
        set((state) => {
          const updatedItems = state.items.filter(item => !productIds.includes(item.id));
          const removedCount = state.items.length - updatedItems.length;

          if (removedCount > 0) {
            toast.success(`Removed ${removedCount} items from wishlist`);
          }

          return { items: updatedItems };
        });
      }
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
);

export default useWishlistStore; 