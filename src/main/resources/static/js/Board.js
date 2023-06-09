class Board {

    constructor(scoreBoard) {

    	this.scoreBoard = scoreBoard;
    	
        this.cells = [];
        this.players = [];
        this.ready = false;   
        
        this.createTable();
    }

    createTable() {
    	
    	this.table = document.createElement('table');
        this.table.addEventListener('click', event => this.markEvent(event));    	
    	this.table.classList.add('gameBoard');
    	
        let rowCol = document.createElement('td');
        rowCol.classList.add('boardRow');
        rowCol.classList.add('bgWhite');
        rowCol.setAttribute('colspan', 5);
        
        let row = document.createElement('tr');
        row.appendChild(rowCol);

        let col = document.createElement('td');
        col.classList.add('boardCol');
        col.classList.add('bgWhite');

        let cell = document.createElement('td');
        cell.classList.add('gameCell');
        cell.classList.add('notActive');
        cell.setAttribute('marked', 'false');
        cell.setAttribute('data-intent', 'gameCell');

        for (let i = 0; i < 9; i++) {
        	let newCell = cell.cloneNode(true);
        	newCell.setAttribute('id', 'cell-'+i);
            this.cells.push(newCell);
        }

        for (let r, i = 0; i < 9; i += 3) {
            
        	r = row.cloneNode(false);
            r.appendChild(this.cells[i]);
            r.appendChild(col.cloneNode(false));
            r.appendChild(this.cells[i + 1]);
            r.appendChild(col.cloneNode(false));
            r.appendChild(this.cells[i + 2]);

            this.table.appendChild(r);

            if (i < 6) {
                this.table.appendChild(row.cloneNode(true));
            }
        }
    }

    addTable(container) {
        container.appendChild(this.table);
    }

    disableAll() {
        for (let cell of this.cells) {
            cell.classList.add('notActive');
            cell.setAttribute('active', 'false');
        }
    }

    enableAll() {
        for (let cell of this.cells) {
            cell.classList.remove('notActive');
            cell.setAttribute('marked', 'false');
        }
    }

    enableTurn() {
        for (let cell of this.cells) {
            if (cell.getAttribute('marked') === 'false') {
                cell.classList.remove('notActive');
                cell.setAttribute('active', 'true');
            }
        }
    }

    highlightCells(positions) {
        
        for (let i of positions) {
        	this.cells[i].classList.add('colorRed');
        }

        for (let cell of this.cells) {
            cell.setAttribute('marked', 'true');
        }
    }

    lowlightCells() {        
        for (let cell of this.cells) {
            cell.classList.add('colorWhite');
        }
    }

    onMark(cellId) { }
    
    markEvent(event) {
        let target = event.target;

        if (this.ready && target.getAttribute('data-intent') === 'gameCell' && 
        		target.getAttribute('active') === 'true') {
            this.onMark(this.cells.indexOf(target));
            this.disableAll();
        }
    }

    doMark(cellId, label) {
        let cell = this.cells[cellId];
        cell.classList.add('notActive');
        cell.setAttribute('marked', 'true');

        if(label == 'X'){
            cell.style.backgroundImage="url(https://png.pngtree.com/png-clipart/20210311/big/pngtree-red-x-fork-png-image_6001925.png)";
        }

        if(label == 'O'){
            cell.style.backgroundImage="url('/js/donut.png')";
        }
    }

    doWinner(winner, pos) {
    	
    	let looser;
    	if(winner === this.players[0].name){
    		looser = this.players[1].name;
    	} else {
    		looser = this.players[0].name;
    	}
    	
    	alert(winner+" Ganaste! "+looser+" Perdiste.");
    	
    	this.disableAll();
        this.highlightCells(pos);
    }

    doDraw() {
    	alert("Empate!");
        this.lowlightCells();
    }

    highlightScoreboard(playerId) {

        for (let board of this.scoreBoard) {
            board.classList.remove('active');
            
            if (board.getAttribute('playerId') == playerId) {
                board.classList.add('active');
            }
        }
    }

    addPlayer(player) {
    	
        if (this.players.length < 2) {

            if (this.players.length === 0 || this.players[0].id != player.id) {
            	
                this.players.push(player);
                
                let score = this.scoreBoard[this.players.length - 1];

                if (this.players.length === 1) {
                	score.textContent = player.label + ' ' + player.name;
                } else {
                	score.textContent = player.name + ' ' + player.label;
                }

                score.setAttribute('playerId', player.id);
            }
        }
    }
    
    restart(){
    	
    	for (let cell of this.cells) {
    		
    		cell.classList.remove('colorRed');
    		cell.classList.add('notActive');
    		
    		cell.classList.remove('colorWhite');    		
    		cell.classList.remove('colorRed');
    		
            cell.setAttribute('marked', 'false');            
            cell.setAttribute('active', 'false');
            
            cell.textContent = '';
        }    	
    }
}
    var seconds = 0;
    function secondPassed(){
        var minutes =Math.round((seconds - 30)/60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds<10) {
            remainingSeconds = "0" + remainingSeconds;
        }
        document.getElementById('countdown').innerHTML=minutes+":"+remainingSeconds;
        seconds++;
    } 
    var countdownTimer = setInterval(secondPassed,1000);

