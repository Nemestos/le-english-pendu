import Game from "./state.js";

const alphabet = document.getElementById("alphabet");
const modes = document.getElementById("modes")
const curr = document.getElementById("curr-mode")
const guess = document.getElementById("word")

function genAlphabetItem(letter) {
    const elt = document.createElement("div");
    elt.id = "letter"
    elt.dataset.letter = letter
    elt.addEventListener("click", (evt) => {
        game.guessed.add(letter)
        elt.classList.add("disabled")
        elt.style.pointerEvents = "none"
        elt.style.backgroundColor = isExisting(letter)?"green":"red"
        updateWord()
    })
    elt.innerText = letter
    return elt
}
function getWord(){
    return curr.innerText=="RANDOM"?game.to_guess.English:game.to_guess.Base
}
function isWinning(){
    const w= getWord()

}
function isExisting(letter){
    const w = getWord()
    return w.toUpperCase().includes(letter)
}
function genMode(mode) {
    const elt = document.createElement("div")
    elt.id = "mode"
    elt.dataset.mode = mode.nom
    elt.addEventListener("click", mode.f)
    elt.innerText = mode.nom
    return elt
}

function genWordGuessItem(letter) {
    const elt = document.createElement("div")
    elt.innerText = letter
    elt.id = "word-letter"
    return elt
}


function updateAlphabet() {
    alphabet.innerHTML = ""
    for (let i = 65; i < 91; i++) {
        const elt = genAlphabetItem(String.fromCharCode(i))
        alphabet.appendChild(elt)
    }

}

function updateModes() {
    modes.innerHTML = ""
    for (const v of game.modes) {
        const elt = genMode(v)
        modes.appendChild(elt)
    }

}

function updateWord() {
    guess.innerHTML = ""
    if (game.to_guess == null) {
        guess.innerHTML = "No word to guess"
    } else {
        const w = getWord()
        console.log(game.guessed)
        for (const x of w.toUpperCase()) {
            const elt = genWordGuessItem(game.guessed.has(x)?x:"_")
            guess.appendChild(elt)
        }
    }
}

function resetAll() {
    updateAlphabet();
    updateModes();
    updateWord();
    game.guessed = new Set();
   

}

const game = new Game();
game.addMode("RANDOM", (evt) => {
    curr.innerText = "RANDOM"
    game.curr = game.words
    game.newGen()
    resetAll()
    updateWord()

})
game.addMode("IRREGULAR VERBS", (evt) => {
    curr.innerText = "IRREGULAR VERBS";
    game.curr = game.verbs
    game.newGen()
    resetAll()
    updateWord()

})
resetAll()

