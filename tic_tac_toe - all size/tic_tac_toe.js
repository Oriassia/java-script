// function createGameBoard() {
//   let gameBoard = Array(size).fill(Array(size).fill("--"));
//   return gameBoard;
//   }

function createGameBoard() {
    let size = parseInt(
      prompt(
        "Insert a number here to create a table (e.g., 3 for a 3x3 table): "
      )
    );
    let gameBoard = Array(size)
      .fill(0)
      .map((_, rowIndex) =>
        Array(size)
          .fill(0)
          .map((_, colIndex) => rowIndex * size + colIndex + 1)
      );
    return gameBoard;
  }

  function is_win_row(spes_row) {
    if (spes_row[0] == "X" || spes_row[0] == "O" ) {
      for (let i in spes_row) {
        if (spes_row[0] == spes_row[i]){
          continue;
        }
        else {
          return false
        }
      }
    }
    else {
      return false
    }
    return true;
  }

  function is_win_all_row() {
    for (let i in gameBoard) {
      let result = is_win_row(gameBoard[i]);
      if (result != false) {
        return result;
      }
    }
    return false;
  }

  function is_win_column(column_num) {
    if (gameBoard[0][column_num] == "X" || gameBoard[0][column_num] == "O" ){
      let first_char = gameBoard[0][column_num];
      for (let i of gameBoard) {
        if ( i[column_num] == first_char) {
          continue;
        } else {
          return false;
        }
      }
    }
    else {
      return false
    }
    return true;
  }

  function is_win__all_columns() {
    for (let i in gameBoard) {
      let result = is_win_column(i);
      if (result != false) {
        return result;
      }
    }
    return false;
  }

  function is_winner() {
    if (
      is_win__all_columns() == true ||
      is_win_all_row() == true ||
      diagnol_down() == true ||
      diagnol_up() == true
    ) {
      return true;
    }
    else if (turns_counter == size ** 2) {
      return "draw";
      
    }
  }

  function diagnol_down() {
    if (gameBoard[0][0] == "X" || gameBoard[0][0] == "O" ){
      let j = 0;
      let first_char = gameBoard[0][0];
      for (let i in gameBoard) {
        if (first_char == gameBoard[i][j]) {
          j++;
          continue;
        } else {
          return false;
        }
      }
    }
    else {
      return false
    }
    return true;
  }

  function diagnol_up() {
    if (gameBoard[gameBoard.length - 1][0] == "X" || gameBoard[gameBoard.length - 1][0] == "O") {
      let j = 0;
      let first_char = gameBoard[gameBoard.length - 1][0];
      for (let i = gameBoard.length - 1; i >= 0; i--) {
        if (first_char == gameBoard[i][j]) {
          j++;
          continue;
        } else {
          return false;
        }
      }
    }
    else {
      return false
    }
    return true;
  }

function swap_turns (){
    if (current_player == "X"){
        current_player = "O"
    }
    else {
        current_player = "X"
    }
}

  function place_input() {
    while (true) {
      let user_input = prompt(visible_board() + "\nplayer turn : " + current_player + "\ninput place here : ");
      if ((user_input >= 0) && (user_input <= gameBoard.length ** 2)){
          for (let i of gameBoard) {
            for (let j in i) {
              if (user_input == i[j]) {
                i[j] = current_player;
                return "";
              }
            }
          }
          alert("this place is taken, please try again !");
        } else {
          alert("number invalid, please try again !");
        }
      }
    }

    function visible_board (){
      let new_board = []
      for (let i of gameBoard){
        let new_row = i.join(" | ")
        new_board.push(new_row)
      }
      let buttom_sep = buttom_seperator()
      return  new_board.join("\n" + buttom_sep + "\n" ); 
       
  }

  function buttom_seperator () {
    let sep_row = ""
    for (let i = 1; i<=size; i++){
      sep_row += "---"
    }
    return sep_row
  }

  function add_W_L_to_history (winner_name,looser_name){
    for (let i of history_array) {
      if (i.name == winner_name) {
        i.wins++;
        break
      }
    }
    for (let i of history_array) {
      if (i.name == looser_name) {
        i.loses++;
        break;
      }
    }
  }
  

  function add_player_to_history (name){
    for (let i of history_array) {
      if (i.name == name) {
        return ""
      }
    }
    let new_player = {"name": name, "wins": 0, "loses": 0}
    history_array.push(new_player);
  }
  

  function starting_player (){
    let char_start_select = prompt(
    `wich player will start the game? : \n"x" - 1 \n"O" - 2 `
  );
  if (char_start_select == "1") {
    current_player = "X";
  } else if (char_start_select == "2") {
    current_player = "O";
  }
  }
  

  function get_history_array (){
  let message = '';
  for (let entry of history_array) {
      message += `Name: ${entry.name}, Wins: ${entry.wins}, Loses: ${entry.loses}\n`;
  }
      return message;
  }
  
  function start_game (){
    game_running = true;
          gameBoard = createGameBoard();
          let winner_check = null;

          x_player = prompt(`please enter "X" player name : `);
          O_player = prompt(`please enter "O" player name : `);

          add_player_to_history(x_player);
          add_player_to_history(O_player);
          starting_player();

    while (game_running) {
      place_input(); // showing the user the ewxisting board & asking for input, then insert the chosie.
      turns_counter++;
      winner_check = is_winner();

      if (winner_check == true) {
        alert(visible_board() + "\nwinner is : " + current_player); // visible board - converting the
        game_running = false;

        if (current_player == "X") {
          add_W_L_to_history(x_player, O_player);
        } else if (current_player == "O") {
          add_W_L_to_history(O_player, X_player);
        }
        return "";

      } else if (winner_check == "draw") {
        alert(visible_board() + "\nit's a Draw ! ");
        break;
      }

      swap_turns();
    }
  }