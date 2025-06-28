// تعريف مناطق الشحن وأسعارها في مصر
export const shippingZones = {
  // المناطق الرئيسية في مصر
  cairo: {
    name: 'القاهرة',
    nameEn: 'Cairo',
    cost: 25,
    deliveryTime: '1-2 أيام عمل'
  },
  giza: {
    name: 'الجيزة',
    nameEn: 'Giza',
    cost: 30,
    deliveryTime: '1-2 أيام عمل'
  },
  alexandria: {
    name: 'الإسكندرية',
    nameEn: 'Alexandria',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  sharmElSheikh: {
    name: 'شرم الشيخ',
    nameEn: 'Sharm El Sheikh',
    cost: 50,
    deliveryTime: '3-4 أيام عمل'
  },
  hurghada: {
    name: 'الغردقة',
    nameEn: 'Hurghada',
    cost: 45,
    deliveryTime: '3-4 أيام عمل'
  },
  luxor: {
    name: 'الأقصر',
    nameEn: 'Luxor',
    cost: 40,
    deliveryTime: '3-4 أيام عمل'
  },
  aswan: {
    name: 'أسوان',
    nameEn: 'Aswan',
    cost: 45,
    deliveryTime: '4-5 أيام عمل'
  },
  portSaid: {
    name: 'بورسعيد',
    nameEn: 'Port Said',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  suez: {
    name: 'السويس',
    nameEn: 'Suez',
    cost: 30,
    deliveryTime: '2-3 أيام عمل'
  },
  ismailia: {
    name: 'الإسماعيلية',
    nameEn: 'Ismailia',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  mansoura: {
    name: 'المنصورة',
    nameEn: 'Mansoura',
    cost: 40,
    deliveryTime: '3-4 أيام عمل'
  },
  tanta: {
    name: 'طنطا',
    nameEn: 'Tanta',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  zagazig: {
    name: 'الزقازيق',
    nameEn: 'Zagazig',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  beniSuef: {
    name: 'بني سويف',
    nameEn: 'Beni Suef',
    cost: 40,
    deliveryTime: '3-4 أيام عمل'
  },
  fayoum: {
    name: 'الفيوم',
    nameEn: 'Fayoum',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  minya: {
    name: 'المنيا',
    nameEn: 'Minya',
    cost: 45,
    deliveryTime: '3-4 أيام عمل'
  },
  assiut: {
    name: 'أسيوط',
    nameEn: 'Assiut',
    cost: 50,
    deliveryTime: '4-5 أيام عمل'
  },
  sohag: {
    name: 'سوهاج',
    nameEn: 'Sohag',
    cost: 55,
    deliveryTime: '4-5 أيام عمل'
  },
  qena: {
    name: 'قنا',
    nameEn: 'Qena',
    cost: 50,
    deliveryTime: '4-5 أيام عمل'
  },
  redSea: {
    name: 'البحر الأحمر',
    nameEn: 'Red Sea',
    cost: 60,
    deliveryTime: '5-6 أيام عمل'
  },
  newValley: {
    name: 'الوادي الجديد',
    nameEn: 'New Valley',
    cost: 70,
    deliveryTime: '6-7 أيام عمل'
  },
  matrouh: {
    name: 'مطروح',
    nameEn: 'Matrouh',
    cost: 65,
    deliveryTime: '5-6 أيام عمل'
  },
  northSinai: {
    name: 'شمال سيناء',
    nameEn: 'North Sinai',
    cost: 55,
    deliveryTime: '4-5 أيام عمل'
  },
  southSinai: {
    name: 'جنوب سيناء',
    nameEn: 'South Sinai',
    cost: 60,
    deliveryTime: '5-6 أيام عمل'
  },
  kafrElSheikh: {
    name: 'كفر الشيخ',
    nameEn: 'Kafr El Sheikh',
    cost: 40,
    deliveryTime: '3-4 أيام عمل'
  },
  gharbia: {
    name: 'الغربية',
    nameEn: 'Gharbia',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  monufia: {
    name: 'المنوفية',
    nameEn: 'Monufia',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  qalyubia: {
    name: 'القليوبية',
    nameEn: 'Qalyubia',
    cost: 30,
    deliveryTime: '1-2 أيام عمل'
  },
  sharqia: {
    name: 'الشرقية',
    nameEn: 'Sharqia',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  dakahlia: {
    name: 'الدقهلية',
    nameEn: 'Dakahlia',
    cost: 40,
    deliveryTime: '3-4 أيام عمل'
  },
  damietta: {
    name: 'دمياط',
    nameEn: 'Damietta',
    cost: 35,
    deliveryTime: '2-3 أيام عمل'
  },
  beheira: {
    name: 'البحيرة',
    nameEn: 'Beheira',
    cost: 40,
    deliveryTime: '3-4 أيام عمل'
  }
};

// حد الشحن المجاني - 1000 جنيه مصري
export const freeShippingThreshold = 1000;

// حساب سعر الشحن حسب المنطقة
export const calculateShippingCost = (zone, subtotal = 0) => {
  if (!zone || !shippingZones[zone]) {
    return 0;
  }

  // إذا كان إجمالي الطلب أكبر من الحد الأدنى، الشحن مجاني
  if (subtotal >= freeShippingThreshold) {
    return 0;
  }

  return shippingZones[zone].cost;
};

// الحصول على معلومات منطقة الشحن
export const getShippingZoneInfo = (zone) => {
  return shippingZones[zone] || null;
};

// الحصول على جميع مناطق الشحن
export const getAllShippingZones = () => {
  return Object.entries(shippingZones).map(([id, zone]) => ({
    id,
    ...zone
  }));
};

// البحث عن منطقة الشحن حسب اسم المدينة
export const findZoneByCity = (cityName) => {
  const cityNameLower = cityName.toLowerCase();

  for (const [id, zone] of Object.entries(shippingZones)) {
    if (zone.name.toLowerCase().includes(cityNameLower) ||
      zone.nameEn.toLowerCase().includes(cityNameLower)) {
      return id;
    }
  }

  return null;
}; 