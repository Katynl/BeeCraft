// // src/pages/OrderDetail.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import api from "../api";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await api.get(`/orders/my/${id}/`);
//         setOrder(response.data);
//       } catch (err) {
//         console.error(err);
//         if (err.response?.status === 404) setError("Заказ не найден");
//         else if (err.response?.status === 401) navigate("/login");
//         else setError("Ошибка загрузки заказа");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrder();
//   }, [id, navigate]);

//   if (loading) return <div className="text-center py-20">Загрузка...</div>;
//   if (error)
//     return <div className="text-center py-20 text-red-500">{error}</div>;
//   if (!order) return null;

//   return (
//     <div className="container mx-auto px-4 py-32">
//       <h1 className="text-3xl font-serif mb-6">Детали заказа №{order.id}</h1>
//       <div className="bg-white p-6 rounded shadow">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <p>
//               <strong>Статус:</strong> {order.status}
//             </p>
//             <p>
//               <strong>Дата создания:</strong>{" "}
//               {new Date(order.created_at).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Способ оплаты:</strong>{" "}
//               {order.payment_method === "card"
//                 ? "Банковская карта"
//                 : "Наличные"}
//             </p>
//           </div>
//           <div>
//             <p>
//               <strong>Получатель:</strong> {order.name}
//             </p>
//             <p>
//               <strong>Телефон:</strong> {order.phone}
//             </p>
//             <p>
//               <strong>Email:</strong> {order.email}
//             </p>
//           </div>
//         </div>
//         {order.comment && (
//           <div className="mb-6">
//             <p>
//               <strong>Комментарий:</strong> {order.comment}
//             </p>
//           </div>
//         )}
//         <h2 className="text-xl font-semibold mb-4">Товары в заказе</h2>
//         <div className="space-y-3">
//           {order.items.map((item) => (
//             <div key={item.id} className="flex justify-between border-b pb-2">
//               <span>
//                 {item.product_name} × {item.quantity}
//               </span>
//               <span>{item.price * item.quantity} ₽</span>
//             </div>
//           ))}
//         </div>
//         <div className="text-right font-bold text-lg mt-4">
//           Итого: {order.total} ₽
//         </div>
//         <Link
//           to="/profile"
//           className="inline-block mt-6 text-pink-600 underline"
//         >
//           ← Назад в профиль
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;

// src/pages/OrderDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";

// Функция для человеко-читаемого статуса
const getStatusText = (status) => {
  const statusMap = {
    new: "Новый",
    preparing: "Готовится",
    ready: "Готов к выдаче",
    completed: "Выдан",
    cancelled: "Отменён",
  };
  return statusMap[status] || status;
};

// Функция для цвета статуса
const getStatusColor = (status) => {
  switch (status) {
    case "new": return "text-yellow-600 bg-yellow-50";
    case "preparing": return "text-blue-600 bg-blue-50";
    case "ready": return "text-green-600 bg-green-50";
    case "completed": return "text-gray-600 bg-gray-100";
    case "cancelled": return "text-red-600 bg-red-50";
    default: return "text-gray-600 bg-gray-100";
  }
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/my/${id}/`);
        setOrder(response.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) setError("Заказ не найден");
        else if (err.response?.status === 401) navigate("/login");
        else setError("Ошибка загрузки заказа");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  if (loading) return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!order) return null;

  return (
    <div className="min-h-screen bg-stone-50 py-12 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Хлебные крошки */}
        <div className="text-sm text-stone-500 mb-6">
          <Link to="/profile" className="hover:text-[#f4d864] transition">Профиль</Link> / <span className="text-stone-800">Заказ №{order.id}</span>
        </div>

        {/* Заголовок и статус */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-stone-800">
            Заказ №{order.id}
          </h2>
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>

        {/* Карточка с деталями */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Информация о заказе */}
          <div className="p-6 md:p-8 border-b border-stone-100">
            <h2 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#f4d864] rounded-full"></span>
              Информация о заказе
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-stone-600"><span className="font-medium text-stone-800">Дата:</span> {new Date(order.created_at).toLocaleDateString()}</p>
                <p className="text-stone-600"><span className="font-medium text-stone-800">Способ оплаты:</span> {order.payment_method === "card" ? "Банковская карта" : "Наличные при получении"}</p>
                <p className="text-stone-600"><span className="font-medium text-stone-800">Самовывоз:</span> {order.pickup_location}</p>
              </div>
              <div className="space-y-2">
                <p className="text-stone-600"><span className="font-medium text-stone-800">Получатель:</span> {order.name}</p>
                <p className="text-stone-600"><span className="font-medium text-stone-800">Телефон:</span> {order.phone}</p>
                <p className="text-stone-600"><span className="font-medium text-stone-800">Email:</span> {order.email}</p>
              </div>
            </div>
            {order.comment && (
              <div className="mt-4 pt-3 border-t border-stone-100">
                <p className="text-stone-600"><span className="font-medium text-stone-800">Комментарий:</span> {order.comment}</p>
              </div>
            )}
          </div>

          {/* Список товаров */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#f4d864] rounded-full"></span>
              Товары в заказе
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-stone-100 pb-4">
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">{item.product_name}</p>
                    <p className="text-sm text-stone-500">Количество: {item.quantity} шт.</p>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <p className="text-stone-800">{item.price * item.quantity} ₽</p>
                    <p className="text-xs text-stone-400">{item.price} ₽ / шт</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between items-center">
              <span className="text-lg font-semibold text-stone-800">Итого:</span>
              <span className="text-2xl font-bold text-[#f4d864]">{order.total} ₽</span>
            </div>
          </div>
        </div>

        {/* Кнопка возврата */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-[#f4d864] transition"
          >
            ← Вернуться в личный кабинет
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;