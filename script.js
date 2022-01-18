import Game from "./state.js";
const alphabet = document.getElementById("alphabet");
const modes = document.getElementById("modes")
const curr = document.getElementById("curr-mode")
function genAlphabetItem(letter) {
    const elt = document.createElement("div");
    elt.id = "letter"
    elt.dataset.letter = letter
    elt.addEventListener("click", (evt) => {
        console.log(elt.dataset.letter)
    })
    elt.innerText = letter
    return elt
}

function genMode(mode) {
    const elt = document.createElement("div")
    elt.id = "mode"
    elt.dataset.mode = mode.nom
    elt.addEventListener("click",mode.f)
    elt.innerText = mode.nom
    return elt
}

function genWordGuessItem(letter) {
    return `
    <li id="guess">${letter}</li>
    `
}

function handleLetterClick(item) {

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

const game = new Game();
game.addMode("RANDOM",(evt)=>{
    curr.innerText = "RANDOM"
    game.curr = game.words
    game.newGen()

})
game.addMode("IRREGULAR VERBS",(evt)=>{
    curr.innerText = "IRREGULAR VERBS";
    game.curr = game.verbs
    game.newGen()

})

updateAlphabet();
updateModes()