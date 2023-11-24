import {Controller} from '@hotwired/stimulus';
import {words} from '../words/words';


export default class extends Controller {
    static targets = ["word", "progress", "result", "playArea", "option1", "option2", "intro"];
    static values = {
        correctWord: String
    }
    answers = [];


    connect() {
        this.score = 0;
        this.correctWordIndex = 0;
    }

    startGame() {
        this.score = 0;
        this.correctWordIndex = 0;
        this.playAreaTarget.style.display = "block";
        this.loadWord();
        this.introTarget.style.display = "none";
        this.answers = [];
    }

    loadWord() {
        if (this.correctWordIndex < 10) {
            let word = words[Math.floor(Math.random() * words.length)];
            //remove selected word from array
            words.splice(words.indexOf(word), 1);
            this.correctWordValue = word;

            let iCount = 0;
            let yCount = 0;
            let placeholder = "";
            let options = ['x', 'x'];
            for (let i = 0; i < word.length; i++) {
                if (iCount > 0) {
                    placeholder += word[i];
                } else if (word[i] === "i" || word[i] === "y") {
                    placeholder += "_";
                    iCount++;
                    options = ['i', 'y'];
                } else if (word[i] === "í" || word[i] === "ý") {
                    placeholder += "_";
                    iCount++;
                    options = ['í', 'ý'];
                } else {
                    placeholder += word[i];
                }
            }

            this.updateOptions(options[0], options[1]);
            console.log(placeholder);
            this.wordTarget.textContent = placeholder;
            this.progressTarget.textContent = `${this.correctWordIndex + 1} z 10`;
        } else {
            this.endGame();
        }
    }

    checkAnswer(event) {
        let letter = event.currentTarget.getAttribute('data-letter');
        console.log(letter)
        let correctWord = this.correctWordValue;
        let currentWord = this.wordTarget.textContent.replace("_", letter);
        let isCorrect = correctWord === currentWord;
        if (isCorrect) {
            this.score++;
        }
        this.answers[correctWord] = isCorrect;

        this.showLastAnswer(isCorrect);
        this.correctWordIndex++;
        this.loadWord();
    }

    endGame() {
        this.playAreaTarget.style.display = "none";
        let resultText = this.score === 10 ? "Super, všetkých <strong>10 z 10</strong> bolo správne!" : `Správne bolo <strong>${this.score} z 10</strong>.`;

        this.resultTarget.innerHTML = '<div class="p-4">' + resultText + '</div><div class="p-4">' + this.resultTable() + '</div><br><button onclick="location.reload()" class="mt-4 btn btn-primary btn-lg">Hraj opäť</button>';
        this.resultTarget.style.display = "block";
    }

    updateOptions(string, string2) {
        this.option1Target.innerHTML = string;
        this.option2Target.innerHTML = string2;
        this.option1Target.setAttribute("data-letter", string);
        this.option2Target.setAttribute("data-letter", string2);
    }

    showLastAnswer(isCorrect) {
        let correctWord = this.correctWordValue;
        this.resultTarget.innerHTML = isCorrect ? `<span class="text-success">✅ správne: ${correctWord}</span>` : `<span class="text-danger">❌ nesprávne, správne má byť: ${correctWord}</span>`;
        this.resultTarget.style.display = "block";
    }

    resultTable() {
        let result = '';
        for (let word in this.answers) {
            let isCorrect = this.answers[word];
            let className = isCorrect ? "text-success" : "text-danger";
            let icon = isCorrect ? '✅' : '❌';
            result += `<br><span class="${className}">${icon} ${word}</span>`;
        }
        return result;
    }
}