let words = ["veverička", "hlina", "silný", "miska", "list", "zima", "víno", "príliv", "divoký", "svit", "hrivna",
    "mimo", "film", "pisár", "briliant", "vlnitý", "vitamín", "klin", "limuzína", "disk", "simulátor",
    "militant", "bilión", "minúta", "limit", "stimulus", "vírus", "mikrofon", "vizitka", "migrácia", "figúrka",
    "faktor", "divízia", "limitovať", "minister", "klimatizácia", "diplomat", "rituál", "kritik", "iniciatíva", "istota",
    "indián", "fiktívny", "inštitút", "indikátor", "infúzia", "pilier", "identita", "imigrácia", "ilustrácia", "infikovať",
    "irigácia", "imitácia", "investícia", "intuícia", "indukcia", "injekcia", "inšpirácia", "intervencia", "inštitúcia", "integrácia",
    "inovácia", "intimita", "imunita", "iluminácia", "inteligencia", "industrializácia", "individualita", "imperializmus", "iniciátor", "infraštruktúra",
    "imigrácia", "ilustrácia", "infikovať", "irigácia", "imitácia", "investícia", "intuícia", "indukcia", "injekcia", "inšpirácia",
    "intervencia", "inštitúcia", "integrácia", "inovácia", "intimita", "imunita", "iluminácia", "inteligencia", "industrializácia", "individualita",
    "imperializmus", "iniciátor", "infraštruktúra", "imigrácia", "ilustrácia", "infikovať", "irigácia", "imitácia", "investícia", "intuícia", "sýkorka", "korytnačka", "dyno", "zvyk", "rytmus", "syntéza", "lyžica", "fyzika", "pyramída", "systém",
    "typ", "kryštál", "dynamit", "krypta", "mytológia", "sympózium", "kybernetika", "hypotéza", "mýto", "ryba",
    "kyslík", "rys", "psychológia", "hydrodynamika", "mýdlo", "syntetizátor", "kyvadlo", "symbióza", "lyko", "mýtus",
    "pylon", "syndikát", "kyberšikana", "symfónia", "hypotéka", "kyselina", "rytmický", "mlyn", "symetria", "kyselý",
    "sypať", "kryštálový", "mýliť", "styl", "syrový", "typický", "kymáci", "syrá", "ryža", "myšlienka",
    "sylabický", "typografia", "kysť", "mylný", "symptom", "synchrónny", "kyv", "kyprieť", "mytológ", "synchronizácia", "sympatia",
    "kysnutie", "mýval", "symetrický", "synchronizér", "syntaktický", "kyslota", "mýtus", "sylaba", "synergia", "kyselina",
    "sypať", "kryštálový", "mýliť", "styl", "syrový", "typický"];
let currentWordIndex = 0;
let answers = [];
let score = 0;
let correctWord = "";

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("game").style.display = "block";
    answers = [];
    loadWord();
}

function loadWord() {
    let word = words[Math.floor(Math.random() * words.length)];
    correctWord = word;

    //spočítať i a y v slove
    let iCount = 0;
    let newWord = "";
    let options = ['x', 'x'];
    for (let i = 0; i < word.length; i++) {
        if (iCount > 0) {
            newWord += word[i];
        } else if (word[i] === "i" || word[i] === "y") {
            newWord += "_";
            iCount++;
            options = ['i', 'y'];
        } else if (word[i] === "í" || word[i] === "ý") {
            newWord += "_";
            iCount++;
            options = ['í', 'ý'];
        } else {
            newWord += word[i];
        }
    }
    document.getElementById("option1").innerHTML = options[0];
    document.getElementById("option2").innerHTML = options[1];
    document.getElementById("option1").setAttribute("data-value", options[0]);
    document.getElementById("option2").setAttribute("data-value", options[1]);

    document.getElementById("word").textContent = newWord;
    document.getElementById("progress").textContent = `${currentWordIndex + 1} z 10`;
}

function clicked(href) {
    let letter = href.getAttribute("data-value");
    checkAnswer(letter)
}

function showLastAnswer(correctWord, answer) {
    document.getElementById("result").innerHTML = answer ? `<span class="text-success">✅ ${correctWord}</span>` : `<span class="text-danger">❌ ${correctWord}</span>`;
    document.getElementById("result").style.display = "block";
}

function checkAnswer(letter) {
    let word = document.getElementById("word").textContent;
    if (word.replace("_", letter) === correctWord) {
        score++;
        answers[correctWord] = true;
    } else {
        answers[correctWord] = false;
    }
    showLastAnswer(correctWord, answers[correctWord]);
    currentWordIndex++;
    if (currentWordIndex < 10) {
        loadWord();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("game").style.display = "none";
    let resultText = score === 10 ? "Super, všetkých <strong>10/10</g> si mal správne!" : `Správne si mal <strong>${score} z 10</strong>.`;
    for (let word in answers) {
        let isCorrect = answers[word];
        let className = isCorrect ? "text-success" : "text-danger";
        let icon = isCorrect ? '✅' : '❌';
        resultText += `<br><span class="${className}">${icon} ${word}</span>`;
    }
    document.getElementById("result").innerHTML = resultText + '<br><button onclick="location.reload()" class="btn btn-primary btn-lg">Hraj opäť</button>';
    document.getElementById("result").style.display = "block";
}

document.addEventListener("keypress", function (event) {
    if (event.key === "i" || event.key === "y") {
        checkAnswer(event.key);
    }
});
