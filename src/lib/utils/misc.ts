async function askQuestion(question: {question: string}) {
  return new Promise((resolve, reject) => {
    resolve(JSON.stringify({ content: question }));
  });
}

function getChatHistory(chatArray: Array<any>) {
  let chatHistory = '';

  chatArray.forEach(chat => {
    chatHistory += `${chat.role}: ${chat.content}\n`;
  });

  return chatHistory;
}

export { askQuestion, getChatHistory };