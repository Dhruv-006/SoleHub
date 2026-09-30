const db = require('../config/database');

const createOrder = async (req, res, next) => {
  try {
    const { customer, items, paymentMethod } = req.body;

    if (!customer || !customer.email || !customer.pincode) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Please provide all required customer information',
        error: {
          code: 'INVALID_CUSTOMER_DATA',
          details: { fields: ['email', 'pincode'] }
        }
      });
    }

    let totalAmount = 0;
    const validatedItems = [];

    // Validate products and stock
    for (const item of items) {
      const productResult = await db.query('SELECT * FROM products WHERE id = $1', [item.productId]);
      if (productResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          data: null,
          message: `Product ID ${item.productId} not found`,
          error: { code: 'PRODUCT_NOT_FOUND', details: { productId: item.productId } }
        });
      }

      const product = productResult.rows[0];
      if (product.stock < item.quantity) {
        return res.status(409).json({
          success: false,
          data: null,
          message: `Insufficient stock for ${product.name}`,
          error: {
            code: 'INSUFFICIENT_STOCK',
            details: {
              productId: product.id,
              availableStock: product.stock,
              requestedQuantity: item.quantity
            }
          }
        });
      }

      const price = parseFloat(product.price);
      totalAmount += price * item.quantity;
      
      validatedItems.push({
        productId: product.id,
        size: item.size,
        quantity: item.quantity,
        price: price
      });
    }

    // Insert Order
    const orderResult = await db.query(
      `INSERT INTO orders (customer_name, email, phone, address, city, state, pincode, total_amount, payment_method, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'Placed') RETURNING *`,
      [customer.name, customer.email, customer.phone, customer.address, customer.city, customer.state, customer.pincode, totalAmount, paymentMethod || 'Cash on Delivery']
    );
    const order = orderResult.rows[0];
    const orderNumber = `SH-${String(order.id).padStart(6, '0')}`;

    // Insert Order Items and Update Stock
    for (const item of validatedItems) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, size, quantity, price)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.productId, item.size, item.quantity, item.price]
      );

      await db.query(
        `UPDATE products SET stock = stock - $1 WHERE id = $2`,
        [item.quantity, item.productId]
      );
    }

    res.status(201).json({
      success: true,
      data: {
        order: {
          id: order.id,
          orderNumber: orderNumber,
          customerName: order.customer_name,
          totalAmount: parseFloat(order.total_amount),
          paymentMethod: order.payment_method,
          status: order.status,
          createdAt: order.created_at
        }
      },
      message: 'Order placed successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderResult = await db.query('SELECT * FROM orders WHERE id = $1', [id]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Order not found',
        error: { code: 'ORDER_NOT_FOUND', details: null }
      });
    }

    const order = orderResult.rows[0];
    const orderNumber = `SH-${String(order.id).padStart(6, '0')}`;

    const itemsResult = await db.query(
      `SELECT oi.*, p.name as product_name 
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`, 
      [id]
    );

    const items = itemsResult.rows.map(item => ({
      productId: item.product_id,
      productName: item.product_name,
      size: item.size,
      quantity: item.quantity,
      price: parseFloat(item.price)
    }));

    res.json({
      success: true,
      data: {
        order: {
          id: order.id,
          orderNumber: orderNumber,
          customer: {
            name: order.customer_name,
            email: order.email,
            phone: order.phone
          },
          shippingAddress: {
            address: order.address,
            city: order.city,
            state: order.state,
            pincode: order.pincode
          },
          items: items,
          totalAmount: parseFloat(order.total_amount),
          paymentMethod: order.payment_method,
          status: order.status,
          createdAt: order.created_at
        }
      },
      message: 'Order retrieved successfully'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrderById
};
