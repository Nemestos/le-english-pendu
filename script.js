import Game from "./state.js";
import words from "./words.js";

const alphabet = document.getElementById("alphabet");
const modes = document.getElementById("modes")
const curr = document.getElementById("curr-mode")
const guess = document.getElementById("word")
const hint = document.getElementById("hint")
let chances = 0;
let mode = 0;

function genAlphabetItem(letter) {
    const elt = document.createElement("div");
    elt.id = "letter"
    elt.dataset.letter = letter
    if (game.to_guess != null && isGuessed(letter.toUpperCase())) {
        elt.classList.add("disabled")
        elt.style.pointerEvents = "none"
        elt.style.backgroundColor = isExisting(letter) ? "green" : "red"
    }
    elt.addEventListener("click", (evt) => {
        game.guessed.add(letter)
        elt.classList.add("disabled")
        elt.style.pointerEvents = "none"
        elt.style.backgroundColor = isExisting(letter) ? "green" : "red"

        chances = isExisting(letter) ? chances : chances -= 1
        updateChance()

    })
    elt.innerText = letter
    return elt
}
function updateChance() {
    let divChance = document.getElementById('chances');
    divChance.innerHTML = ""
    if (chances < 1) {

        alphabet.innerHTML = lost();
        let w = document.getElementById('word');
        let def = document.createElement("def");
        if (mode == 1) {
            w.innerHTML = `Word: ${game.to_guess.English} || French: `;
            def.innerHTML = `${game.to_guess.French}`;
        } else {
            w.innerHTML = `Base: ${game.to_guess.Base} || Past-simple: `;
            def.innerHTML = `${game.to_guess.PastSimple} || Past-Participle: ${game.to_guess.PastParticiple}`;
        }


        w.appendChild(def);

    }
    else {
        console.log(chances)
        divChance.innerHTML = "Remaining chances: " + chances;
        updateWord()
    }
}
function isGuessed(letter) {
    const word = getWord()

    return word.includes(letter.toLowerCase()) && game.guessed.has(letter)
}
function getWord() {
    return curr.innerText == "RANDOM" ? game.to_guess.English : game.to_guess.Base
}

function lost() {
    return `
    <div id="lost">
    <h1>You lose !</h1>
    </div>
    `
}
function isWinning() {
    const w = getWord()

}
function isExisting(letter) {
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

            const elt = genWordGuessItem(game.guessed.has(x) ? x : "_")
            guess.appendChild(elt)
        }
    }
}
function updateChances() {
    let divChance = document.getElementById('chances');
    divChance.innerHTML = ""
    divChance.innerHTML = "Remaining chances: " + chances;
}
function getRandomLetterNotGuess() {
    let letter = ""
    let i = 0
    const word = getWord()

    while (letter == "") {
        if (game.guessed.has(word[i].toUpperCase())) {
            i += 1
            continue
        }
        letter = word[i]
    }

    return letter
}
function resetAll() {
    game.guessed = new Set();
    updateAlphabet();
    updateModes();
    updateWord();
    updateChances();
    console.log(game.guessed)


}

const game = new Game();
game.addMode("RANDOM", (evt) => {
    mode = 1;
    curr.innerText = "RANDOM"
    game.curr = game.words
    game.newGen()
    chances = game.chances;
    resetAll()
    updateWord()

})
game.addMode("IRREGULAR VERBS", (evt) => {
    mode = 2;
    curr.innerText = "IRREGULAR VERBS";
    game.curr = game.verbs;
    game.newGen();
    chances = game.chances;
    resetAll();
    updateWord();

})
resetAll()
hint.addEventListener("click", () => {
    if (game.to_guess != null) {
        let random = getRandomLetterNotGuess()
        game.guessed.add(random.toUpperCase())
        chances = Math.floor(chances / 2)
        updateAlphabet()
        updateWord()
        updateChance()
    }
})

