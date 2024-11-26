// DOM Anchors
const body = document.getElementsByTagName('body')[0];
const main = document.getElementById('main');
const pane = document.getElementById('pane');

const cms = {
	card: `<img id="selectCard" src="assets/img/card.svg" alt="Card icon">
			<p>Generate<br> Wi-Fi Cards</p>`,
	list: `<img id="selectList" src="assets/img/list.svg" alt="List icon">
			<p>Generate<br> Wi-Fi List</p>`,
}
const event = {
	valentine: `<img id="selectCard" src="assets/img/card.svg" alt="Card icon">`,
	christmas: `<img id="selectCard" src="assets/img/christmas.png" alt="Christmas">`,
	
}

// Components
function Header() {
	return `<header id="menu">
				<ul>
					<li><a href=""><i id="home" class="i-amha"></i></a></li>
				</ul>
				<h2>Wi-Fi Cards Beautifier</h2>
				<ul class="tools">
					<li><a href="https://172.17.10.6/admin/index-login.ant"><i class="i-print"></i></a></li>
					<li><a href="https://github.com/knznsmn/amha"><i class="i-github"></i></a></li>
				</ul>
    		</header>`;
}
function Title(show) {
    let h1,
        pa;
    if (show === true) {
        h1 = "Choose A Function";
        pa = "This program extracts codes from the payload of texts and embeds them into an A4-sized document.";
    }
    else {
        h1 = "";
        pa = "";
    }
	return `<div id="title">
                <h1 id="h1">${h1}</h1>
			    <p id="msg">${pa}</p>
            </div>`
}
function Footer() {
	const year = new Date().getFullYear();
	return `<section class="credits">
				<p class="js">I don't have OCD. I have CDO. It's like OCD, but the letters are arranged alphabetically, as they should be.</p>
				<footer id="footer">
				<p class="small"><span class="copy">©</span> ${year} —Written by <a href="https://www.github.com/knznsmn">knznsmn</a>. All rights reversed.</p>
				</footer>
			</section>`
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
				<label for="holiday">Holiday: </label>
				<select name="holiday" id="holiday">
					<option value="wifi"> </option>
					<option value="new-year">New Year</option>
					<option value="valentines">Valentines</option>
					<option value="ramadan">Ramadan</option>
					<option value="uae">UAE National Day</option>
					<option value="christmas">Christmas</option>
				</select>
			 </div>`
}

// Processes
function yearAsLogo(s) {
	const year = new Date().getFullYear();
	const uae = year - 1971;

	function ordinal(n) {
		n %= 10;
		
		if (n === 1) {
			return 'st';
		}
		else if (n === 2) {
			return 'nd';
		}
		else if (n === 3) {
			return 'rd';
		}
		else
			return 'th';
	}

	switch (s) {
		case 'uae':
			console.log(`Check this: ${uae % 10}`);
			return `<div class="year-logo"></div>
					<div class="year-calc">
						<p>Happy</p>
						<span class="nth">${uae}</span><small>${ordinal(uae)}</small>
						<p>National Day</p>
					</div>
					`;
		case 'new-year':
			return `
				<h2 class="year-welcome">Welcome</h2>
				<h1 class="year-logo">${year + 1}!</h1>`;
		default:
			return year;
	}
	
}

function holidayLogo(holiday) {
	switch (holiday) {
		case 'new-year':
			return yearAsLogo('new-year');
		case 'valentines':
			return `<img id="card-logo" src="./assets/img/valentines-heart.png" alt="Valentines icon">`;
		case 'ramadan':
			return `<img id="card-logo" src="./assets/img/ramadan-logo.png" alt="Ramadan greetings">`;
		case 'uae':
			return yearAsLogo('uae');
		case 'christmas':
			return `<img id="card-logo" src="./assets/img/christmas-logo.png" alt="Christmas logo icon">`;
		default:
			return `<img id="card-logo" src="./assets/img/logo.png" alt="AMHA logo">`;
	}
}

function just32(a, type) {
	let typeMaxNo;
	if (type === 'card') {
		typeMaxNo = 32;
	}
	else if (type === 'code') {
		typeMaxNo = 200;
	}
	const remainder = a.length % typeMaxNo;
	if (remainder !== 0) {
		a.splice(-remainder);
	}
	return a;
}
function extract(type) {
	const inputText = document.getElementById('inputText').value;
	const regex = /\b\d{5,6}\b/g;
	if (type === "test") {
		return inputText.match(regex) || [];
	}
	else {
		return just32(inputText.match(regex) || [], type);
	}
}
function pageGen(type) {
	const btn = {
		duration: document.getElementById('duration'),
		holiday: document.getElementById('holiday'),
	}
	const matches = extract(type);

	const a4 = document.createElement('div');
	a4.setAttribute('id', 'a4');
	a4.innerHTML = '';
	body.appendChild(a4);
	let cardsPerPage,
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
				card.innerHTML = `
						${holidayLogo(btn.holiday.value)}
						<img id="card-wifi" src="./assets/img/${btn.holiday.value}.png" alt="Wi-Fi icon">
						<p class="wifi-detail">AMHA-GUEST</p>
						<p class="wifi-detail">Access Code:<span class="heavy"> ${number}</span></p>
						<p class="small">1 ${btn.duration.value}</span> access for 5 devices</p>`;
				page.appendChild(card);
			});
			a4.appendChild(page);
		}
	}
	else if (type === "code") {
		cardsPerPage = 200;
		cardClass = 'code';

		for (let i = 0; i < matches.length; i += cardsPerPage) {
			const page = document.createElement('div');
			page.className = 'code-page';

			const pageMatches = matches.slice(i, i + cardsPerPage);
			pageMatches.forEach(number => {
				const card = document.createElement('div');
				card.className = cardClass;
				card.innerHTML = `<p id="code-number" class="heavy">${number}</p>`;
				page.appendChild(card);
			});
			a4.appendChild(page);
		}
	}
	main.remove();
	printContainer();
}
function printContainer() {
	setTimeout(() => {
		window.print();
	}, 3000);
}

// UI
function Start() {
	main.insertAdjacentHTML("afterbegin", Header());
    pane.insertAdjacentHTML("beforebegin", Title(true));
	main.insertAdjacentHTML("beforeend", Footer());
	document.addEventListener('click', function(e) {
		switch (e.target.id) {
			case "selectCard":
				pane.innerHTML = Textbox("card");
				break;
			case "selectList":
				pane.innerHTML = Textbox("code");
				break;
		}
	})
	return `<div class="selections">
				${cms.card}
			</div>
			<div class="selections">
				${cms.list}
			</div>`
}
function Textbox(type) {
    const title = document.getElementById('title');
    title.remove();
	document.addEventListener('click', function (e) {
		const $ = {
			h1: document.getElementsByTagName('h1')[0],
			pa: document.getElementById('msg'),
			menu: document.getElementsByTagName('header')[0],
			text: document.getElementsByTagName('textarea')[0],
			drop: document.querySelector('.drop'),
			img: document.getElementById('signature'),
		}
		const btn = {
			// print: document.getElementById('print'),
			start: document.getElementById('start'),
			duration: document.getElementById('duration'),
		}
		switch (e.target.id) {
			case 'start':
				const matches = extract(type);
				const testMatches = extract("test");
				let grammar;
				if (testMatches.length <= 1) {
					grammar = "code";
				}
				else {
					grammar = "codes";
				}
				if (type === "card") {
					if (matches.length < 32) {
						$.h1.innerHTML = `${testMatches.length} ${grammar}? I need at least 32 codes to work with...`;
						setTimeout(() => {
							location.reload()
						}, 5000);
					}
					else {
						$.h1.innerHTML = `Processing ${matches.length} access codes...`;
						setTimeout(() => {
							$.h1.innerHTML = `Wi-Fi ${type} page will be generated.`;
							pageGen(type);
						}, 1500);
					}
				}
				else if (type === "code") {
					if (matches.length < 200) {
						$.h1.innerHTML = `${testMatches.length} ${grammar}? I need at least 200 codes to create a Wi-Fi list...`;
						setTimeout(() => {
							location.reload()
						}, 5000);
					}
					else {
						$.h1.innerHTML = `Processing ${matches.length} access codes...`;
						setTimeout(() => {
							$.h1.innerHTML = `Wi-Fi ${type} page will be generated.`;
							pageGen(type);
						}, 1500);
					}
				}
				break;
			case 'card-logo':
			case 'number':
				printContainer();
				break;
			case 'home':
				location.reload();
		}
	});
	let h1;
	let pa;
	let ho;
	if (type === "card") {
		h1 = "Generate Beautiful Sheet of Wi-Fi Cards";
		pa = `This program extracts codes from the payload pasted into the textbox, and generates formatted Wi-Fi cards in an A4-sized document.<br />
			  To print the output, simply click any of the logos. Press ESC to return to the main interface.`;
		ho = "Expects a payload of texts containing at least 32 codes.";
		return `<div id="textbox">
				<h1 id="h1">${h1}</h1>
				<p id="msg">${pa}</p>
				<label for="inputText"></label>
				<textarea id="inputText" rows="10" cols="40" placeholder="${ho}"></textarea>
				${Option()}
				${Button('start')}
			</div>`;

	} else if (type === "code") {
		h1 = `Generate A Sheet of Wi-Fi Codes`;
		pa = `This program extracts codes from the payload pasted into the textbox, and generates a formatted an A4-sized document of Wi-Fi codes.<br />
			  To print the output, simply click any of the numbers. Press ESC to return to the main interface.`;
		ho = "Expects a payload of texts containing at least 200 codes.";
		return `<div id="textbox">
				<h1 id="h1">${h1}</h1>
				<p id="msg">${pa}</p>
				<label for="inputText"></label>
				<textarea id="inputText" rows="10" cols="40" placeholder="${ho}"></textarea>
				${Button('start')}
			</div>`;
	}
}
// MAIN()
pane.innerHTML = Start();
window.addEventListener('keydown', function(e) {
	console.log(e.key);
	switch (e.key) {
		case 'Escape':
			location.reload();
	}
})
