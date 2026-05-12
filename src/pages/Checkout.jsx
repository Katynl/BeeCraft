// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import api from "../api";
// import {
//   UserIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   ChatBubbleLeftEllipsisIcon,
//   CreditCardIcon,
//   BanknotesIcon,
//   BuildingStorefrontIcon,
//   ShoppingBagIcon,
// } from "@heroicons/react/24/outline";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, totalPrice, clearCart } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     comment: "",
//     payment_method: "card",
//     pickup_location: "ул. Пушкина, д. 10",
//   });

//   useEffect(() => {
//     if (cartItems.length === 0) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!formData.name || !formData.phone || !formData.email) {
//       alert("Пожалуйста, заполните имя, телефон и email");
//       setLoading(false);
//       return;
//     }

//     const orderData = {
//       name: formData.name,
//       phone: formData.phone,
//       email: formData.email,
//       comment: formData.comment || "",
//       payment_method: formData.payment_method,
//       pickup_location: formData.pickup_location,
//       total: totalPrice,
//       items: cartItems.map((item) => ({
//         product_id: item.id,
//         quantity: item.quantity,
//       })),
//     };

//     try {
//       if (formData.payment_method === "card") {
//         const paymentConfirmed = window.confirm(
//           "Оплата прошла успешно! Нажмите ОК, чтобы подтвердить заказ.",
//         );
//         if (!paymentConfirmed) {
//           setLoading(false);
//           return;
//         }
//       }
//       await api.post("/orders/", orderData);
//       clearCart();
//       alert("Заказ успешно создан! Спасибо за покупку.");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert(
//         "Ошибка при оформлении заказа: " + JSON.stringify(err.response?.data),
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cartItems.length === 0) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-light tracking-tight text-stone-800 mb-3 text-center">
//           Оформление заказа
//         </h1>
//         <div className="w-16 h-0.5 bg-[#f4d864] mx-auto mb-10 rounded-sm"></div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Левая колонка – форма (1/3) */}
//           <div className="lg:w-1/3">
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="relative">
//                 <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Ваше имя"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
//                 />
//               </div>
//               <div className="relative">
//                 <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Телефон"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
//                 />
//               </div>
//               <div className="relative">
//                 <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
//                 />
//               </div>
//               <div className="relative">
//                 <ChatBubbleLeftEllipsisIcon className="absolute left-3 top-4 w-5 h-5 text-stone-400" />
//                 <textarea
//                   name="comment"
//                   placeholder="Комментарий к заказу (необязательно)"
//                   value={formData.comment}
//                   onChange={handleChange}
//                   rows="3"
//                   className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700 resize-none"
//                 />
//               </div>
//               <div className="bg-stone-50 p-4 rounded-sm space-y-4">
//                 <div>
//                   <span className="block text-sm font-medium text-stone-600 mb-2">
//                     Способ оплаты
//                   </span>
//                   <div className="flex flex-wrap gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="payment_method"
//                         value="card"
//                         checked={formData.payment_method === "card"}
//                         onChange={handleChange}
//                         className="text-[#f4d864] focus:ring-[#f4d864]"
//                       />
//                       <CreditCardIcon className="h-5 w-5 text-stone-500" />
//                       <span>Банковская карта</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="payment_method"
//                         value="cash"
//                         checked={formData.payment_method === "cash"}
//                         onChange={handleChange}
//                         className="text-[#f4d864] focus:ring-[#f4d864]"
//                       />
//                       <BanknotesIcon className="h-5 w-5 text-stone-500" />
//                       <span>Наличные при получении</span>
//                     </label>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="block text-sm font-medium text-stone-600 mb-2">
//                     Магазин самовывоза
//                   </span>
//                   <div className="relative">
//                     <BuildingStorefrontIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
//                     <select
//                       name="pickup_location"
//                       value={formData.pickup_location}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700 appearance-none bg-white"
//                     >
//                       <option value="ул. Пушкина, д. 10">
//                         ул. Пушкина, д. 10
//                       </option>
//                       <option value="ул. Лермонтова, д. 5">
//                         ул. Лермонтова, д. 5
//                       </option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Правая колонка – состав заказа (2/3) */}
//           <div className="lg:w-2/3">
//             <div className="bg-white rounded-sm shadow-lg border border-stone-100 overflow-hidden">
//               <div className="p-6 border-b border-stone-100 bg-stone-50/40">
//                 <h2 className="text-xl font-medium text-stone-800 flex items-center gap-2">
//                   <ShoppingBagIcon className="h-5 w-5 text-[#f4d864]" />
//                   Ваш заказ
//                 </h2>
//               </div>
//               <div className="divide-y divide-stone-100">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="p-5 flex items-start gap-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded-sm bg-stone-100"
//                       loading="lazy"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium text-stone-800">
//                         {item.name}
//                       </h3>
//                       <p className="text-stone-500 text-sm mt-0.5">
//                         {item.price} ₽ × {item.quantity} шт.
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold text-stone-800">
//                         {item.price * item.quantity} ₽
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="p-6 bg-stone-50/40 border-t border-stone-100">
//                 <div className="flex justify-between text-lg font-semibold text-stone-800 mb-6">
//                   <span>Итого:</span>
//                   <span>{totalPrice} ₽</span>
//                 </div>
//                 <button disabled={loading} className="...">
//                   {loading ? (
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                       />
//                     </svg>
//                   ) : (
//                     "Оформить заказ"
//                   )}
//                 </button>
//                 <p className="text-xs text-stone-400 text-center mt-4">
//                   Нажимая «Оформить заказ», вы соглашаетесь с условиями
//                   обработки данных.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftEllipsisIcon,
  CreditCardIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
    payment_method: "card",
    pickup_location: "ул. Пушкина, д. 10",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.phone || !formData.email) {
      alert("Пожалуйста, заполните имя, телефон и email");
      setLoading(false);
      return;
    }

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      comment: formData.comment || "",
      payment_method: formData.payment_method,
      pickup_location: formData.pickup_location,
      total: totalPrice,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      if (formData.payment_method === "card") {
        const paymentConfirmed = window.confirm(
          "Оплата прошла успешно! Нажмите ОК, чтобы подтвердить заказ.",
        );
        if (!paymentConfirmed) {
          setLoading(false);
          return;
        }
      }
      await api.post("/orders/", orderData);
      clearCart();
      alert("Заказ успешно создан! Спасибо за покупку.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(
        "Ошибка при оформлении заказа: " + JSON.stringify(err.response?.data),
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-stone-800 mb-3 text-center">
          Оформление заказа
        </h1>
        <div className="w-16 h-0.5 bg-[#f4d864] mx-auto mb-10 rounded-sm"></div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка – форма */}
          <div className="lg:w-1/3">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* поля формы – без изменений */}
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
                />
              </div>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
                />
              </div>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
                />
              </div>
              <div className="relative">
                <ChatBubbleLeftEllipsisIcon className="absolute left-3 top-4 w-5 h-5 text-stone-400" />
                <textarea
                  name="comment"
                  placeholder="Комментарий к заказу (необязательно)"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700 resize-none"
                />
              </div>
              <div className="bg-stone-50 p-4 rounded-sm space-y-4">
                <div>
                  <span className="block text-sm font-medium text-stone-600 mb-2">
                    Способ оплаты
                  </span>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        checked={formData.payment_method === "card"}
                        onChange={handleChange}
                        className="text-[#f4d864] focus:ring-[#f4d864]"
                      />
                      <CreditCardIcon className="h-5 w-5 text-stone-500" />
                      <span>Банковская карта</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cash"
                        checked={formData.payment_method === "cash"}
                        onChange={handleChange}
                        className="text-[#f4d864] focus:ring-[#f4d864]"
                      />
                      <BanknotesIcon className="h-5 w-5 text-stone-500" />
                      <span>Наличные при получении</span>
                    </label>
                  </div>
                </div>
                <div>
                  <span className="block text-sm font-medium text-stone-600 mb-2">
                    Магазин самовывоза
                  </span>
                  <div className="relative">
                    <BuildingStorefrontIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <select
                      name="pickup_location"
                      value={formData.pickup_location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700 appearance-none bg-white"
                    >
                      <option value="ул. Пушкина, д. 10">
                        ул. Пушкина, д. 10
                      </option>
                      <option value="ул. Лермонтова, д. 5">
                        ул. Лермонтова, д. 5
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Правая колонка – состав заказа */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-sm shadow-lg border border-stone-100 overflow-hidden">
              <div className="p-6 border-b border-stone-100 bg-stone-50/40">
                <h2 className="text-xl font-medium text-stone-800 flex items-center gap-2">
                  <ShoppingBagIcon className="h-5 w-5 text-[#f4d864]" />
                  Ваш заказ
                </h2>
              </div>
              <div className="divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-5 flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-sm bg-stone-100"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-800">
                        {item.name}
                      </h3>
                      <p className="text-stone-500 text-sm mt-0.5">
                        {item.price} ₽ × {item.quantity} шт.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-stone-800">
                        {item.price * item.quantity} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-stone-50/40 border-t border-stone-100">
                <div className="flex justify-between text-lg font-semibold text-stone-800 mb-6">
                  <span>Итого:</span>
                  <span>{totalPrice} ₽</span>
                </div>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full py-3 rounded-sm bg-stone-800 text-white font-medium hover:bg-[#f4d864] hover:text-stone-800 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    "Оформить заказ"
                  )}
                </button>
                <p className="text-xs text-stone-400 text-center mt-4">
                  Нажимая «Оформить заказ», вы соглашаетесь с условиями
                  обработки данных.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
