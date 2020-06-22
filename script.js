const API = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
	//On prend tous les spans et on split la valeur de l'input
	const arrayQuote = quoteDisplayElement.querySelectorAll("span");
	const arrayValue = quoteInputElement.value.split("");
	let correct = true;
	//On loop sur l'arrayQuote, en prenant aussi l'index pour la position (characterSpan != celui du bas!)
	arrayQuote.forEach((characterSpan, index) => {
		const character = arrayValue[index];
		//Ajout des couleurs justes et fausses + correct booléen
		if (character == null) {
			characterSpan.classList.remove("correct");
			characterSpan.classList.remove("incorrect");
			correct = false;
		} else if (character === characterSpan.innerText) {
			characterSpan.classList.add("correct");
			characterSpan.classList.remove("incorrect");
			correct = true;
		} else {
			characterSpan.classList.remove("correct");
			characterSpan.classList.add("incorrect");
			correct = false;
		}
	});
	if (correct) renderNewQuote();
});

function getRandomQuote() {
	return fetch(API)
		.then(response => response.json())
		.then(data => data.content);
}

async function renderNewQuote() {
	const quote = await getRandomQuote();
	quoteDisplayElement.innerText = "";
	//On sépare chaque lettre, on fait une boucle et on les met dans un span
	quote.split("").forEach(character => {
		const characterSpan = document.createElement("span");
		characterSpan.innerText = character;
		// On append les spans au quoteDisplay
		quoteDisplayElement.appendChild(characterSpan);
	});
	//réinitialisation de la valeur de l'input + du timer
	quoteInputElement.value = null;
	startTimer();
}

//On paire le startTime à la Date courrante pour avoir quelque chose de précis
let startTime;
function startTimer() {
	timerElement.innerText = 0;
	//Current Date
	startTime = new Date();
	setInterval(() => {
		timer.innerText = getTimerTime();
	}, 1000);
}

//On prend le Current Time, on lui soustrait le startTime et on le converti en seconde
function getTimerTime() {
	return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();
