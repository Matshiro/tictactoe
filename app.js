const cells = document.getElementsByClassName("cell");
const restart = document.getElementById("restartButton");
const message = document.getElementById("message");

let board = [];
let currentPlayer = "X";
let gameEnd = false;

initializeGame();

function initializeGame(){
    for(let i = 0; i < cells.length; i++){
        cells[i].addEventListener("click", function(){
            cellClicked(cells[i], i)
        })
    }

    restart.addEventListener("click", function(){
        gameRestart();
    });
    clearBoard();
    message.textContent = "Water's turn!"
}

function clearBoard(){
    board = ["", "", "", "", "", "", "", "", ""];
}

function cellClicked(cell, nr){
    if (gameEnd){
        return;
    }
    if (cell.classList.contains("cellX") || cell.classList.contains("cellO")){
        return;
    }

    board[nr] = currentPlayer;
    cell.classList.add("cell"+currentPlayer);
    cell.classList.remove("cellH");

    checkForWin();
}

function checkForWin(){
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let win = false;


    for (let i = 0; i < winningConditions.length; i++){
        const condition = winningConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];
        
        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }
        if (cellA === cellB && cellB === cellC){
                win = true;
                break;
            }
        }
    
    if (win){
        roundWon(currentPlayer);
        return;
    }  

    else if (!board.includes("")){
        roundWon("Draw");
        return;
    }

    changePlayer();
}

function changePlayer(){
    if (currentPlayer === "X"){
        currentPlayer = "O";
        message.textContent = "Fire's turn!"
    }
    else{
        currentPlayer = "X";
        message.textContent = "Water's turn!"
    }
}

function roundWon(player){
    console.log(player);
    for(let i = 0; i < cells.length; i++){
        cells[i].classList.remove("cellH");
    }
    if (player === "Draw"){
        message.textContent = player;
    }
    else if( player === "X"){
        message.textContent = "Water wins!";
    }
    else if (player === "O"){
        message.textContent = "Fire wins!";
    }

    gameEnd = true;
}

function gameRestart(){
    for(let i = 0; i < cells.length; i++){
        cells[i].classList.remove("cellX");
        cells[i].classList.remove("cellO");
        cells[i].classList.add("cellH");
        currentPlayer = "X";
        gameEnd = false;
        clearBoard();
    }
}




