import { getOrderById, getOrdersByCustomerId, getProducts, createNewOrder } from '$lib/sqlite3/db';
import { askQuestion } from '$lib/utils/misc';

export const taskFunctions = [
  {
    name: 'getOrdersByCustomerId',
    description: 'Get detailed information about orders placed by a customer based on their customer_id',
    inputSchema: {
      type: 'integer',
      description: 'The Customer ID',
    },
    func: getOrdersByCustomerId,
  },
  {
    name: 'getOrderById',
    description: 'Get detailed information about an Order by its order_id',
    inputSchema: {
      type: 'integer',
      description: 'The Order ID',
    },
    func: getOrderById,
  },
  {
    name: 'getProducts',
    description: 'Get product details, price and available stock.',
    inputSchema: {
      type: 'string',
      description: 'a query term',
    },
    func: getProducts,
  },
  {
    name: 'createNewOrder',
    description: 'Create a new order for a customer.',
    inputSchema: {
      type: 'object',
      description: 'The order details',
      properties: {
        customerId: { type: 'number' },
        productId: { type: 'number' },
        quantity: { type: 'number' },
        unitPrice: { type: 'number' },
      },
      required: ['customerId', 'productId', 'quantity', 'unitPrice']
    },
    func: createNewOrder,
  }
];

export const messageFunctions = [
    {
    name: 'askQuestion',
    description: 'Ask a question to the customer or clarify something.',
    inputSchema: {
      type: 'string',
      description: 'The question to ask',
    },
    func: askQuestion,
  }
];