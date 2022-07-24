const randomQuoteApi = 'http://api.quotable.io/random';
const quoteDisplay = document.querySelector('.quote-display');
const quoteInput = document.querySelector(".quote-input");
const timer = document.querySelector('.timer');
let startTime;

function getRandomQuote() {
    fetch(randomQuoteApi)
        .then(response => response.json())
        .then(Data => Data.content.split("").forEach(character => {
            const spanCharacter = document.createElement('span');
            spanCharacter.innerText = character;
            quoteDisplay.appendChild(spanCharacter);
        }));
    startTimer()
};
getRandomQuote();


quoteInput.addEventListener('input', checkCharacters);
function checkCharacters() {
    let correct = true;
    const arraySpans = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split("");
    arraySpans.forEach((span, index) => {
        if (arrayValue[index] == null) {
            span.classList.remove('correct');
            span.classList.remove('wrong');
            correct = false
        } else if (span.innerHTML == arrayValue[index]) {
            span.classList.add('correct');
            span.classList.remove('wrong');
        } else {
            span.classList.add('wrong');
            span.classList.remove('correct');
            correct = false;
        };
    });
    if (correct) {
        setTimeout(() => {
            quoteDisplay.innerHTML = "";
            quoteInput.value = "";
            time = 0;
            getRandomQuote();
        }, 1500);
    };
};

function startTimer() {
    timer.innerHTML = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerHTML = getTime();
    }, 1000)
}

function getTime() {
    return Math.floor((new Date() - startTime) / 1000);
}