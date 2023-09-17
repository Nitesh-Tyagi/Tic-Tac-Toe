const X = `<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="crossGroup">
<rect id="outer2" y="24.1861" width="34.2042" height="192.07" rx="17.1021" transform="rotate(-45 0 24.1861)" fill="#D9D9D9"/>
<rect id="outer1" x="135.814" width="34.2042" height="192.07" rx="17.1021" transform="rotate(45 135.814 0)" fill="#D9D9D9"/>
<rect id="inner2" x="5.58139" y="24.1861" width="26.3109" height="184.177" rx="13.1555" transform="rotate(-45 5.58139 24.1861)" fill="#434343"/>
<rect id="inner1" x="135.814" y="5.58139" width="26.3109" height="184.177" rx="13.1555" transform="rotate(45 135.814 5.58139)" fill="#434343"/>
</g>
</svg>
`;
const O = `<svg width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ringGroup">
<circle id="inner3" cx="74" cy="74" r="64" stroke="#D9D9D9" stroke-width="20"/>
<circle id="inner1" cx="74" cy="74" r="51" stroke="#D9D9D9" stroke-width="20"/>
<circle id="inner2" cx="74" cy="74" r="57.5" stroke="#434343" stroke-width="25"/>
</g>
</svg>
`;

const scoreX = document.getElementById('X');
const scoreO = document.getElementById('O');

scoreX.innerText = 0;
scoreO.innerText = 0;


const svgArray = [X,O];
let player = 0;
let moves = 0;

let arr = Array(9).fill(null);


function checkWinner(i){
	if(arr[0]==i && arr[0]==arr[1] && arr[1]==arr[2]) return true;
	if(arr[3]==i && arr[3]==arr[4] && arr[4]==arr[5]) return true;
	if(arr[6]==i && arr[6]==arr[7] && arr[7]==arr[8]) return true;

	if(arr[0]==i && arr[0]==arr[3] && arr[3]==arr[6]) return true;
	if(arr[1]==i && arr[1]==arr[4] && arr[4]==arr[7]) return true;
	if(arr[2]==i && arr[2]==arr[5] && arr[5]==arr[8]) return true;

	if(arr[0]==i && arr[0]==arr[4] && arr[4]==arr[8]) return true;
	if(arr[2]==i && arr[2]==arr[4] && arr[4]==arr[6]) return true;

	return false;
}

function clearPage(){
	// await sleep(2000);
	const els = document.getElementsByClassName('box');
	for(let i=0;i<9;i++){
		els.item(i).style.background = '#434343';
		console.log(els.item(i).innerHtml);
		arr[i] = null;
	}
	moves=0;
}

function handleClick(el){
	const id = Number(el.id);
	if(arr[id] == 0 || arr[id] == 1) return;
	arr[id] = player;

	const currentSVG = svgArray[player];

	el.style.backgroundImage = `url('data:image/svg+xml,${encodeURIComponent(currentSVG)}')`;
	el.style.backgroundSize = "cover";
	el.style.backgroundRepeat = "no-repeat";

	moves++;
	if(checkWinner(player)){
		if(player==0){
			alert("X Won!\nNext Turn : O");
			scoreX.innerText ++;
		} else{
			alert("O Won!\nNext Turn : X");
			scoreO.innerText ++;
		}

		clearPage();
	}
	if(moves==9){
		alert("Draw");
		clearPage();
	}

	player = 1 - player;
}
