import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import LocationPicker from "../components/LocationPicker";
import { CreditCard, Wallet } from 'lucide-react';
import Navbar from '../components/navbar';


// أيقونات دفع وهمية (SVG بسيطة)
const PayPalIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff" /><text x="7" y="22" fontSize="14" fontWeight="bold" fill="#003087">Pay</text><text x="17" y="22" fontSize="14" fontWeight="bold" fill="#009cde">Pal</text></svg>
);
const ApplePayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff" /><text x="7" y="22" fontSize="14" fontWeight="bold" fill="#111">Pay</text></svg>
);
const GooglePayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff" /><text x="7" y="22" fontSize="14" fontWeight="bold" fill="#4285F4">G</text><text x="15" y="22" fontSize="14" fontWeight="bold" fill="#EA4335">o</text><text x="21" y="22" fontSize="14" fontWeight="bold" fill="#FBBC05">o</text><text x="27" y="22" fontSize="14" fontWeight="bold" fill="#34A853">gle</text><text x="7" y="30" fontSize="10" fontWeight="bold" fill="#111">Pay</text></svg>
);

const BRAND_PRIMARY = 'from-blue-900 to-blue-700'; // تدرج أزرق ملكي
const BRAND_ACCENT = 'text-orange-500';
const BRAND_BG = 'bg-blue-50';
const BRAND_FONT = 'font-cairo';
const BRAND_SHADOW = '0 4px 24px 0 rgba(26,35,126,0.07)';

const Checkout = () => {
  const { colorTheme } = useTheme();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [lang, setLang] = useState('ar');
  const [step, setStep] = useState(1); // 1: الشحن, 2: الدفع, 3: ملخص الطلب
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod: عند الاستلام
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [payError, setPayError] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    if (items.length === 0) {
      window.location.href = '/';
      return;
    }
    setCartItems(items);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleLocationSelect = (location) => {
    // location.lat, location.lng, location.address (إذا متوفر)
    setFormData(prev => ({ ...prev, address: location.address || prev.address }));
  };

  // خطوة 1: تحقق من بيانات الشحن
  const handleNextShipping = () => {
    const { fullName, phone, address } = formData;
    if (!fullName || !phone || !address) {
      toast.error('يرجى ملء جميع بيانات الشحن');
      return;
    }
    setStep(2);
  };

  // خطوة 2: تحقق من الدفع
  const handleNextPayment = () => {
    if (!paymentMethod) {
      toast.error('يرجى اختيار طريقة الدفع');
      return;
    }
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error('يرجى إدخال بيانات البطاقة كاملة');
        return;
      }
    }
    setStep(3);
  };

  // تأكيد الطلب
  const handleConfirmOrder = () => {
    const order = {
      ...formData,
      deliveryMethod,
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : undefined,
      date: new Date().toISOString(),
      cart: cartItems,
    };
    // حفظ الطلب في localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    setOrderInfo({ ...order, orderIndex: orders.length });
    setOrderSuccess(true);
  };

  // طرق دفع حقيقية فقط
  const paymentOptions = [
    { key: 'cod', label: 'الدفع عند الاستلام', icon: <span className="text-xl">💵</span> },
    { key: 'card', label: 'بطاقة بنكية', icon: <span className="text-xl">💳</span> },
  ];

  const handlePay = async (e) => {
    e.preventDefault();
    setIsPaying(true);
    setPayError(null);

    try {
      if (paymentMethod === 'cod') {
        handleNextPayment();
      } else if (paymentMethod === 'card') {
        if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
          setPayError('يرجى إدخال بيانات البطاقة كاملة');
          setIsPaying(false);
          return;
        }
        handleNextPayment();
      }
    } catch (error) {
      setPayError('حدث خطأ أثناء الدفع. يرجى المحاولة لاحقًا.');
      setIsPaying(false);
    }
  };

  // UI/UX: خطوات checkout في صفحة واحدة
  return (
    <>
      <Navbar />
      {/* Progress Bar */}
      <div className="w-full flex flex-col items-center bg-transparent pt-6 pb-2">
        <div className="w-full max-w-3xl px-4">
          <div className="flex items-center justify-between relative">
            {/* Steps */}
            {['الشحن', 'الدفع', 'تأكيد الطلب'].map((label, idx) => {
              const active = step === idx + 1;
              const completed = step > idx + 1;
              return (
                <div key={label} className="flex-1 flex flex-col items-center z-10">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 font-bold text-lg
                    ${active ? 'bg-primary-600 border-primary-600 text-white shadow-lg' : completed ? 'bg-accent-yellow border-accent-yellow text-white' : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400'}`}
                  >
                    {idx + 1}
                  </div>
                  <span className={`mt-2 text-xs md:text-sm font-semibold transition-colors duration-300
                    ${active ? 'text-primary-700 dark:text-primary-400' : completed ? 'text-accent-yellow' : 'text-gray-400'}`}
                  >{label}</span>
                </div>
              );
            })}
            {/* Progress Line */}
            <div className="absolute top-4 left-0 right-0 h-1 flex items-center" aria-hidden="true">
              <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div
                className="absolute h-1 rounded-full transition-all duration-500 bg-gradient-to-l from-primary-400 to-primary-600"
                style={{
                  right: 0,
                  left: `${((step - 1) / 2) * 100}%`,
                  width: `${(step - 1) / 2 * 100}%`,
                  minWidth: step === 1 ? 0 : '8%',
                  zIndex: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={
        `min-h-screen bg-bg-primary dark:bg-bg-primary-dark font-cairo flex flex-col items-center justify-center transition-colors duration-300`
      }>
        <div className="w-full flex flex-col items-center py-8 px-2 md:px-0">
          {/* شعار ومقدمة */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center shadow-lg">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="18" fill="#f59e0b" /><path d="M12 18l5 5 7-9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-center text-primary-700 dark:text-primary-400 tracking-tight">إتمام الشراء</h1>
            <p className="mt-2 text-base md:text-lg text-text-secondary dark:text-text-secondary-dark">مرحبًا بك! يرجى إكمال بياناتك لإتمام الطلب بسرعة وأمان.</p>
          </div>
          {/* توزيع جانبي */}
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 bg-bg-primary dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 md:p-10 border border-border-color dark:border-border-color-dark transition-colors duration-300">
            {/* يمين: ملخص الطلب */}
            <div className="md:w-5/12 w-full mb-8 md:mb-0 flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-primary-700 dark:text-primary-400">ملخص الطلب</h2>
              <div className="mb-4">
                <ul className="text-base text-text-primary dark:text-text-primary-dark mb-2">
                  {cartItems.map((item, idx) => (
                    <li key={item.id || idx} className="flex justify-between border-b border-dashed border-border-color dark:border-border-color-dark py-2">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="text-accent-yellow">{`ج.م ${(item.price * item.quantity).toFixed(2)}`}</span>
                    </li>
                  ))}
                </ul>
                <div className="font-bold mt-2 text-lg flex justify-between">
                  <span>المجموع:</span>
                  <span className="text-primary-700 dark:text-primary-400">{`ج.م ${subtotal.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="my-6 border-t-4 border-dotted border-accent-yellow"></div>
              {/* إذا تم الطلب بنجاح، عرض ملخص الطلب */}
              {orderSuccess && orderInfo && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-green rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-accent-green mb-2">تم تأكيد الطلب!</h2>
                  <div className="mb-2 text-lg">رقم الطلب: <span className="text-primary-700 dark:text-primary-400 font-bold">#{orderInfo.orderIndex}</span></div>
                  <div className="mb-2 text-lg">الاسم: <span className="font-semibold">{orderInfo.fullName}</span></div>
                  <div className="mb-2 text-lg">العنوان: <span className="font-semibold">{orderInfo.address}</span></div>
                  <div className="mb-2 text-lg">رقم الهاتف: <span className="font-semibold">{orderInfo.phone}</span></div>
                  <div className="mb-2 text-lg">طريقة الدفع: <span className="font-semibold">{
                    paymentOptions.find(opt => opt.key === orderInfo.paymentMethod)?.label
                  }</span></div>
                  <div className="mb-2 text-lg">تاريخ الطلب: <span className="font-semibold">{new Date(orderInfo.date).toLocaleString('ar-EG')}</span></div>
                  <a href="/my-orders" className="inline-block bg-primary-gradient hover:bg-primary-gradient-hover text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mt-4 text-lg">عرض طلباتي</a>
                  <a href="/" className="inline-block bg-bg-secondary dark:bg-bg-secondary-dark hover:bg-primary-100 dark:hover:bg-primary-900 text-text-primary dark:text-text-primary-dark font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mt-4 ml-2 text-lg">العودة للرئيسية</a>
                </div>
              )}
            </div>
            {/* يسار: الشحن والدفع */}
            <div className="md:w-7/12 w-full flex flex-col">
              {/* شريط الخطوات */}
              <div className="flex justify-between items-center mb-8">
                <div className={`flex-1 text-center font-semibold text-lg ${step >= 1 ? 'text-primary-700 dark:text-primary-400' : 'text-gray-400'}`}>الشحن</div>
                <div className="w-8 h-1 bg-accent-yellow rounded mx-2" />
                <div className={`flex-1 text-center font-semibold text-lg ${step >= 2 ? 'text-primary-700 dark:text-primary-400' : 'text-gray-400'}`}>الدفع</div>
                <div className="w-8 h-1 bg-accent-yellow rounded mx-2" />
                <div className={`flex-1 text-center font-semibold text-lg ${step === 3 ? 'text-primary-700 dark:text-primary-400' : 'text-gray-400'}`}>تأكيد الطلب</div>
              </div>
              {/* محتوى الخطوات */}
              {!orderSuccess && step === 1 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-6 text-primary-700 dark:text-primary-400">معلومات الشحن</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-medium text-text-primary dark:text-text-primary-dark mb-2">الاسم الكامل</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-bg-secondary dark:bg-bg-secondary-dark border-border-color dark:border-border-color-dark text-lg transition-colors duration-300" placeholder="مثال: محمد أحمد" />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-text-primary dark:text-text-primary-dark mb-2">رقم الهاتف</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-bg-secondary dark:bg-bg-secondary-dark border-border-color dark:border-border-color-dark text-lg transition-colors duration-300" placeholder="مثال: 01000000000" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-base font-medium text-text-primary dark:text-text-primary-dark mb-2">العنوان</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-bg-secondary dark:bg-bg-secondary-dark border-border-color dark:border-border-color-dark text-lg transition-colors duration-300" placeholder="مثال: شارع التحرير" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3 text-accent-yellow">اختر موقعك على الخريطة</h3>
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                  </div>
                  <button onClick={handleNextShipping} className="w-full mt-8 font-bold py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg bg-primary-gradient hover:bg-primary-gradient-hover text-white">التالي</button>
                </div>
              )}
              {!orderSuccess && step === 2 && (
                <form className="mb-8" onSubmit={handlePay}>
                  <h2 className="text-xl font-bold mb-6 text-primary-700 dark:text-primary-400">طريقة الدفع</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`
                        group flex-1 flex flex-col items-start justify-center p-6 rounded-2xl border-2 transition-all duration-200
                        shadow-sm text-lg font-semibold focus:outline-none relative overflow-hidden
                        ${paymentMethod === 'cod'
                          ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-300 shadow-lg scale-105'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-yellow-50'}
                      `}
                    >
                      <span className="font-bold text-lg text-gray-900 dark:text-white mb-1">الدفع عند الاستلام</span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">ادفع نقدًا عند استلام الطلب من مندوب التوصيل.</span>
                      {paymentMethod === 'cod' && (
                        <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow text-white text-base font-bold">✓</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`
                        group flex-1 flex flex-col items-start justify-center p-6 rounded-2xl border-2 transition-all duration-200
                        shadow-sm text-lg font-semibold focus:outline-none relative overflow-hidden
                        ${paymentMethod === 'card'
                          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-400 shadow-lg scale-105'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-primary-50'}
                      `}
                    >
                      <span className="font-bold text-lg text-gray-900 dark:text-white mb-1">بطاقة بنكية</span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">ادفع بأمان باستخدام بطاقتك البنكية (فيزا/ماستر كارد).</span>
                      {paymentMethod === 'card' && (
                        <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center shadow text-white text-base font-bold">✓</span>
                      )}
                    </button>
                  </div>
                  {/* حقول البطاقة فقط إذا اختار بطاقة */}
                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-base font-medium text-text-primary dark:text-text-primary-dark mb-2">رقم البطاقة</label>
                        <input type="text" name="number" value={cardDetails.number} onChange={handleCardChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-bg-secondary dark:bg-bg-secondary-dark border-border-color dark:border-border-color-dark text-lg transition-colors duration-300" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-text-primary dark:text-text-primary-dark mb-2">اسم حامل البطاقة</label>
                        <input type="text" name="name" value={cardDetails.name} onChange={handleCardChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-bg-secondary dark:bg-bg-secondary-dark border-border-color dark:border-border-color-dark text-lg transition-colors duration-300" placeholder="الاسم على البطاقة" required />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-text-primary dark:text-text-primary-dark mb-2">تاريخ الانتهاء</label>
                        <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleCardChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-bg-secondary dark:bg-bg-secondary-dark border-border-color dark:border-border-color-dark text-lg transition-colors duration-300" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-text-primary dark:text-text-primary-dark mb-2">CVV</label>
                        <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-bg-secondary dark:bg-bg-secondary-dark border-border-color dark:border-border-color-dark text-lg transition-colors duration-300" placeholder="123" required />
                      </div>
                    </div>
                  )}
                  {payError && <div className="text-red-600 text-center mb-4">{payError}</div>}
                  <button type="submit" disabled={isPaying} className="w-full mt-8 font-bold py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg bg-primary-gradient hover:bg-primary-gradient-hover text-white disabled:opacity-60 disabled:cursor-not-allowed">
                    {isPaying ? '...جاري الدفع' : 'تأكيد الدفع'}
                  </button>
                </form>
              )}
              {!orderSuccess && step === 3 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-6 text-primary-700 dark:text-primary-400">تأكيد الطلب</h2>
                  <div className="mb-4 text-lg">
                    <div className="mb-2">الاسم: <span className="font-semibold">{formData.fullName}</span></div>
                    <div className="mb-2">العنوان: <span className="font-semibold">{formData.address}</span></div>
                    <div className="mb-2">رقم الهاتف: <span className="font-semibold">{formData.phone}</span></div>
                    <div className="mb-2">طريقة الدفع: <span className="font-semibold">{
                      paymentOptions.find(opt => opt.key === paymentMethod)?.label
                    }</span></div>
                  </div>
                  <button onClick={handleConfirmOrder} className="w-full mt-8 font-bold py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg bg-primary-gradient hover:bg-primary-gradient-hover text-white">تأكيد الطلب</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
