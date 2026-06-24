import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const statusLabels = {
  new: "Новый",
  preparing: "Готовится",
  ready: "Готов к выдаче",
  completed: "Выдан",
  cancelled: "Отменён",
};

const formatPrice = (value) =>
  `${Number(value || 0).toLocaleString("ru-RU")} ₽`;

export default function AdminPanel() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    const total = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0,
    );

    return {
      orders: orders.length,
      products: products.length,
      feedbacks: feedbacks.length,
      total,
    };
  }, [orders, products, feedbacks]);

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

      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      setFeedbacks(Array.isArray(feedbackRes.data) ? feedbackRes.data : []);
    } catch (err) {
      console.error(err);
      alert("Не удалось загрузить данные админ-панели");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 pt-32 text-center">
        Загрузка...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 pb-20 pt-32 text-stone-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="mb-4 h-px w-14 bg-[#d4aa2a]" />
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Bee Craft
          </p>
          <h1 className="mt-3 text-5xl font-light tracking-tight md:text-7xl">
            Админ-панель
          </h1>
          <p className="mt-5 max-w-2xl text-stone-500">
            Управление заказами, товарами и сообщениями пользователей.
          </p>
        </div>

        <section className="mb-12 grid gap-4 md:grid-cols-4">
          <StatCard title="Заказов" value={stats.orders} />
          <StatCard title="Товаров" value={stats.products} />
          <StatCard title="Сообщений" value={stats.feedbacks} />
          <StatCard title="Сумма заказов" value={formatPrice(stats.total)} />
        </section>

        <section className="mb-14 border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)]">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                Управление
              </p>
              <h2 className="mt-2 text-3xl font-light">Заказы</h2>
            </div>
          </div>

          {orders.length === 0 ? (
            <p className="text-stone-500">Заказов пока нет.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  to={`/admin/orders/${order.id}`}
                  className="block border border-stone-200 bg-stone-50 p-5 transition hover:border-[#d4aa2a] hover:bg-white"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-light">Заказ №{order.id}</h3>
                      <p className="mt-2 text-sm text-stone-500">
                        {order.name} · {order.email} · {order.phone}
                      </p>
                      <p className="mt-2 text-sm text-stone-500">
                        {new Date(order.created_at).toLocaleDateString("ru-RU")}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 md:items-end">
                      <span className="w-fit border border-[#d4aa2a]/40 bg-[#d4aa2a]/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-stone-700">
                        {statusLabels[order.status] || order.status}
                      </span>
                      <p className="text-2xl font-light">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mb-14 border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)]">
          <h2 className="mb-6 text-3xl font-light">Товары</h2>

          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-3 border border-stone-200 bg-stone-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-stone-500">
                    {formatPrice(product.price)} ·{" "}
                    {product.in_stock ? "В наличии" : "Нет в наличии"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)]">
          <h2 className="mb-6 text-3xl font-light">Обратная связь</h2>

          <div className="space-y-4">
            {feedbacks.map((item) => (
              <article
                key={item.id}
                className="border border-stone-200 bg-stone-50 p-5"
              >
                <h3 className="font-medium">{item.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{item.email}</p>
                <p className="mt-4 text-stone-700">{item.message}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="border border-stone-200 bg-white p-6 shadow-[0_14px_40px_rgba(41,37,36,0.04)]">
      <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
        {title}
      </p>
      <p className="mt-3 text-3xl font-light text-stone-800">{value}</p>
    </div>
  );
}
