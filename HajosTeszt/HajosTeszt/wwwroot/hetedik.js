window.onload = function () {

    document.getElementById("vissza").onclick = function Vissza() {
        kérdésSorszám--;
        if (kérdésSorszám < 0) {
            kérdésSorszám = kérdések.length - 1;
        }
        kérdésMegjelenítés(kérdésSorszám)
    }

    document.getElementById("előre").onclick = function Előre() {
        kérdésSorszám++;
        if (kérdésSorszám == kérdések.length - 1) {
            kérdésSorszám = 0;

        }
        kérdésMegjelenítés(kérdésSorszám);


    }

    letöltés();

}


var kérdések;
var kérdésSorszám = 0;

function letöltés() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
    );
}

function letöltésBefejeződött(data) {
    console.log("Sikeres letöltés")
    console.log(data)
    kérdések = data;
    kérdésMegjelenítés(0);
  
}

function kérdésMegjelenítés(kérdésSzáma) {
    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
    let kép = document.getElementById("kép1");
    let válasz1 = document.getElementById("válasz1");
    let válasz2 = document.getElementById("válasz2");
    let válasz3 = document.getElementById("válasz3");

    kérdés_szöveg.innerHTML = kérdések[kérdésSzáma].questionText
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdésSzáma].image
    válasz1.innerText = kérdések[kérdésSzáma].answer1
    válasz2.innerText = kérdések[kérdésSzáma].answer2
    válasz3.innerText = kérdések[kérdésSzáma].answer3

    válasz1.classList.remove("jó", "rossz")
    válasz2.classList.remove("jó", "rossz")
    válasz3.classList.remove("jó", "rossz")
}

válasz = function (n) {
    if (kérdések[kérdésSorszám].correctAnswer == n) {
        document.getElementById("válasz" + n).classList.add("jó");
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        /*(kérdések[kérdésSorszám].correctAnswer).classList.add("jó");*/

    }
}




