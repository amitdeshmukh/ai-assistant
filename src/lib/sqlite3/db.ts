// Create a new instance of AJV
import Ajv from "ajv";
const ajv = new Ajv();

interface Order {
  order_id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  total: number;
  order_date: string;
  status: string;
}

interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  price: number;
  stock: number;
}

interface NewOrder {
  customerId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

const ordersSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      order_id: { type: "number" },
      customer_id: { type: "number" },
      product_id: { type: "number" },
      quantity: { type: "number" },
      total: { type: "number" },
      order_date: { type: "string" },
      status: { type: "string" }
    },
    required: ["order_id", "customer_id", "product_id", "quantity", "order_date", "status"],
    additionalProperties: false
  }
};

const productsSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      product_id: { type: "number" },
      product_name: { type: "string" },
      product_description: { type: "string" },
      price: { type: "number" },
      stock: { type: "number" }
    },
    required: ["product_id", "product_name", "product_description", "price", "stock"],
    additionalProperties: false
  }
};

// Compile your schemas into validation functions
const validateOrders = ajv.compile(ordersSchema);
const validateProducts = ajv.compile(productsSchema);

// Setup database connection
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/lib/sqlite3/ecommerce.db', (err: any) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ecommerce database.');
});

// Setup functions
async function getOrdersByCustomerId(customer: {customerId: number}): Promise<Order[]> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Orders WHERE customer_id = ?';
    console.log(`Lookup => getOrdersByCustomerId(${customer.customerId})`)
    db.all(sql, [customer.customerId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Validate the data
        if (!validateOrders(rows)) {
          // If the data is invalid, reject the promise with the validation errors
          console.error('Validation errors:', validateOrders.errors);
          reject(validateOrders.errors);
        } else {
          resolve(rows as Order[]);
        }
      }
    });
  });
}

async function getOrderById(order: {orderId: number}): Promise<Order[]> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Orders WHERE order_id = ?';
    console.log(`Lookup => getOrderById(${order.orderId})`)
    db.all(sql, [order.orderId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Validate the data
        if (!validateOrders(rows)) {
          // If the data is invalid, reject the promise with the validation errors
          console.error('Validation errors:', validateOrders.errors);
          reject(validateOrders.errors);
        } else {
          resolve(rows as Order[]);
        }
      }
    });
  });
}

async function searchProducts(search: {query: string}): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Products WHERE product_name LIKE ?';
    console.log(`Searching products => ${search.query}`)
    db.all(sql, [`%${search.query}%`], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Validate the data
        if (!validateProducts(rows)) {
          // If the data is invalid, reject the promise with the validation errors
          reject(validateProducts.errors);
        } else {
          resolve(rows as Product[]);
        }
      }
    });
  });
}

async function getProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Products';
    console.log('Getting a list of products')
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Validate the data
        if (!validateProducts(rows)) {
          // If the data is invalid, reject the promise with the validation errors
          reject(validateProducts.errors);
        } else {
          resolve(rows as Product[]);
        }
      }
    });
  });
}

async function createNewOrder({customerId, productId, quantity, unitPrice}: NewOrder): Promise<number> {
  let total = quantity * unitPrice;
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Orders (customer_id, product_id, quantity, total, order_date, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [customerId, productId, quantity, total, new Date().toISOString().slice(0,10), 'In Progress'], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

export {
  getOrdersByCustomerId, 
  getOrderById, 
  searchProducts,
  getProducts,
  createNewOrder
};
