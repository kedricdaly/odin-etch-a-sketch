function generateGrid(N) {

    const easel = document.querySelector('.easel');
    // remove grid if it currently exists
    // use an array because NodeLists are live collections
    // so if we try to remove each node in a node list, items in
    // the list move, and we don't remove all nodes 
    easelChildren = Array.from(document.querySelector('.easel').childNodes);
    easelChildren.forEach(child => child.remove());

    // loop twice to generate an NxN grid
    for (let i = 0; i < N; i++) {
        // create a grid-row
        // append cells to grid row, then afterward append grid-row to easel
        const flexRow = document.createElement('div');
        flexRow.setAttribute('class','flex-row');
        for (let j = 0; j < N; j++) {
            const div = document.createElement('div');
            div.setAttribute('class','cell');
            flexRow.appendChild(div);
        }
        easel.appendChild(flexRow);

    // add event listeners to the cell elements so, when a new grid size
    // is requested, all cells function appropriately
    cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.addEventListener('click', cellClick));
    cells.forEach(cell => cell.addEventListener('mouseenter', cellHover));
    cells.forEach(cell => cell.addEventListener('mouseleave', cellHover));
    }
}

function cellClick(e) {
    curMode = getCurrentMode();
    color = colorFromMode(curMode);
    e.target.setAttribute('style',`background-color: ${color}`);
}

function cellHover(e) {
    if (e.buttons != 1) return; // requires primary mouse click
    curMode = getCurrentMode();
    color = colorFromMode(curMode);
    e.target.setAttribute('style',`background-color: ${color}`);
}

function startUp() {
    const START_SIZE = 16;
    
    setGridSliderValue(START_SIZE);
    updateSizeDisplay(START_SIZE);

    // ensure we have the proper mode selected
    setMode('black');

    generateGrid(START_SIZE);

    // we need a listener for when the slider value changes, so we can change
    // the displayed value
    const gridSlider = document.querySelector('#gridSlider');
    gridSlider.addEventListener('input', updateSizeDisplay)

    const updateGridSizeBtn = document.querySelector('#updateGridSizeBtn');
    updateGridSizeBtn.addEventListener('click', updateGrid)

    const clrButton = document.querySelector('#clrBtn');
    clrButton.addEventListener('click', eraseGrid)

    // add event listeners for mode buttons
    const modeBtns = Array.from(document.querySelectorAll('.modeBtn'))
    modeBtns.forEach(btn => btn.addEventListener('click',setModeWrapper));

    const colorPicker = document.querySelector('#colorPicker');
    colorPicker.addEventListener('change',colorSelectWrapper);

}

function updateSizeDisplay() {
    const sizeDisp = document.querySelector('#sizeDisplay');
    const N = getGridSliderValue();
    sizeDisp.innerText = `${N}x${N}`;
}

function setGridSliderValue(N) {
    const gridSlider = document.querySelector('#gridSlider');
    gridSlider.value = N;
}

function getGridSliderValue() {
    const gridSlider = document.querySelector('#gridSlider');
    return gridSlider.value;
}

function updateGrid(e) {
    const gridSize = getGridSliderValue();

    // do not update if grid is same size
    const flexRow = document.querySelector('.flex-row');
    if (flexRow.childElementCount == gridSize) return;

    generateGrid(gridSize);
}

function eraseGrid(e) {
    generateGrid(getGridSliderValue());
}

function setModeWrapper(e) {
    setMode(e.target.innerText.toLowerCase());
}

function setMode(newMode) {

    // remove old mode if it exists
    const oldMode = document.querySelector('.currentMode');
    if (oldMode) {
        oldMode.setAttribute('class', 'modeBtn');
        if (oldMode.id === 'customBtn') oldMode.style.removeProperty('box-shadow');
    } 

    switch (newMode) {
        case 'black':
            btn = document.querySelector('#blkBtn');
            break;
        case 'rainbow':
            btn = document.querySelector('#rainbowBtn');
            break;
        case 'custom':
            btn = document.querySelector('#customBtn');
            let bgColor = getCustomColor();
            let fgColor = fontColorFromBackgroundHex(bgColor);
            btn.setAttribute('style',`background-color: ${bgColor};
            color: ${fgColor};
            box-shadow: inset 0px 0px 20px #BFBFBF`)
            break;
        case 'eraser':
            btn = document.querySelector('#eraserBtn');
            break;
        default:
            console.log(`tried to set mode to ${newMode} but case not found`);

    }

    btn.setAttribute('class', 'modeBtn currentMode');
}

function getCurrentMode() {
    return document.querySelector('.currentMode').innerText.toLowerCase();
}

function getCustomColor() {
    return document.querySelector('#colorPicker').value;
}

function colorSelectWrapper(e) {
    setMode('custom');
}

function colorFromMode(thisMode) {
    switch (thisMode) {
        case 'black':
            return 'black';
            break;
        case 'rainbow':
            // generate a hexdecimal number, and return it as a hex string
            return generateRandomHexColor();
        case 'custom':
            const customBtn = document.querySelector('#customBtn')
            return getCustomColor();
        case 'eraser':
            return 'white';
        default:
            console.log(`unknown mode in colorFromMode: ${thisMode}`);
    }
}

function generateRandomHexColor() {
    // https://css-tricks.com/snippets/javascript/random-hex-color/#comment-192864
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function fontColorFromBackgroundHex(hexString) {
    // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    let red = parseInt(hexString.slice(1,3),16);
    let green = parseInt(hexString.slice(3,5),16);
    let blue = parseInt(hexString.slice(5,7),16);

    let contrastRatio = (red * 0.299) + (green * 0.587) + (blue * 0.144)
    if (contrastRatio > 186) return '#000000';
    return '#ffffff';

}

window.onload = startUp();
