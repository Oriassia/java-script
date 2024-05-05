// Define the grid size
const rows = 5;
const columns = 5;
let filledCells;
let cellsToFill;
let flagsCounter;
const grid_size = rows * columns;
let timer_seconds;
let timerInterval;

// Get the grid container element
const gridContainer = document.getElementById("myGrid");
let gridCells = gridContainer.children



function createboard() {

  // Create the grid dynamically
     gridContainer.replaceChildren();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // Create a grid item element
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.classList.add("hidden");
      gridItem.dataset.value = gridContainer.children.length ;
      gridItem.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });
      gridItem.addEventListener("mouseup", (e) => {
          if(e.button == 0){
            showContent(gridItem);
            checkFinish()

            }
          else if(e.button == 2){
            flagItem(gridItem);  
            checkFinish()
          }
        })
 

      // Append the grid item to the grid container
      gridContainer.appendChild(gridItem);
    }
  }
  insertRandomBombs();
  insertBombsIndicators();
  flagsCounter = cellsToFill
  document.getElementById("bombs-counter").textContent = `remain bombs : ${flagsCounter}`
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to insert 'x' into 10 random cells in the grid
function insertRandomBombs() {
  const totalCells = rows * columns;
  cellsToFill = 3;
  filledCells = new Set(); // To keep track of filled cells

  // Fill 10 random cells with 'x'
  while (filledCells.size < cellsToFill) {
    const randomIndex = getRandomInt(0, totalCells - 1);
    if (!filledCells.has(randomIndex)) {
      filledCells.add(randomIndex);
      gridCells[randomIndex].textContent = "x";
      gridCells[randomIndex].classList.add("bomb-cell")
    }
  }
  
  console.log(filledCells);
}

function insertBombsIndicators() {
  for (let i = 0; i < grid_size; i++) {
    if (gridCells[i].textContent != "x") {
      bombsAroundCell(i);
    }
  }
}

function bombsAroundCell(cell_index) {
  let x_counter = 0;
  // Check right neighbor
  if ((cell_index + 1) % columns !== 0) {
    if (gridCells[cell_index + 1].textContent === "x") {
      x_counter++;
    }
  }

  // Check left neighbor
  if (cell_index % columns !== 0) {
    if (gridCells[cell_index - 1].textContent === "x") {
      x_counter++;
    }
  }

  // Check top neighbor
  if (cell_index >= columns) {
    if (
      gridCells[cell_index - columns].textContent === "x"
    ) {
      x_counter++;
    }

    // Check top right neighbor
    if ((cell_index + 1) % columns !== 0) {
      if (
        gridCells[cell_index - columns + 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }

    // Check top left neighbor
    if (cell_index % columns !== 0) {
      if (
        gridCells[cell_index - columns - 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }
  }

  // Check bottom neighbor
  if (cell_index + columns < grid_size) {
    if (
      gridCells[cell_index + columns].textContent === "x"
    ) {
      x_counter++;
    }

    // Check bottom right neighbor
    if ((cell_index + 1) % columns !== 0) {
      if (
        gridCells[cell_index + columns + 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }

    // Check bottom left neighbor
    if (cell_index % columns !== 0) {
      if (
        gridCells[cell_index + columns - 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }
  }
  if (x_counter == 0) {
    gridCells[cell_index].textContent = "";
  } else {
    gridCells[cell_index].textContent = x_counter;
  }
}

function showContent(item){
  if (item.classList.contains("hidden")){
    item.classList.remove("hidden")
    if(item.classList.contains("flagged")){
      item.classList.remove("flagged")
    }
    if(item.textContent == ""){
      const value = item.dataset.value;
      openEmptyElems(value)
    }
    // check for bomb
    else if(item.textContent == "x"){
      alert(`You hit a bomb! \nTime : ${timer_seconds} seconds`)
      let allGridItems = document.querySelectorAll(".grid-item");
      allGridItems.forEach(gridItem => {
      gridItem.classList.remove("hidden");
      });
}}
}

function flagItem(item){
  if(item.classList.contains("hidden")){
    if(item.classList.contains("flagged")){
      item.classList.remove("flagged");
      flagsCounter ++;
    }
    else{
      item.classList.add("flagged");
      flagsCounter --;
    }
    document.getElementById("bombs-counter").textContent = `remain bombs : ${flagsCounter}`
  }
}



function openEmptyElems(input_index) {
  // Check right neighbor
  let cell_index = Number(input_index);

  if (cell_index % columns !== columns - 1) {
      if (gridCells[cell_index + 1].textContent == "" && gridCells[cell_index + 1].classList.contains("hidden")) {
        gridCells[cell_index + 1].classList.remove("hidden")
        openEmptyElems(cell_index + 1);
      }
    
  }

  // Check left neighbor
  if (cell_index % columns !== 0 ) {
    if (gridCells[cell_index - 1].textContent == "" && gridCells[cell_index - 1].classList.contains("hidden")) {
      gridCells[cell_index - 1].classList.remove("hidden");
      openEmptyElems(cell_index - 1);    }
  }

  // Check top neighbor
  if (cell_index >= columns ) {
    if (
      gridCells[cell_index - columns].textContent == "" && gridCells[cell_index - columns].classList.contains("hidden")
    ) {
      gridCells[cell_index - columns].classList.remove("hidden");
      openEmptyElems(cell_index - columns) ;   }


  }

  // Check bottom neighbor
  if (cell_index + columns < gridCells.length) {
    if (
      gridCells[cell_index + columns].textContent == "" && gridCells[cell_index + columns].classList.contains("hidden")
    ) {
      gridCells[cell_index + columns ].classList.remove("hidden");
      openEmptyElems(cell_index + columns );   
     }   
  }
}


function checkFinish(){
  if(checkHiddenCells()) {
    let allHiddenCells = document.querySelectorAll(".hidden");
  
      for (let cell of allHiddenCells){
        if (!cell.classList.contains("bomb-cell") || !cell.classList.contains("flagged")){
          return "" ;
        }
      }
      setTimeout(function() {
        alert(`Congrats!! You finished the game :) \nTime : ${timer_seconds} seconds`);
      }, 1000);
    }
  
    }

function checkHiddenCells(){
  for (let cell of gridCells){
    if(cell.classList.contains("hidden")){
      return true;
  }}
  return false;
}

function startTimer() {
  timer_seconds = 0;
  timerInterval = setInterval(() => {
    timer_seconds++;
    // Update the button text with the elapsed time
    document.getElementById("timer-btn").innerText = `Time: ${timer_seconds} seconds`;
  }, 1000); // Update every second

}


function showPageSwitch(){
  let openingPageElem = document.querySelector(".opening-page")
  let gamePageElem = document.querySelector(".game-page")

  if (gamePageElem.classList.contains("hidden-page")) {
    gamePageElem.classList.remove("hidden-page");
    openingPageElem.classList.add("hidden-page");
  } else {
    gamePageElem.classList.add("hidden-page");
    openingPageElem.classList.remove("hidden-page");
  }
  clearInterval(timerInterval)
  document.getElementById("timer-btn").innerText ="Start timer :"
}