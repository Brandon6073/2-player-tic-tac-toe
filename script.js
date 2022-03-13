const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('.cell');
const winningMessageTextElement = document.querySelector('#win-message-text')

const board = document.getElementById('board');
const winningMessageElement = document.querySelector('#winningMessage')
const restartButton = document.getElementById('restartButton')

let oTurn;//if true, its circle turn


startGame()//allow the hover before the first turn

restartButton.addEventListener('click',startGame)

function startGame(){
    oTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',handleClick)//clear
        cell.addEventListener('click',handleClick,{once:true})//click once in one cell
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    
    //place Mark
    placeMark(cell,currentClass)

    //Check win
    if (checkWin(currentClass)){
        endGame(false)

    } else if(isDraw()){
        //check Draw
        endGame(true)
    } else{
    //switch turns
    swapTurns()
    setBoardHoverClass()
    }
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    oTurn = !oTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn){//based on the current class
        board.classList.add(O_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS)|| cell.classList.contains(O_CLASS);
    })
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw';
    }else{
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

