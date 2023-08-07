function getChatHistory(chatArray: Array<any>) {
  let chatHistory = '';

  chatArray.forEach(chat => {
    chatHistory += `${chat.role}: ${chat.content}\n`;
  });

  return chatHistory;
}

export { getChatHistory };