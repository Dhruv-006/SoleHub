const API_BASE = '/api';

export const getProducts = async () => {
  const response = await fetch(`${API_BASE}/products`);
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data.products;
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE}/products/${id}`);
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data.product;
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data.order;
};

export const getOrderById = async (id) => {
  const response = await fetch(`${API_BASE}/orders/${id}`);
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data.order;
};
