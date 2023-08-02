import { getOrderById, getOrdersByCustomerId, getProducts, createNewOrder } from '$lib/sqlite3/db';

export const taskFunctions = [
  {
    name: 'getOrdersByCustomerId',
    description: 'Get information about orders placed by a user based on their customerId',
    inputSchema: {
      type: 'object',
      description: 'The customerId of the user',
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
    name: 'getProducts',
    description: 'Returns a list of all products and their details.',
    inputSchema: {
      type: 'object',
      description: 'No input is required for this function.',
      properties: {
        query: { type: 'string' },
      }
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
