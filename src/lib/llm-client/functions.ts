import { getOrderById, getOrdersByCustomerId, getProducts, createNewOrder } from '$lib/sqlite3/db';
import { propertyForRent } from '$lib/utils/bayut';

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
    description: 'Returns a list of all products with product name, description, price and stock availability.',
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
  // {
  //   name: 'askQuestion',
  //   description: 'Ask a question to or clarify something from the user.',
  //   inputSchema: {
  //     type: 'object',
  //     description: 'The question or clarification to ask the user',
  //     properties: {
  //       question: { type: 'string' },
  //     },
  //     required: ['question'],
  //   },
  //   func: askQuestion,
  // }
  // {
  //   name: 'propertyForRent',
  //   description: 'Returns a list of properties for rent based on provided parameters.',
  //   inputSchema: {
  //     type: 'object',
  //     description: 'Optional parameters for property search.',
  //     properties: {
  //       priceMin: { type: 'number' },
  //       priceMax: { type: 'number' },
  //       areaMin: { type: 'number' },
  //       areaMax: { type: 'number' },
  //       roomsMin: { type: 'number' },
  //       roomsMax: { type: 'number' },
  //       bathsMin: { type: 'number' },
  //       bathsMax: { type: 'number' },
  //       furnishingStatus: { type: 'string' },
  //       hasVideo: { type: 'boolean' },
  //       hasFloorPlan: { type: 'boolean' },
  //       hasPanorama: { type: 'boolean' }
  //     }
  //   },
  //   func: propertyForRent,
  // }
];
