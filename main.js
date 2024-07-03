// DOM Anchors
const main = document.getElementById('main');
const pane = document.getElementById('pane');

const cms = {
	card: `Hello, what's up!`,
}

// UI
function Bulletin() {
	console.log(`Bulletin() loaded...`)
	const selectCard = document.createElement('div');
	const selectList = document.createElement('div');
	selectCard.classList.add('selections');
	selectList.classList.add('selections');
	selectCard.setAttribute('id', 'selectCard');
	selectList.setAttribute('id', 'selectList')
	selectCard.innerHTML = cms.card;
	selectList.innerHTML = cms.card;
	pane.append(selectCard);
	pane.append(selectList);
		
}

window.addEventListener('load', () => {
	Bulletin();
})