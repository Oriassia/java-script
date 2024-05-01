// Define the grid size
const rows = 5;
const columns = 5;
let filledCells;
const grid_size = rows * columns;

// Get the grid container element
const gridContainer = document.getElementById("myGrid");

function createboard() {
  // Create the grid dynamically
     gridContainer.replaceChildren();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // Create a grid item element
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.classList.add("hidden");

      gridItem.onclick = function () {
        showContent(this);
        checkBomb(this)
      };

      // Append the grid item to the grid container
      gridContainer.appendChild(gridItem);
    }
  }
  insertRandomBombs();
  BombsCounters();
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to insert 'x' into 10 random cells in the grid
function insertRandomBombs() {
  const totalCells = rows * columns;
  const cellsToFill = 3;
  filledCells = new Set(); // To keep track of filled cells

  // Fill 10 random cells with 'x'
  while (filledCells.size < cellsToFill) {
    const randomIndex = getRandomInt(0, totalCells - 1);
    if (!filledCells.has(randomIndex)) {
      filledCells.add(randomIndex);
      gridContainer.children[randomIndex].textContent = "x";
    //   gridContainer.children[randomIndex].classList.add("hide-text");
    }
  }
  console.log(filledCells);
}

function BombsCounters() {
  for (let i = 0; i < grid_size; i++) {
    if (gridContainer.children[i].textContent != "x") {
      cellBombsCounter(i);
    }
  }
}

function cellBombsCounter(cell_index) {
  let x_counter = 0;
  // Check right neighbor
  if ((cell_index + 1) % columns !== 0) {
    if (gridContainer.children[cell_index + 1].textContent === "x") {
      x_counter++;
    }
  }

  // Check left neighbor
  if (cell_index % columns !== 0) {
    if (gridContainer.children[cell_index - 1].textContent === "x") {
      x_counter++;
    }
  }

  // Check top neighbor
  if (cell_index >= columns) {
    if (
      gridContainer.children[cell_index - columns].textContent === "x"
    ) {
      x_counter++;
    }

    // Check top right neighbor
    if ((cell_index + 1) % columns !== 0) {
      if (
        gridContainer.children[cell_index - columns + 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }

    // Check top left neighbor
    if (cell_index % columns !== 0) {
      if (
        gridContainer.children[cell_index - columns - 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }
  }

  // Check bottom neighbor
  if (cell_index + columns < grid_size) {
    if (
      gridContainer.children[cell_index + columns].textContent === "x"
    ) {
      x_counter++;
    }

    // Check bottom right neighbor
    if ((cell_index + 1) % columns !== 0) {
      if (
        gridContainer.children[cell_index + columns + 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }

    // Check bottom left neighbor
    if (cell_index % columns !== 0) {
      if (
        gridContainer.children[cell_index + columns - 1].textContent ===
        "x"
      ) {
        x_counter++;
      }
    }
  }
  if (x_counter == 0) {
    gridContainer.children[cell_index].textContent = "";
  } else {
    gridContainer.children[cell_index].textContent = x_counter;
  }
}

function showContent(item){
    item.classList.remove("hidden")
}

function checkBomb(item){
    if(item.textContent == "x"){
        alert("You hit a bomb!")
        let allGridItems = document.querySelectorAll(".grid-item");
        allGridItems.forEach(gridItem => {
            gridItem.classList.remove("hidden");
        });
}
}