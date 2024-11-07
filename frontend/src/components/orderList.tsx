import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  deleteOrder,
  updateOrder,
  createOrder,
} from "../services/orderServices";
import { Order } from "../types/order";
import OrderDetailsModal from "./OrderDetailsModal";
import EditOrderModal from "./EditOrderModal";
import NewOrderModal from "./NewOrderModal";
import "./orderList.css";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const fetchOrders = async () => {
    const data = await getAllOrders(page, pageSize, statusFilter);
    setOrders(data.data);
    setPageSize(data.pageSize);
    setTotalPages(data.totalPages);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value || undefined);
    setPage(1); // Resetear a la primera página al cambiar el filtro
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleDelete = async () => {
    if (selectedOrder) {
      try {
        // Aplicar la clase `removing` para activar la animación de desvanecimiento
        const element = document.getElementById(`order-${selectedOrder.id}`);
        if (element) {
          element.classList.add("removing");
        }

        // Esperar 300 ms (duración de la animación) antes de eliminar y actualizar la lista
        setTimeout(async () => {
          await deleteOrder(selectedOrder.id);

          // Cerrar el modal de detalles inmediatamente después de la eliminación
          setSelectedOrder(null);

          // Recargar los datos de la página actual
          const data = await getAllOrders(page, pageSize, statusFilter);
          setOrders(data.data);

          // Si estamos en la última página y la eliminación deja la página vacía, retrocede una página
          if (data.data.length === 0 && page > 1) {
            setPage(page - 1);
          }
        }, 300); // Tiempo que coincide con la duración de la animación de desvanecimiento
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedOrder: Order) => {
    try {
      const savedOrder = await updateOrder(updatedOrder.id, updatedOrder);
      setOrders(
        orders.map((order) => (order.id === savedOrder.id ? savedOrder : order))
      );
      setIsEditModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleNewOrder = () => {
    setIsNewOrderModalOpen(true);
  };

  const handleSaveNewOrder = async (newOrder: {
    customer_name: string;
    item: string;
    quantity: number;
    status: "pending" | "completed" | "cancelled";
  }) => {
    try {
      const savedOrder = await createOrder(newOrder);
      setOrders([savedOrder, ...orders].slice(0, pageSize)); // Respetar el límite de `pageSize`
      setIsNewOrderModalOpen(false);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="order-list-container">
      <div className="header">
        <h1 className="order-list-title">Order Management</h1>
        <div className="filters">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter || ""}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button className="new-order-button" onClick={handleNewOrder}>
          New Order
        </button>
      </div>
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                id={`order-${order.id}`}
                onClick={() => handleRowClick(order)}
                className={selectedOrder?.id === order.id ? "fade-out" : ""}
              >
                <td>{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isEditModalOpen && selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}

      {isNewOrderModalOpen && (
        <NewOrderModal
          onClose={() => setIsNewOrderModalOpen(false)}
          onSave={handleSaveNewOrder}
        />
      )}
    </div>
  );
};

export default OrderList;
