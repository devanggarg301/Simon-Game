let gameSeq=[];
let userSeq=[];
let h2 = document.querySelector('h2');
let hscore = document.querySelector('.score');
let btns = ["yellow","red","purple","green"];
let bg = document.querySelector('body');
let started = false;
let level = 0;
let highestScore = 0;

document.addEventListener("keypress",function(){
    if(started==false){
        reset();
        console.log("Game Started");
        started = true;
        levelUp();
    }
})

function gameFlash(btn){
    setTimeout(function(){
        btn.classList.add("flash");
    },250);
    
    setTimeout(function(){
        btn.classList.remove("flash")
    },500);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    if(level-1>=highestScore){
        highestScore = level-1;
        hscore.innerText = `highest score: ${highestScore}`;
    }

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randbtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerText = `Game Over! Press any key to start again, your score is ${level-1} `;
        bg.style.backgroundColor = "red";
        started = false;
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    bg.style.backgroundColor = "white";
}