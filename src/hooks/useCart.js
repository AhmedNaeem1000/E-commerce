import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isLoading: false,

      // Actions
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);

          if (existingItem) {
            // Update quantity if item exists
            const updatedItems = state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );

            toast.success(`Added ${quantity} more ${product.name} to cart`);
            return { items: updatedItems };
          } else {
            // Add new item
            const newItem = {
              ...product,
              quantity,
              addedAt: new Date().toISOString()
            };

            toast.success(`Added ${product.name} to cart`);
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          const item = state.items.find(item => item.id === productId);
          const updatedItems = state.items.filter(item => item.id !== productId);

          if (item) {
            toast.success(`Removed ${item.name} from cart`);
          }

          return { items: updatedItems };
        });
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );

          return { items: updatedItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      // Computed values
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
          return total + price * item.quantity;
        }, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          if (item.discount) {
            return total + (item.price * item.discount / 100) * item.quantity;
          }
          return total;
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemById: (productId) => {
        const { items } = get();
        return items.find(item => item.id === productId);
      },

      // Check if product is in cart
      isInCart: (productId) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },

      // Get cart summary
      getCartSummary: () => {
        const { items } = get();
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const total = get().getTotal();
        const itemCount = get().getItemCount();

        return {
          items,
          subtotal,
          discount,
          total,
          itemCount
        };
      },

      // Bulk operations
      addMultipleToCart: (products) => {
        set((state) => {
          const newItems = [...state.items];

          products.forEach(product => {
            const existingItem = newItems.find(item => item.id === product.id);
            if (existingItem) {
              existingItem.quantity += product.quantity || 1;
            } else {
              newItems.push({
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString()
              });
            }
          });

          toast.success(`Added ${products.length} items to cart`);
          return { items: newItems };
        });
      },

      // Move items from wishlist to cart
      moveFromWishlist: (wishlistItems) => {
        get().addMultipleToCart(wishlistItems);
        return wishlistItems.map(item => item.id);
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
);

export default useCartStore; 