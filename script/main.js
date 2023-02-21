// <!-- OBIECT: contine proprietati/label-uri cu valori
//POJO: Plain old javascript object
//sau Object Letral
const o = {
  // proprietati:
  orice: "val",
  1: "doi",
  prop: [1, 2, 4],
  obj: {
    nume: "Paul",
  },
  //metode in obiect:
  func1() {
    console.log("This is a method");
  },
};

//accesare chestii din obiect:
console.dir(o.prop);

//accesare element din array din obiect:
console.dir(o[1]);

//inlocuire element din obiect:
const a = "obj";
console.dir(o[a]);

//accesare numarul 4
console.dir(o["prop"][2]);
//sau
console.dir(o.prop[2]);

//apelare functiile din obiect:
o.func1();

//Selectare elemente din html:
//dir afiseaza obiecte
// console.dir(document.body);

// const h1= document.getElementById('id-ul elementului');
// const h1= document.querySelectorAll('meta');

const h1 = document.querySelector("h1[data-heading^=das]");

// setTimeout(() => {h1.innerText("Ligia")}, 2000);

//se pot folosi elemente din CSS:
// h1.style.color='red';
// h1.style.backgroundColor='blue';
// h1.style.marginLeft='30px';

// console.log(h1);

const display = document.querySelector("[data-counter-display]");
const buttons = document.querySelectorAll("[data-counter-button]");

console.log(display, buttons[0]);
// console.log(buttons);

// buttons[0].addEventListener("click", handleClick);
// buttons[1].addEventListener("click", handleClick);
// buttons[2].addEventListener("click", handleClick);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleClick);
}

const initialCount = 0;
let count = initialCount;
updateHtml();
// function handleIncrement() {
//   count--;
//   updateHtml();
// }

// function handleDecrement() {
//   count++;
//   updateHtml();
// }
function handleClick(e) {
  const which = e.target.dataset.counterButton;
  switch (which) {
    case "increment": {
      count++;
      break;
    }
    case "decrement": {
      count--;
      break;
    }
    case "reset": {
      count = initialCount;
      break;
    }
    default: {
      //   console.warn('The value "%s" provided is not valid');
    }
  }
  //   count += value;
  updateHtml();
}

function updateHtml() {
  display.innerText = count;
//   if (count > 0) {
//     //sa se aplice clasa din CSS positive
//     display.className = "positive";
//   } else if (count < 0) {
//     //sa se aplice clasa negative
//     display.className = "negative";
//   } else {
//     //sa se scoata toate clasele
//     display.className = "";
//   }

//Alta varianta:
display.classList.remove('positive', 'negative');
if (count > 0) {
        //sa se aplice clasa din CSS positive
        display.classList.add('positive');
      } else if (count < 0) {
        //sa se aplice clasa negative
        display.classList.add('negative');
      } 
}

function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min +1)+min);
}
console.log(getRandomNumber(1,3));