let ChangeText;
let TransformedText;

let RetryButton;
let RandomizeButton;

document.addEventListener("DOMContentLoaded", () => {

    if (GetData().length < 10 || GetData().length > 100) {
        GetData();
    }

    ChangeText = document.getElementById("change-text");
    TransformedText = document.getElementById("transformed-text");

    RetryButton = document.querySelector("#retry-button")
    RandomizeButton = document.querySelector("#random-button")

});

async function GetData() {

    // "https://cat-fact.herokuapp.com/facts/random"

    const response = await fetch("https://api.adviceslip.com/advice")
    const fact = await response.json();

    ChangeText.innerHTML = fact.slip.advice;

    var Offset = getRandomInt(6, 9);
    TransformText(Offset);

}

function TransformText(offset) {

    TransformedText.innerText = "";

    const TextToTransform = ChangeText.innerText

    const Symbols = [',', '.', "'", '"'];


    let LastAppliedId = 0;

    for (let i = 0; i < TextToTransform.length; i++) {

        const letter = TextToTransform[i];

        const span = document.createElement("span");
        const spanContent = document.createTextNode(letter);

        span.appendChild(spanContent)

        if (i == 0) {

            LastAppliedId = i

        } else {

            if (i - LastAppliedId == offset) {

                if (Symbols.includes(letter)) {
                    // 
                }
                else {
                    span.classList.add("alt");
                    LastAppliedId = i;
                }

            }

        }

        TransformedText.appendChild(span)

    }

}

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;

}


function RetryAction() {

    if (RetryButton.classList.contains("disabled")) {
        RetryButton.classList.remove("disabled")
    } else {
        RetryButton.classList.add("disabled")
    }

    GetData();

    if (RetryButton.classList.contains("disabled")) {
        RetryButton.classList.remove("disabled")
    } else {
        RetryButton.classList.add("disabled")
    }

}

function RandomizeAction() {
    var Offset = getRandomInt(6, 9);
    TransformText(Offset);
}