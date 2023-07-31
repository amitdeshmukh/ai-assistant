// Define AI result schemas here

export const messageResultSchema: any = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      description: 'response message for the user',
    }
  },
};

export const taskResultSchema: any = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      description: 'response message for the user',
    }
  },
};
