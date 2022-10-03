import Deck from './deck.js'
const computerDeckElement = document.querySelector(".computer-deck");
const playerCardSlot = document.querySelector(".player-card-slot")
const playerDeckElement = document.querySelector(".player-deck");
const txt = document.querySelector(".text");
let playerDeck, computerDeck, stop;
const computerCardSlot = document.querySelector('.computer-card-slot')
let inRound;
const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10":10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A":14
}
document.addEventListener("click", ()=>{
    if(stop){
        startGame()
        return
    }
    if(inRound){
        cleanBeforeRound()
    }else{
        flipCards()
    }
})
startGame();
function startGame(){
    const deck = new Deck()
    deck.shuffle()
    const deckMiddle = Math.ceil(deck.numberOfCards/2);
    playerDeck = new Deck(deck.cards.slice(0, deckMiddle));
    computerDeck = new Deck(deck.cards.slice(deckMiddle, deck.numberOfCards))
    inRound = false;
    stop = false;
    cleanBeforeRound()
}
function cleanBeforeRound(){
    inRound = false;
    computerCardSlot.innerHTML = ' '
    playerCardSlot.innerHTML = ' '
    txt.innerText = ' '
    updateDeckCount();
}
function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}
function flipCards(){
    inRound = true;
    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();
    playerCardSlot.appendChild(playerCard.getHtml())
    computerCardSlot.appendChild(computerCard.getHtml())
    updateDeckCount()
    console.log("Player" + playerCard.value)
    console.log("Computer" +computerCard.value)
    if (isRoundWinner(playerCard, computerCard)){
        txt.innerHTML = "win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    }else if(isRoundWinner(computerCard, playerCard)){
        txt.innerHTML = "lost"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }else{
        txt.innerHTML = "draw"
    }
    if(isGameOver(playerDeck)){
        txt.innerHTML =  "You Lost the game"
        stop = true
    }else if(isGameOver(computerDeck)){
        txt.innerHTML =  "You Win"
        stop = true
    }
}
function isRoundWinner(cardOne, cardTwo){
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}
function isGameOver(deck){
    return deck.numberOfCards === 0;
}
