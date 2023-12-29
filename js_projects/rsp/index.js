const rock = "url(./assets/rock.png)";
const paper = "url(./assets/paper.png)";
const sci = "url(./assets/sc.png)";

const rockOption = document.getElementById('rock');
const paperOption = document.getElementById('paper');
const sciOption = document.getElementById('sci');

const playerWinLabel = document.getElementById("player");
const pcPlayerWinLabel = document.getElementById("pcPlayer");
const drawLabel = document.getElementById("draw");

const playerSelectionElement = document.getElementById("playerSelection");
const pc = document.getElementById("pcSelection");
let player;

rockOption.onclick = function(){
    run(rockOption);
    player = 0;
}
paperOption.onclick = function(){
    player = -1;
    run(paperOption);
}
sciOption.onclick = function(){
    player = 1;
    run(sciOption);
}

function run(source){
    playerWinLabel.style.visibility="hidden";
    pcPlayerWinLabel.style.visibility="hidden";
    drawLabel.style.visibility="hidden";

    if(source.id == "rock"){
        playerSelectionElement.style.backgroundImage = rock;
        playerSelectionElement.style.transform = "rotate(0)";
    }
    if(source.id == "paper"){
        playerSelectionElement.style.backgroundImage = paper;
        playerSelectionElement.style.transform = "rotate(90deg)";
    }
    if(source.id == "sci"){
        playerSelectionElement.style.backgroundImage = sci;
        playerSelectionElement.style.transform = "rotate(0)";
    }
    
    slideShow(pc);
    setTimeout(slideShow, 300, pc);
    setTimeout(slideShow, 600, pc);
    setTimeout(start, 900, pc);
    
}

function slideShow(pc) {
    pc.style.backgroundImage = rock;
    pc.style.transform = "rotate(0) scaleX(-1)";
    setTimeout(swap2, 100, pc);
}

function swap2(pc) {
    pc.style.backgroundImage = paper;
    pc.style.transform = "rotate(90deg) scaleX(-1)";
    setTimeout(swap3, 100, pc);
}

function swap3(pc) {
    pc.style.backgroundImage = sci;
    pc.style.transform = "rotate(0) scaleX(-1)";
    setTimeout(100);
}

function start(pc){
    let pcPlayer;
    let random = Math.floor(Math.random() * 3);
    if(random == 0){
        pcPlayer = 0;
        pc.style.backgroundImage = rock;
        pc.style.transform = "rotate(0) scaleX(-1)";
    }
    else if(random == 1){
            pcPlayer = -1;
            pc.style.backgroundImage = paper;
            pc.style.transform = "rotate(90deg) scaleX(-1)";
        }else{
            pcPlayer = 1;
            pc.style.backgroundImage = sci;
            pc.style.transform = "rotate(0) scaleX(-1)";
        }
    
    if(compare(player, pcPlayer) == player)
        document.getElementById("player").style.visibility="visible";
    if(compare(player, pcPlayer) == pcPlayer)
        document.getElementById("pcPlayer").style.visibility="visible";
    if(compare(player, pcPlayer) == 2)
        document.getElementById("draw").style.visibility="visible";
}

function compare(hand1, hand2){
    let winner = 2;
    if(hand1 != hand2){
        if(Math.abs(hand1) == Math.abs(hand2)){
            winner = Math.max(hand1, hand2);
        }else{
            winner = Math.min(hand1, hand2);
        }
    }
    return winner;
}