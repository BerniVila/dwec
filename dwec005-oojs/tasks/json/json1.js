const section = document.querySelector('section');

let para1 = document.createElement('p');
let para2 = document.createElement('p');

let motherInfo = 'The mother cats are called ';
let kittenInfo;

fetch('sample.json')
  .then(response => response.text())
  .then(text => displayCatInfo(text))

function displayCatInfo(catString) {
  let total = 0;
  let male = 0;

  // Add your code here
  // BV {{ **********************************************************************************

  let catList = JSON.parse(catString);

  for (let i = 0; i < catList.length; i += 1) {
    for (let j = 0; j < catList[i].kittens.length; j += 1) {
      total += 1;
      if (catList[i].kittens[j].gender === 'm') {
        male += 1;
      }
    }

    if (i < (catList.length - 1)) {
      motherInfo += `${catList[i].name}, `;
    } else {
      motherInfo += `and ${catList[i].name}.`;
    }
  }

  kittenInfo = `We have ${total} kittens, ${male} are male, ${total - male} are female.`;

  // }} BV **********************************************************************************
  // Don't edit the code below here!

  para1.textContent = motherInfo;
  para2.textContent = kittenInfo;
}

section.appendChild(para1);
section.appendChild(para2);
