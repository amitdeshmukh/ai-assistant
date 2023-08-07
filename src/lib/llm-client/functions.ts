import { getOrderById, getOrdersByCustomerId, getProducts, createNewOrder } from '$lib/sqlite3/db';
import { propertyForRent } from '$lib/utils/bayut';
import { checkUnreadEmails } from '$lib/gmail';

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
  },
  {
    name: 'checkUnreadEmails',
    description: 'Check for unread emails in the inbox.',
    inputSchema: {
      type: 'object',
      description: 'No input is required for this function.',
      properties: {
      }
    },
    func: checkUnreadEmails,
  },
  {
    name: 'propertyForRent',
    description: 'Returns a list of properties for rent based on provided parameters.',
    inputSchema: {
      type: 'object',
      description: 'Optional parameters for property search.',
      properties: {
        priceMin: { type: 'number', description: 'Minimum price in AED' },
        priceMax: { type: 'number', description: 'Maximum price in AED' },
        areaMin: { type: 'number', description: 'Minimum area in sqft' },
        areaMax: { type: 'number', description: 'Maximum area in sqft' },
        roomsMin: { type: 'number', description: 'Minimum number of rooms' },
        roomsMax: { type: 'number', description: 'Maximum number of rooms' },
        bathsMin: { type: 'number', description: 'Minimum number of bathrooms' },
        bathsMax: { type: 'number', description: 'Maximum number of bathrooms' },
        furnishingStatus: { type: 'string', description: 'Furnished status of the property' },
        hasVideo: { type: 'boolean', description: 'Whether the property has a video' },
        hasFloorPlan: { type: 'boolean', description: 'Whether the property has a floor plan' },
        hasPanorama: { type: 'boolean', description: 'Whether the property has a nice view' },
      }
    },
    func: propertyForRent,
  }
];
