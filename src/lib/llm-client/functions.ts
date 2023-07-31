import { getOrderById, getOrdersByCustomerId, searchProducts, getAllProducts, createNewOrder } from '$lib/sqlite3/db';
import { askQuestion } from '$lib/utils/misc';

export const taskFunctions = [
  {
    name: 'getOrdersByCustomerId',
    description: 'Get information about orders placed by a customer based on their customerId',
    inputSchema: {
      type: 'object',
      description: 'The customerId of the customer',
      properties: {
        customerId: { type: 'number' },
      }
    },
    func: getOrdersByCustomerId,
  },
  {
    name: 'getOrderById',
    description: 'Get detailed information about an Order by its orderId',
    inputSchema: {
      type: 'object',
      description: 'The orderId for the order',
      properties: {
        orderId: { type: 'number' },
      }
    },
    func: getOrderById,
  },
  {
    name: 'searchProducts',
    description: 'Given some information, finds a matching product and returns its details, price and available stock.',
    inputSchema: {
      type: 'object',
      description: 'The search criteria',
      properties: {
        query: { type: 'string' },
      }
    },
    func: searchProducts,
  },
  {
    name: 'getAllProducts',
    description: 'Returns a list of all products.',
    inputSchema: {
      type: 'object',
      description: 'No input is required for this function.',
      properties: {
        query: { type: 'string' },
      }
    },
    func: getAllProducts,
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