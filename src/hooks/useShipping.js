import { useState, useEffect } from 'react';
import {
  calculateShippingCost,
  getShippingZoneInfo,
  getAllShippingZones,
  findZoneByCity,
  freeShippingThreshold
} from '../data/shippingZones';

export const useShipping = (subtotal = 0) => {
  const [selectedZone, setSelectedZone] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [zoneInfo, setZoneInfo] = useState(null);
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  // حساب سعر الشحن عند تغيير المنطقة أو إجمالي الطلب
  useEffect(() => {
    if (selectedZone) {
      const cost = calculateShippingCost(selectedZone, subtotal);
      const info = getShippingZoneInfo(selectedZone);
      const free = subtotal >= freeShippingThreshold;

      setShippingCost(cost);
      setZoneInfo(info);
      setIsFreeShipping(free);
    } else {
      setShippingCost(0);
      setZoneInfo(null);
      setIsFreeShipping(false);
    }
  }, [selectedZone, subtotal]);

  // تحديد المنطقة حسب اسم المدينة
  const selectZoneByCity = (cityName) => {
    const zoneId = findZoneByCity(cityName);
    if (zoneId) {
      setSelectedZone(zoneId);
      return zoneId;
    }
    return null;
  };

  // الحصول على قائمة جميع المناطق
  const getZones = () => {
    return getAllShippingZones();
  };

  // حساب إجمالي الطلب مع الشحن
  const getTotalWithShipping = () => {
    return subtotal + shippingCost;
  };

  // التحقق من أهلية الشحن المجاني
  const getRemainingForFreeShipping = () => {
    if (subtotal >= freeShippingThreshold) {
      return 0;
    }
    return freeShippingThreshold - subtotal;
  };

  return {
    selectedZone,
    setSelectedZone,
    shippingCost,
    zoneInfo,
    isFreeShipping,
    selectZoneByCity,
    getZones,
    getTotalWithShipping,
    getRemainingForFreeShipping,
    freeShippingThreshold
  };
};

export const useShippingSettings = () => {
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 500,
    defaultShippingCost: 50,
    defaultDeliveryTime: '3-5 أيام عمل',
    deliveryRadius: 50,
    costPerKm: 2,
    timePer10Km: '+1 يوم'
  });

  // تحميل الإعدادات من localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('shippingSettings');
    if (savedSettings) {
      setShippingSettings(JSON.parse(savedSettings));
    }
  }, []);

  // حفظ الإعدادات
  const saveSettings = (newSettings) => {
    setShippingSettings(newSettings);
    localStorage.setItem('shippingSettings', JSON.stringify(newSettings));
  };

  // تحديث إعداد واحد
  const updateSetting = (setting, value) => {
    const newSettings = { ...shippingSettings, [setting]: value };
    saveSettings(newSettings);
  };

  // حساب تكلفة الشحن بناءً على المسافة
  const calculateShippingCost = (distance, orderTotal = 0) => {
    // إذا كان الطلب أكبر من الحد الأدنى، الشحن مجاني
    if (orderTotal >= shippingSettings.freeShippingThreshold) {
      return 0;
    }

    // إذا كانت المسافة أقل من نصف القطر، استخدم التكلفة الافتراضية
    if (distance <= shippingSettings.deliveryRadius) {
      return shippingSettings.defaultShippingCost;
    }

    // حساب التكلفة الإضافية للمسافة الزائدة
    const extraDistance = distance - shippingSettings.deliveryRadius;
    const extraCost = extraDistance * shippingSettings.costPerKm;

    return shippingSettings.defaultShippingCost + extraCost;
  };

  // حساب وقت التوصيل بناءً على المسافة
  const calculateDeliveryTime = (distance) => {
    if (distance <= shippingSettings.deliveryRadius) {
      return shippingSettings.defaultDeliveryTime;
    }

    const extraDistance = distance - shippingSettings.deliveryRadius;
    const extraDays = Math.ceil(extraDistance / 10); // كل 10 كم = يوم إضافي

    return `${shippingSettings.defaultDeliveryTime} ${shippingSettings.timePer10Km.repeat(extraDays)}`;
  };

  return {
    shippingSettings,
    saveSettings,
    updateSetting,
    calculateShippingCost,
    calculateDeliveryTime
  };
}; 