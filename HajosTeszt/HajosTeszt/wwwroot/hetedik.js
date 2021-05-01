window.onload = function () {

    console.log("Oldal betöltve...");
    fetch("questions/count").then(x => x.text()).then(x => { sz = parseInt(x) })

    document.getElementById("előre").onclick = function előre() {
        kérdésSorszám++;
        if (kérdésSorszám == sz + 1) {
            kérdésSorszám = 1;
        }
        kérdésBetöltés(kérdésSorszám);
    }
    document.getElementById("vissza").onclick = function vissza() {
        kérdésSorszám--;
        if (kérdésSorszám < 1) {
            kérdésSorszám = sz;
        }
        kérdésBetöltés(kérdésSorszám);
    }
    kérdésBetöltés(kérdésSorszám);


}

var sz;
var kérdésSorszám = 1;
var jóVálasz;


function letöltésBefejeződött(data) {
    console.log("Sikeres letöltés")
    console.log(data)
    kérdések = data;
    kérdésMegjelenítés(0);
  
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
                return null;
            }
            else {
                return response.json()
            }
        })
        .then(data => {
            if (data)kérdésMegjelenítés(data)
        });
} 


function kérdésMegjelenítés(kérdésSorszám) {

    if (!kérdésSorszám) return;
    console.log(kérdésSorszám);

    kérdés_szöveg.innerText = kérdésSorszám.questionText
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdésSorszám.image
    válasz1.innerText = kérdésSorszám.answer1
    válasz2.innerText = kérdésSorszám.answer2
    válasz3.innerText = kérdésSorszám.answer3
    jóVálasz = kérdésSorszám.correctAnswer

    if (kérdésSorszám.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdésSzáma.image;
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




      


