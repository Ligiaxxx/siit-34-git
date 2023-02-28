const display = document.querySelector("[data-rps-display]");
const choiceContainer = document.querySelector("[data-rps-choice-container]");

choiceContainer.addEventListener("click", handleUserChoice);

//un obiect cu obiecte:
const choices = {
  rock: {
    beats: {
      scissors: "beats",
      lizzard: "crushes",
    },
  },
  paper: {
    beats: {
      rock: "covers",
      spock: "disproves",
    },
  },
  scissors: {
    beats: {
      paper: "cuts",
      lizard: "decapitates",
    },
  },
  lizard: {
    beats: {
      spock: "poisons",
      paper: "eats",
    },
  },
  spock: {
    beats: {
      rock: "pulverizes",
      scissors: "smashes",
    },
  },
};

function handleUserChoice(e) {
  const choice = e.target.dataset.rpsChoice;
  if (!choice) {
    return;
  }
  play(choice);
}

function play(userChoice) {
  const computerchoice = getRandomChoice();

  //aflam cine a castigat:
  if (hasUserWon(userChoice, computerchoice)) {
    const message = getMessage(userChoice, computerchoice);
    console.log(`User has won: ${userChoice} ${message} ${computerchoice}`, {
      userChoice,
      computerchoice,
    });
  } else if (userChoice === computerchoice) {
    console.log("You have a tight!", { userChoice, computerchoice });
  } else {
    const message = getMessage(computerchoice, userChoice);
    console.log(
      `Computer has won: ${computerchoice} ${message} ${userChoice}`,
      { userChoice, computerchoice }
    );
  }
}

function hasUserWon(userChoice, computerchoice) {
  //Varianta simpla:
  // return (
  //   (userChoice === "rock" && computerchoice === "scissors") ||
  //   (userChoice === "paper" && computerchoice === "rock") ||
  //   (userChoice === "scissors" && computerchoice === "paper")
  // );

  //Varianta complicata:
  return Boolean(getMessage(userChoice, computerchoice));
}

function getMessage(choice1, choice2) {
  return choices[choice1].beats[choice2];
}

function getRandomChoice() {
  const choiceArray = Object.keys(choices); //ne scoate toate cheile din obiect. Cheile fiind: rock, paper, scissors, lizard, spock
  const index = getRandomNumber(0, choiceArray.length);
  // console.log(choiceArray);
  return choiceArray[index];
}

function getRandomNumber(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min) - min);
}
