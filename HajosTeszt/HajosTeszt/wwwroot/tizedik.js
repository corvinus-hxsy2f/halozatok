window.onload = function () {

    console.log("Oldal betöltve...");
    fetch("questions/count").then(x => x.text()).then(x => { sz = parseInt(x) })

    document.getElementById("előre").onclick = function előre() {
        
        displayedQuestion++;
        if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
        kérdésMegjelenítés();
    }
    document.getElementById("vissza").onclick = function vissza() {
        displayedQuestion--;
        if (displayedQuestion < 0) {
            displayedQuestion = questionsInHotList - 1;           
        }
        kérdésMegjelenítés();
    }
    
    init();

}

var sz;
var kérdésSorszám = 1;
var jóVálasz;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 7;
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában


function letöltésBefejeződött(data) {
    console.log("Sikeres letöltés")
    console.log(data)
    kérdések = data;
    kérdésMegjelenítés(0);

}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function kérdésMegjelenítés() {

    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);

    kérdés_szöveg.innerText = kérdés.questionText
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image
    válasz1.innerText = kérdés.answer1
    válasz2.innerText = kérdés.answer2
    válasz3.innerText = kérdés.answer3
    jóVálasz = kérdés.correctAnswer

    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép").classList.add("rejtett")
    }

    válasz1.classList.remove("jó", "rossz")
    válasz2.classList.remove("jó", "rossz")
    válasz3.classList.remove("jó", "rossz")
}

válasz = function (n) {
    if (jóVálasz == n) {
        document.getElementById("válasz" + n).classList.add("jó");
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
    }
}







