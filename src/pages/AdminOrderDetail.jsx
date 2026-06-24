import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

const statuses = [
  { value: "new", label: "Новый" },
  { value: "preparing", label: "Готовится" },
  { value: "ready", label: "Готов к выдаче" },
  { value: "completed", label: "Выдан" },
  { value: "cancelled", label: "Отменён" },
];

const paymentLabels = {
  card: "Банковской картой",
  cash: "Наличными при получении",
};

const formatPrice = (value) =>
  `${Number(value || 0).toLocaleString("ru-RU")} ₽`;

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ ВАЖНО: функция ДО useEffect
  const loadOrder = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get(`/admin/orders/${id}/`);
      setOrder(response.data);
      setStatus(response.data.status);
    } catch (err) {
      console.error(err);
      alert("Не удалось загрузить заказ");
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  // ✅ useEffect теперь корректный
  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const totalItems = useMemo(() => {
    if (!order?.items) return 0;
    return order.items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
  }, [order]);

  const handleStatusSave = async () => {
    setSaving(true);

    try {
      await api.patch(`/admin/orders/${id}/`, { status });

      setOrder((prev) => ({
        ...prev,
        status,
      }));

      alert("Статус заказа обновлён");
    } catch (err) {
      console.error(err);
      alert("Не удалось изменить статус");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 pt-32 text-center">
        Загрузка...
      </main>
    );
  }

  if (!order) return null;

  return (
    <main className="min-h-screen bg-stone-50 px-4 pb-20 pt-32 text-stone-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/admin"
          className="mb-8 inline-flex text-sm uppercase tracking-[0.18em] text-[#b89422] hover:text-stone-800"
        >
          ← Назад в админ-панель
        </Link>

        <section className="mb-8 border border-stone-200 bg-white p-6 md:p-8">
          <h1 className="text-5xl font-light">Заказ №{order.id}</h1>
          <p className="mt-2 text-stone-500">
            {new Date(order.created_at).toLocaleString("ru-RU")}
          </p>

          <div className="mt-4 inline-block bg-[#d4aa2a]/10 px-4 py-2 text-sm">
            {statuses.find((s) => s.value === order.status)?.label}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* ИНФО */}
          <div className="space-y-6">
            <div className="border bg-white p-6">
              <h2 className="mb-4 text-xl">Покупатель</h2>
              <p>{order.name}</p>
              <p>{order.phone}</p>
              <p>{order.email}</p>
            </div>

            <div className="border bg-white p-6">
              <h2 className="mb-4 text-xl">Оплата</h2>
              <p>{paymentLabels[order.payment_method]}</p>
              <p>{order.pickup_location}</p>
            </div>

            <div className="border bg-white p-6">
              <h2 className="mb-4 text-xl">Статус</h2>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-3"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <button
                onClick={handleStatusSave}
                disabled={saving || status === order.status}
                className="mt-4 w-full bg-stone-800 py-3 text-[#d4aa2a]"
              >
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </div>

          {/* СОСТАВ */}
          <div className="border bg-white p-6">
            <h2 className="mb-4 text-xl">Состав заказа</h2>

            {order.items?.map((item) => (
              <div key={item.id} className="mb-4 border-b pb-3">
                <p className="font-medium">
                  {item.product_name || `Товар #${item.product}`}
                </p>
                <p>Кол-во: {item.quantity}</p>
                <p>Цена: {formatPrice(item.price)}</p>
                <p>Итого: {formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}

            <div className="mt-6 border-t pt-4 text-xl">
              Итого: {formatPrice(order.total)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
