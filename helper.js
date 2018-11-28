//Check if some string of letters is an "anagram" of a word
//For our intents and purposes an anagram doesnt need to use all letters
//ex: "an" counts as an anagram of "and"
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

//Read through the text file line by line and check if each word is an "anagram"
const getWords = (letters) => {
  const words = [];
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('words.txt')
  });
  return new Promise(function(resolve, reject) {
    lineReader.on('line', (line) => {
      if (isAnagram(letters, line)) {
        words.push(line)
      }
    });

    lineReader.on('close', () => {
      resolve(words);
    });
  });

};

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendfile('index.html', { root: __dirname  } );
});

app.get('/words/:letters', (req, res) => {
  getWords(req.params.letters).then(function(result) {
    res.send(result);
  }, function(err) {
    //TODO return error code
    console.log(err); // Error: "It broke"
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

