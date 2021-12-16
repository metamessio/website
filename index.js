const canvas  = document.getElementById('matrix');
const context = canvas.getContext('2d');

const scratchCanvas  = document.getElementById('scratch');
const scratchContext = scratchCanvas.getContext('2d');

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const runic    = 'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰ';
const alphabet = katakana + runic;
const fontSize = 12;

// Initialize the scene empty
var rainDrops  = [];
var rainColors = [];
canvas.width   = 0;
canvas.height  = 0;

const randomColor = () => {
	return "hsl(" +
		(180 + Math.floor(Math.random() * 120 / 5) * 5) + ", " +
		(90 + Math.floor(Math.random() * 10)) + "%, " +
		(50 + Math.floor(Math.random() * 25)) + "%, " +
		"0.75" +
		")";
}

const init = () => {
	// Depending on the new size, either extend or trim the drops
	const columns = window.innerWidth/fontSize;
	while (rainDrops.length > columns) {
		rainDrops.pop();
		rainColors.pop();
	}
	while (rainDrops.length < columns) {
		rainDrops.push(Math.random() * window.innerHeight / fontSize);
		rainColors.push(randomColor());
	}
	// Reinitialize the canvas with the new dimensions but old content
	if (canvas.width > 0 && canvas.height > 0) {
		scratchCanvas.width  = canvas.width;
		scratchCanvas.height = canvas.height;
		scratchContext.drawImage(canvas, 0, 0);
	}
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	if (scratchCanvas.width > 0 && scratchCanvas.height > 0) {
		context.drawImage(scratchCanvas, 0, 0);
	}
}

const draw = () => {
	// Shade the entire canvas to make everything dissapeary
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw the next set of characters, restarting anything out of picture
	context.font = fontSize + 'px monospace';
	for (let i = 0; i < rainDrops.length; i++) {
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

		// Clear out any previous blendig artifact
		context.fillStyle = "#000";
		context.fillRect(i*fontSize, rainDrops[i]*fontSize, fontSize, fontSize);

		// Draw the character and reset if it disappears out of view
		context.fillStyle = rainColors[i];
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);

		if (rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975) {
			rainDrops[i]  = 0;
			rainColors[i] = randomColor();
    }
		rainDrops[i]++;
	}
};

init();
setInterval(draw, 30);
