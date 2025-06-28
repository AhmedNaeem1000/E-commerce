// نظام العروض والكوبونات
export const promotions = [
  {
    id: 1,
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage', // percentage or fixed
    minAmount: 100,
    maxDiscount: 50,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    usageLimit: 100,
    usedCount: 0,
    isActive: true,
    description: 'خصم 10% على أول طلب',
    descriptionEn: '10% off on first order'
  },
  {
    id: 2,
    code: 'FREESHIP',
    discount: 0,
    type: 'shipping',
    minAmount: 200,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    usageLimit: 50,
    usedCount: 0,
    isActive: true,
    description: 'شحن مجاني للطلبات فوق 200 جنيه',
    descriptionEn: 'Free shipping for orders above 200 EGP'
  },
  {
    id: 3,
    code: 'SAVE20',
    discount: 20,
    type: 'percentage',
    minAmount: 300,
    maxDiscount: 100,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    usageLimit: 30,
    usedCount: 0,
    isActive: true,
    description: 'خصم 20% على الطلبات الكبيرة',
    descriptionEn: '20% off on large orders'
  }
];

// العروض الخاصة على المنتجات
export const productOffers = [
  {
    id: 1,
    productId: 1,
    discount: 15,
    type: 'percentage',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    isActive: true,
    description: 'خصم 15% على هذا المنتج',
    descriptionEn: '15% off on this product'
  },
  {
    id: 2,
    productId: 3,
    discount: 25,
    type: 'percentage',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    isActive: true,
    description: 'خصم 25% على هذا المنتج',
    descriptionEn: '25% off on this product'
  }
];

// دوال مساعدة للعروض
export const validatePromoCode = (code, subtotal, usedCodes = []) => {
  const promotion = promotions.find(p => p.code === code && p.isActive);

  if (!promotion) {
    return { valid: false, message: 'كوبون غير صحيح' };
  }

  if (usedCodes.includes(code)) {
    return { valid: false, message: 'تم استخدام هذا الكوبون من قبل' };
  }

  const now = new Date();
  const validFrom = new Date(promotion.validFrom);
  const validTo = new Date(promotion.validTo);

  if (now < validFrom || now > validTo) {
    return { valid: false, message: 'الكوبون منتهي الصلاحية' };
  }

  if (promotion.usageLimit && promotion.usedCount >= promotion.usageLimit) {
    return { valid: false, message: 'تم استنفاذ الكوبون' };
  }

  if (subtotal < promotion.minAmount) {
    return {
      valid: false,
      message: `الحد الأدنى للطلب ${promotion.minAmount} جنيه`
    };
  }

  return { valid: true, promotion };
};

export const calculateDiscount = (promotion, subtotal) => {
  if (promotion.type === 'percentage') {
    let discount = (subtotal * promotion.discount) / 100;
    if (promotion.maxDiscount) {
      discount = Math.min(discount, promotion.maxDiscount);
    }
    return discount;
  } else if (promotion.type === 'fixed') {
    return promotion.discount;
  } else if (promotion.type === 'shipping') {
    return 0; // سيتم تطبيقه على الشحن
  }
  return 0;
};

export const getProductOffer = (productId) => {
  return productOffers.find(offer =>
    offer.productId === productId &&
    offer.isActive &&
    new Date() >= new Date(offer.validFrom) &&
    new Date() <= new Date(offer.validTo)
  );
};

export const calculateProductDiscount = (product, offer) => {
  if (!offer) return 0;

  if (offer.type === 'percentage') {
    return (product.price * offer.discount) / 100;
  } else if (offer.type === 'fixed') {
    return offer.discount;
  }
  return 0;
}; 