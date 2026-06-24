import { useEffect, useMemo, useState } from "react";
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

const formatPrice = (value) => `${Number(value || 0).toLocaleString("ru-RU")} ₽`;

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const totalItems = useMemo(() => {
    if (!order?.items) return 0;
    return order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }, [order]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.is_staff && !user?.is_superuser) {
      navigate("/");
      return;
    }

    loadOrder();
  }, [id, navigate]);

  const loadOrder = async () => {
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
  };

  const handleStatusSave = async () => {
    setSaving(true);

    try {
      const response = await api.patch(`/admin/orders/${id}/`, { status });

      setOrder((prev) => ({
        ...prev,
        status: response.data.status || status,
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
    return <main className="min-h-screen bg-stone-50 pt-32 text-center">Загрузка...</main>;
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

        <section className="mb-8 border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 h-px w-14 bg-[#d4aa2a]" />
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Детали заказа
              </p>
              <h1 className="mt-3 text-5xl font-light tracking-tight md:text-7xl">
                Заказ №{order.id}
              </h1>
              <p className="mt-4 text-stone-500">
                {new Date(order.created_at).toLocaleString("ru-RU")}
              </p>
            </div>

            <div className="border border-[#d4aa2a]/40 bg-[#d4aa2a]/10 px-5 py-3 text-sm uppercase tracking-[0.18em]">
              {statuses.find((s) => s.value === order.status)?.label || order.status}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-6">
            <InfoBlock title="Покупатель">
              <InfoRow label="Имя" value={order.name} />
              <InfoRow label="Телефон" value={order.phone} />
              <InfoRow label="Email" value={order.email} />
            </InfoBlock>

            <InfoBlock title="Оплата и получение">
              <InfoRow
                label="Тип оплаты"
                value={paymentLabels[order.payment_method] || order.payment_method}
              />
              <InfoRow label="Пункт получения" value={order.pickup_location} />
              <InfoRow label="Комментарий" value={order.comment || "Без комментария"} />
            </InfoBlock>

            <InfoBlock title="Изменение статуса">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500">
                Статус заказа
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-stone-200 bg-stone-50 px-4 py-4 text-stone-800 outline-none focus:border-[#d4aa2a] focus:bg-white"
              >
                {statuses.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleStatusSave}
                disabled={saving || status === order.status}
                className="mt-4 w-full bg-stone-800 px-6 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Сохраняем..." : "Сохранить статус"}
              </button>
            </InfoBlock>
          </section>

          <section className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] md:p-8">
            <div className="mb-6 border-b border-stone-100 pb-5">
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                Состав
              </p>
              <h2 className="mt-2 text-3xl font-light">Товары в заказе</h2>
              <p className="mt-3 text-stone-500">Всего позиций: {totalItems}</p>
            </div>

            {order.items?.length > 0 ? (
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 border border-stone-200 bg-stone-50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-light">
                        {item.product_name || `Товар #${item.product}`}
                      </h3>
                      <p className="mt-1 text-sm text-stone-500">
                        Количество: {item.quantity} шт.
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="text-sm text-stone-500">Цена за шт.</p>
                      <p className="text-xl font-light">{formatPrice(item.price)}</p>
                      <p className="mt-1 text-sm text-stone-500">
                        Итого: {formatPrice(Number(item.price) * Number(item.quantity))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500">Состав заказа не найден.</p>
            )}

            <div className="mt-8 border-t border-stone-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg text-stone-500">Итоговая сумма</span>
                <span className="text-4xl font-light text-stone-800">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function InfoBlock({ title, children }) {
  return (
    <div className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)]">
      <h2 className="mb-5 text-2xl font-light">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="border-b border-stone-100 pb-3 last:border-b-0 last:pb-0">
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-stone-500">
        {label}
      </p>
      <p className="break-words text-stone-800">{value}</p>
    </div>
  );
}