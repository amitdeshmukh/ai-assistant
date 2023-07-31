async function askQuestion(question: string) {
  return new Promise((resolve, reject) => {
    resolve('The final answer is: ' + JSON.stringify({ content: question }));
  });
}

export { askQuestion };