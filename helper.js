const isAnagram = (input, word) => {

  const inputMap = new Map();
  const wordMap = new Map();

  //populate inputMap
  for(let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (inputMap.has(char)) {
      const count = inputMap.get(char);
      inputMap.set(char, count + 1);
    } else {
      inputMap.set(char, 1);
    }
  }

  //compare with input
  for(let i = 0; i < word.length; i++) {
    const char = word.charAt(i);
    if (wordMap.has(char)) {
      if (wordMap.get(char) === inputMap.get(char))
        return false;

      const count = wordMap.get(char);

      wordMap.set(char, count + 1);
    } else {
      if (!inputMap.has(char)){
        return false;
      } else {
        wordMap.set(char, 1);
      }
    }

  }

  return true;
};

console.log(isAnagram("tarppq", "rappp"));