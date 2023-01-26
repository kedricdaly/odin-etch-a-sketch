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
        const gridRow = document.createElement('div');
        gridRow.setAttribute('class','grid-row');
        for (let j = 0; j < N; j++) {
            const div = document.createElement('div');
            div.setAttribute('class','cell');
            gridRow.appendChild(div);
        }
        easel.appendChild(gridRow);

    // add event listeners to the cell elements so when a new grid size
    // is requested, all cells function appropriately
    cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.addEventListener('mouseenter', cellHover));

}
}

function cellHover(e) {
    e.target.setAttribute('style','background-color: black')
}

window.addEventListener('load',generateGrid(16));
