// DOM Anchors
const body = document.getElementsByTagName('body')[0];
	header = document.getElementById('menu'),
	footer = document.getElementById('footer');
const main = document.getElementById('main');
const pane = document.getElementById('pane');

const cms = {
	card: `<img id="selectCard" src="assets/img/card.png" alt="Card icon">
			<p>Generate<br> Wi-Fi Cards</p>`,
	list: `<img id="selectList" src="assets/img/list.png" alt="List icon">
			<p>Generate<br> Wi-Fi List</p>`,
	hold: `This program formats WiFi code cards to fit on A4 pages, with 32 cards per page. 
			It's best to generate access codes in multiples of 32.`
}
// const $ = {
// 	// h1: document.getElementsByTagName('h1')[0],
// 	menu: document.getElementsByTagName('header')[0],
// 	text: document.getElementsByTagName('textarea')[0],
// 	drop: document.querySelector('.drop'),
// 	img: document.getElementById('signature'),
// }
// const btn = {
// 	start: document.getElementById('start'),
// 	duration: document.getElementById('duration'),
// }
// Components
function Header(show) {
	if (show) {
		return `<header id="menu">
				<ul>
					<li><a href="#"><i id="home" class="i-amha"></i></a></li>
				</ul>
				<ul class="tools">
					<li><a href="https://github.com/knznsmn/wificard"><i class="i-github"></i></a></li>
				</ul>
        	</header>`
	}
	else {
		return "";
	}
}
function Footer(show) {
	if (show) {
		return `<footer id="footer">
            	<p class="small">&copy; 2024 knznsmn. All rights reserved.</p>
        	</footer>`
	}
	else {
		return '';
	}

}
function Button(id) {
	return `<button id="${id}">${id.toUpperCase()}</button>`;
}
function Option() {
	return `<div class="drop">
				<label for="duration">Access duration: </label>
				<select name="duration" id="duration">
					<option value="day">Day</option>
					<option value="week">Week</option>
					<option value="month">Month</option>
				</select>
			 </div>`
}
function Paper() {
	const a4 = document.createElement('div');
	a4.setAttribute('id', 'a4');
	a4.innerHTML = '';
}
function Page() {

}
// Processes
function just32(a) {
	const remainder = a.length % 32;
	if (remainder !== 0) {
		a.splice(-remainder);
	}
	return a;
}
function extract() {
	const inputText = document.getElementById('inputText').value;
	const regex = /\b\d{5,6}\b/g;
	return just32(inputText.match(regex) || []);
}
function listGen() {
	const btn = {
		duration: document.getElementById('duration'),
	}
	const matches = extract();

	Paper();
	const codePerPage = 32;
	body.appendChild(a4);
	for (let i = 0; i < matches.length; i += codePerPage) {
		const page = document.createElement('div');
		page.className = 'page';

		const pageMatches = matches.slice(i, i + codePerPage);
		pageMatches.forEach(number => {
			const code = document.createElement('div');
			code.className = 'code';
			code.innerHTML = `<p class="heavy">${number}</span></p>`;

			page.appendChild(code);
		});
		a4.appendChild(page);
	}
	main.remove();
}
function pageGen(type) {
	const btn = {
		duration: document.getElementById('duration'),
	}
	const matches = extract();

	const a4 = document.createElement('div');
	a4.setAttribute('id', 'a4');
	a4.innerHTML = '';
	body.appendChild(a4);
	let cardsPerPage,
		cardContent,
		cardClass;
	if (type === "card") {
		cardsPerPage = 32;
		cardClass = 'card';

		for (let i = 0; i < matches.length; i += cardsPerPage) {
			const page = document.createElement('div');
			page.className = 'page';

			const pageMatches = matches.slice(i, i + cardsPerPage);
			pageMatches.forEach(number => {
				const card = document.createElement('div');
				card.className = cardClass;
				card.innerHTML = `<img id="card-logo" src="./assets/img/logo.png" alt="AMHA logo">
						<img id="card-wifi" src="./assets/img/wifi.png" alt="Wifi icon">
						<p class="small">AMHA-GUEST</p>
						<p class="small">Access Code:<span class="heavy"> ${number}</span></p>
						<p class="small">1 ${btn.duration.value}</span> access for 5 devices</p>`;
				page.appendChild(card);
			});
			a4.appendChild(page);
		}
	}
	else if (type === "code") {
		console.log("IT'S 198!");
		cardsPerPage = 198;
		cardClass = 'code';

		for (let i = 0; i < matches.length; i += cardsPerPage) {
			const page = document.createElement('div');
			page.className = 'page';

			const pageMatches = matches.slice(i, i + cardsPerPage);
			pageMatches.forEach(number => {
				const card = document.createElement('div');
				card.className = cardClass;
				card.innerHTML = `<p id="number" class="heavy">${number}</p>`;
				page.appendChild(card);
			});
			a4.appendChild(page);
		}
	}
	main.remove();
	printContainer();
}
function printContainer() {
	window.print();
}

// UI
function Start() {
	console.log(`Start() loaded...`);
	main.insertAdjacentHTML("afterbegin", Header(true));
	main.insertAdjacentHTML("beforeend", Footer(true));
	document.addEventListener('click', function(e) {
		console.log(e.target.id);
		switch (e.target.id) {
			case "selectCard":
				console.log("Generate cards");
				pane.innerHTML = Textbox("card");
				break;
			case "selectList":
				console.log("Generate lists");
				pane.innerHTML = Textbox("code");
				break;
			default:
				console.log(e.target.id);
		}
	})
	return `<div class="selections">
				${cms.card}
			</div>
			<div class="selections">
				${cms.list}
			</div>`;
}
function Textbox(type) {
	console.log(`Textbox() loaded...`)
	let button = Button("start");
	document.addEventListener('click', function (e) {

		const $ = {
			h1: document.getElementsByTagName('h1')[0],
			menu: document.getElementsByTagName('header')[0],
			text: document.getElementsByTagName('textarea')[0],
			drop: document.querySelector('.drop'),
			img: document.getElementById('signature'),
		}
		const btn = {
			print: document.getElementById('print'),
			start: document.getElementById('start'),
			duration: document.getElementById('duration'),
		}
		switch (e.target.id) {
			case 'start':
				const matches = extract();
				$.h1.innerHTML = `Processing ${matches.length} access codes`;
				setTimeout(() => {
					$.h1.innerHTML = `${type} page will be generated.`;
					// button = Button("generate");
					pageGen(type);
				}, 1000);
				break;
			case 'card-logo':
				printContainer();
				break;
			default:
				console.log(e.target.id);
		}
	});
	return `<div id="textbox">
				<h1 id="h1"></h1>
				<label for="inputText"></label>
				<textarea id="inputText" rows="10" cols="50" placeholder="${cms.hold}">		
				</textarea>
				${Option()}
				${button}
			</div>`;
}
function Clear() {
	Header(false)
	Start(false)
	Textbox(false)
	Footer(false)
}

// MAIN()
pane.innerHTML = Start(true);






















// window.addEventListener('load', () => {
// 	show;
// })