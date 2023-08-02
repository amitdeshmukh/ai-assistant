// Define AI result schemas here

export const messageResultSchema: any = {
  type: 'object',
  properties: {
    "isTask": {
      "type": "boolean",
      "description": "indicates if this is a task or not",
    }
  },
};

export const taskResultSchema: any = {
  type: 'object',
  properties: {
    "content": {
      "type": "string",
      "description": "a polite response for the users query"
    }
  },
};
