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

  // ✅ загрузка заказа
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

  // ✅ вызываем загрузку
  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  // ✅ считаем количество товаров
  const totalItems = useMemo(() => {
    if (!order?.items) return 0;
    return order.items.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0,
    );
  }, [order]);

  // ✅ смена статуса
  const handleStatusSave = async () => {
    setSaving(true);

    try {
      await api.patch(`/admin/orders/${id}/`, { status });

      setOrder((prev) => ({
        ...prev,
        status,
      }));

      alert("Статус обновлён");
    } catch (err) {
      console.error(err);
      alert("Ошибка изменения статуса");
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
    <main className="min-h-screen bg-stone-50 px-4 pb-20 pt-32 text-stone-800">
      <div className="mx-auto max-w-6xl">
        {/* BACK */}
        <Link to="/admin" className="mb-8 inline-block text-sm text-stone-600">
          ← Назад в админку
        </Link>

        {/* HEADER */}
        <div className="mb-8 border bg-white p-6">
          <h1 className="text-4xl font-light">Заказ #{order.id}</h1>
          <p className="mt-2 text-stone-500">
            {new Date(order.created_at).toLocaleString("ru-RU")}
          </p>

          <p className="mt-3 text-stone-600">Всего товаров: {totalItems}</p>

          <div className="mt-3 inline-block bg-[#d4aa2a]/10 px-3 py-1 text-sm">
            {statuses.find((s) => s.value === order.status)?.label}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="border bg-white p-6">
              <h2 className="mb-3 text-xl">Покупатель</h2>
              <p>{order.name}</p>
              <p>{order.phone}</p>
              <p>{order.email}</p>
            </div>

            <div className="border bg-white p-6">
              <h2 className="mb-3 text-xl">Оплата</h2>
              <p>{paymentLabels[order.payment_method]}</p>
              <p>{order.pickup_location}</p>
            </div>

            <div className="border bg-white p-6">
              <h2 className="mb-3 text-xl">Статус</h2>

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
                {saving ? "Сохранение..." : "Сохранить статус"}
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="border bg-white p-6">
            <h2 className="mb-4 text-xl">Состав заказа</h2>

            {order.items?.length ? (
              order.items.map((item) => (
                <div key={item.id} className="mb-4 border-b pb-3">
                  <p className="font-medium">
                    {item.product_name || `Товар #${item.product}`}
                  </p>
                  <p>Кол-во: {item.quantity}</p>
                  <p>Цена: {formatPrice(item.price)}</p>
                  <p>Итого: {formatPrice(item.price * item.quantity)}</p>
                </div>
              ))
            ) : (
              <p className="text-stone-500">Состав заказа пуст</p>
            )}

            <div className="mt-6 border-t pt-4 text-xl">
              Итого: {formatPrice(order.total)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
