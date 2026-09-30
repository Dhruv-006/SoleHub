const db = require('../config/database');

const getProducts = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    
    // Map to camelCase
    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      category: row.category,
      description: row.description,
      price: parseFloat(row.price),
      imageUrl: row.image_url,
      stock: row.stock,
      createdAt: row.created_at
    }));

    res.json({
      success: true,
      data: {
        products,
        count: products.length
      },
      message: 'Products retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Product not found',
        error: {
          code: 'PRODUCT_NOT_FOUND',
          details: null
        }
      });
    }

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        product: {
          id: row.id,
          name: row.name,
          brand: row.brand,
          category: row.category,
          description: row.description,
          price: parseFloat(row.price),
          imageUrl: row.image_url,
          stock: row.stock,
          createdAt: row.created_at
        }
      },
      message: 'Product retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, brand, category, description, price, imageUrl, stock } = req.body;
    
    const result = await db.query(
      `INSERT INTO products (name, brand, category, description, price, image_url, stock)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, brand, category, description, price, imageUrl, stock || 0]
    );

    const row = result.rows[0];
    res.status(201).json({
      success: true,
      data: {
        product: {
          id: row.id,
          name: row.name,
          brand: row.brand,
          category: row.category,
          description: row.description,
          price: parseFloat(row.price),
          imageUrl: row.image_url,
          stock: row.stock,
          createdAt: row.created_at
        }
      },
      message: 'Product created successfully'
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { price, stock } = req.body;
    
    // Simplistic update for demonstration
    const result = await db.query(
      `UPDATE products SET price = COALESCE($1, price), stock = COALESCE($2, stock) 
       WHERE id = $3 RETURNING *`,
      [price, stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Product not found',
        error: {
          code: 'PRODUCT_NOT_FOUND',
          details: null
        }
      });
    }

    const row = result.rows[0];
    res.json({
      success: true,
      data: {
        product: {
          id: row.id,
          name: row.name,
          brand: row.brand,
          category: row.category,
          description: row.description,
          price: parseFloat(row.price),
          imageUrl: row.image_url,
          stock: row.stock,
          createdAt: row.created_at
        }
      },
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Product not found',
        error: {
          code: 'PRODUCT_NOT_FOUND',
          details: null
        }
      });
    }

    res.json({
      success: true,
      data: {
        deletedProductId: parseInt(id)
      },
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
