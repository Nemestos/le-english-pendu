import verbs from "./verbs.js"
import words from "./words.js"

function rand_item(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export default class Game {
    constructor() {
        this.verbs = verbs
        this.words = words

        this.modes = []
        this.curr = []
    }

    newGen() {
        const ran = rand_item(this.curr)
        console.log(ran)
    }


    addMode(name, func) {
        this.modes.push({
            nom: name,
            f: func
        })
    }

}