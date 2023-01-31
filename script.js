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
    cells.forEach(cell => cell.addEventListener('mouseenter', cellEnter));
    cells.forEach(cell => cell.addEventListener('mouseleave', cellLeave));

    }
}

function cellClick(e) {
    e.target.setAttribute('style','background-color: black');
}

function cellEnter(e) {
    if (e.buttons != 1) return; // requires primary mouse click
    e.target.setAttribute('style','background-color: black');
}

function cellLeave(e) {
    if (e.buttons != 1) return; // requires primary mouse click
    e.target.setAttribute('style','background-color: black');
}

function startUp() {
    const START_SIZE = 16;
    generateGrid(START_SIZE);
    setGridSliderValue(START_SIZE);
    updateSizeDisplay(START_SIZE);

    // we need a listener for when the value changes, so we can change the grid
    // size and the displayed value
    const gridSlider = document.querySelector('#gridSlider');
    gridSlider.addEventListener('input', updateSizeDisplay)

    const updateGridSizeBtn = document.querySelector('#updateGridSizeBtn');
    updateGridSizeBtn.addEventListener('click', updateGrid)

    const clrButton = document.querySelector('#clrBtn');
    clrButton.addEventListener('click', eraseGrid)

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

window.onload = startUp();
