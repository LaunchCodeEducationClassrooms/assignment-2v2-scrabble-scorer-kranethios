// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require('readline-sync');

const oldPointStructure = {
	1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
	2: ['D', 'G'],
	3: ['B', 'C', 'M', 'P'],
	4: ['F', 'H', 'V', 'W', 'Y'],
	5: ['K'],
	8: ['J', 'X'],
	10: ['Q', 'Z']
};

function oldScrabbleScorer(word = '') {
	word = word.toUpperCase();
	let letterPoints = '';

	for (let i = 0; i < word.length; i++) {
		for (const pointValue in oldPointStructure) {
			if (oldPointStructure[pointValue].includes(word[i])) {
				letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
			}
		}
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
	let isValidWord = true;
  let userWord = input.question("Let's play some scrabble! Enter a word: ");
  let checkWord = userWord.toLowerCase();

  for (let i = 0; i < checkWord.length; i++) {
    if (checkWord.charCodeAt(i) < 97 || checkWord.charCodeAt(i) > 122) {
      isValidWord = false;
    }
  }

  while(!isValidWord) {
    userWord = input.question("Invalid input. Enter a word: ");
    checkWord = userWord.toLowerCase();

    isValidWord = true;

    for (let i = 0; i < checkWord.length; i++) {
      if (checkWord.charCodeAt(i) < 97 || checkWord.charCodeAt(i) > 122) {
        isValidWord = false;
      }
    }
  }

  return userWord;
}

function simpleScore(word = '') {
	return word.length;
}

function vowelBonusScore(word = '') {
	word = word.toLowerCase();
	let wordScore = 0;

	for (let i = 0; i < word.length; i++) {
		if (
			word[i] === 'a' ||
			word[i] === 'e' ||
			word[i] === 'i' ||
			word[i] === 'o' ||
			word[i] === 'u'
		) {
			wordScore += 3;
		} else {
			wordScore++;
		}
	}

	return wordScore;
}

function scrabbleScore(word = '') {
  let pointStructure = transform(oldPointStructure);
  let wordScore = 0;

  for (let i = 0; i < word.length; i++) {
    wordScore += pointStructure[word[i]];
  }

  return wordScore;
}

const scoringAlgorithms = [ 
  Object({ 
    name: 'Simple Score', 
    description: 'Each letter is worth 1 point.', 
    scoringFunction: simpleScore
  }),
  Object({ 
    name: 'Vowel Bonus Score',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoringFunction: vowelBonusScore
  }), 
  Object({ 
    name: 'Scrabble Score', 
    description: 'Traditional Scrabble scoring algorithm.', 
    scoringFunction: scrabbleScore
  })];

function scorerPrompt() {
	console.log('\nWhat scoring algorithm would you like to use?\n');

  let userPrompt = "Please enter ";

	for (let i = 0; i < scoringAlgorithms.length; i++) {
		console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);

    if (i + 1 === scoringAlgorithms.length) {
      userPrompt += `or ${i}: `
    } else {
      userPrompt += `${i}, `
    }
	}

  let algorithmSelection = input.question(userPrompt);

  //check to make sure user input is a number, and that the number is a valid array index
  while (!(Number(algorithmSelection) > 0 || Number(algorithmSelection <= 0)) || Number(algorithmSelection) < 0 || Number(algorithmSelection) >= scoringAlgorithms.length) {
    algorithmSelection = input.question(`Invalid input. ${userPrompt}`);
  }

	return scoringAlgorithms[Number(algorithmSelection)];
}

function transform(pointStructure) {
  let modifiedPointStructure = {};

  for (key in pointStructure) {
    for (let i = 0; i < pointStructure[key].length; i++)
    {
      modifiedPointStructure[pointStructure[key][i].toLowerCase()] = Number(key);
    }
  }

  return modifiedPointStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {

  let wordInput = initialPrompt();

	let scorerSelection = scorerPrompt();
	console.log(`\n${scorerSelection.name} for '${wordInput}': ${scorerSelection.scoringFunction(wordInput)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
	initialPrompt: initialPrompt,
	transform: transform,
	oldPointStructure: oldPointStructure,
	simpleScore: simpleScore,
	vowelBonusScore: vowelBonusScore,
	scrabbleScore: scrabbleScore,
	scoringAlgorithms: scoringAlgorithms,
	newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
