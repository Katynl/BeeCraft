import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const statuses = [
  { value: "new", label: "Новый" },
  { value: "preparing", label: "Готовится" },
  { value: "ready", label: "Готов к выдаче" },
  { value: "completed", label: "Выдан" },
  { value: "cancelled", label: "Отменён" },
];

export default function AdminPanel() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.is_staff && !user?.is_superuser) {
      navigate("/");
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [ordersRes, productsRes, feedbackRes] = await Promise.all([
        api.get("/admin/orders/"),
        api.get("/admin/products/"),
        api.get("/admin/feedback/"),
      ]);

      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setFeedbacks(feedbackRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await api.patch(`/admin/orders/${id}/`, {
        status,
      });

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order)),
      );
    } catch (err) {
      console.error(err);
      alert("Ошибка изменения статуса");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Удалить товар?")) {
      return;
    }

    try {
      await api.delete(`/admin/products/${id}/delete/`);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err);
      alert("Ошибка удаления");
    }
  };

  if (loading) {
    return <div className="pt-32 text-center">Загрузка...</div>;
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 pt-32 pb-20">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-5xl font-light">Админ панель</h1>

        {/* ЗАКАЗЫ */}

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-light">Заказы</h2>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl">Заказ #{order.id}</h3>

                    <p>{order.name}</p>
                    <p>{order.email}</p>
                    <p>{order.phone}</p>
                    <p>{order.total} ₽</p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="border p-2"
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ТОВАРЫ */}

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-light">Товары</h2>

            <button
              onClick={() => navigate("/admin/products/create")}
              className="bg-stone-800 px-5 py-3 text-[#d4aa2a]"
            >
              Добавить товар
            </button>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border bg-white p-4"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>

                  <p>{product.price} ₽</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/products/edit/${product.id}`)
                    }
                    className="border px-4 py-2"
                  >
                    Изменить
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 px-4 py-2 text-white"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ОБРАТНАЯ СВЯЗЬ */}

        <section>
          <h2 className="mb-6 text-3xl font-light">Обратная связь</h2>

          <div className="space-y-4">
            {feedbacks.map((item) => (
              <div key={item.id} className="border bg-white p-5">
                <h3 className="font-medium">{item.name}</h3>

                <p className="mb-2 text-stone-500">{item.email}</p>

                <p>{item.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
