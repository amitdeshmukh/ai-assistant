import { taskFunctions } from './functions';

export const messagePromptText = `
  You have received a message chat history with a user.
  Your task is to determine if the next response to the user requires a database lookup or not.
  If the response to the message does not require a database lookup, return the following object as a response:
  {
    "isTask": false
  }
  If the response to the message requires a database lookup, return the following object as a response:
  {
    "isTask": true,
  }
  `;

export const taskPromptText = `
  Answer the user's question. 
  Provide product details when the question is about products. 
  Provide order details when the question is about orders.
  IMPORTANT! Before placing an order for a product, please 
    1. Check the product stock and price.
    2. Inform the user of the price.
    3. Confirm from the user the quantity that they wish to purchase
    4. Confirm from the user that they want to go ahead and place the order through you.
  DO NOT place an order if any of the above steps are not completed.
  
  Here is the conversation so far:
  `;
