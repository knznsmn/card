// DOM Anchors
const main = document.getElementById('main');
const pane = document.getElementById('pane');

const cms = {
	card: `Generate Wi-Fi Cards`,
	list: `Generate Wi-Fi List`,
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
	selectList.innerHTML = cms.list;
	pane.append(selectCard);
	pane.append(selectList);
	
	const card = document.getElementById('selectCard');
	const list = document.getElementById('selectList');
	
	document.addEventListener('click', function(e) {
		console.log(e.target.id);
		switch (e.target.id) {
			case "selectCard":
				console.log("Generate cards");
				break;
			case "selectList":
				console.log("Generate lists");
				break;
			default:
				console.log(e.target.id);
		}
	})
}

window.addEventListener('load', () => {
	Bulletin();
})