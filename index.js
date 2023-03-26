import {TowerOfHanoiGreedyAlgorithm} from './Greedy.js'
const Towers = [[3,2,1], [], []];
const rings = document.getElementsByClassName('ring')
const tours = document.getElementsByClassName('ring-container')
const numRing = document.getElementById('num-ring')
const workStatus = document.getElementById('work-status')
const movesNum = document.getElementById('moves-num')
const solveBtn = document.getElementById('solve-btn')
const areas = document.getElementsByClassName('area')
const incBtn = document.getElementById('inc-btn')
const decBtn = document.getElementById('dec-btn')
let dragItem = null 
let startGame = false
const GreedyPath = TowerOfHanoiGreedyAlgorithm(Towers);
console.log(GreedyPath);
function ringListener(ringObj){
    ringObj.addEventListener('dragstart',dragStart)
    ringObj.addEventListener('dragend',dragEnd)
}
function tourListener(tourObj){
    tourObj.addEventListener('dragover',dragOver) ;
    tourObj.addEventListener('dragenter',dragEnter);
    tourObj.addEventListener('dragleave',dragLeave);
    tourObj.addEventListener('drop',Drop);
}
function initListener(){
    for(let i of rings){
        ringListener(i)
    }
    for (let j of tours){
        tourListener(j)
    }
}
incBtn.addEventListener('click',addRing)
decBtn.addEventListener('click',removeRing)
solveBtn.addEventListener('click',solve)
//Listener Event
function dragStart(){
    if(this === tours[0].children[0] || this === tours[1].children[0] ||this === tours[2].children[0])
    {
        console.log('ok move it');
        dragItem = this;
        setTimeout(()=>this.style.display ='none',0);
    }
    
}
function dragEnd(){
    
    // console.log(this);
    setTimeout(()=>this.style.display ='block',0);
    dragItem = null;
}
function checkEndGame(){
    // console.log(Number(numRing.innerText));
    // console.log(tours[2])
    let getGoal= true;
        for (let i = 0 ; i < tours[2].children.length -1 ; i++)
        {
            let firstEl = tours[2].children[i].style.width;
            firstEl = Number(firstEl.substring(0,firstEl.length-2))
            let secoundEl = tours[2].children[i+1].style.width;
            secoundEl = Number(secoundEl.substring(0,secoundEl.length-2))
            // console.log('firstEl------------------',firstEl);
            // console.log('secoundEl',secoundEl);
            if(firstEl > secoundEl)
            {
                getGoal=false;
                break;
            }
        }
        if(getGoal && tours[2].children.length === Number(numRing.innerText)) workStatus.innerHTML="Congratulation we get a Goal"
}
function Drop(){
    let correctMove = true;
    if(dragItem == null)
    {
        correctMove=false;
    }
    else if(this.children.length>0){
        let firstEl = dragItem.style.width;
        firstEl = Number(firstEl.substring(0,firstEl.length-2))
        let secoundEl = this.children[0].style.width
        secoundEl = Number(secoundEl.substring(0,secoundEl.length-2))
        console.log('firstEl',firstEl);
        console.log('secoundEl',secoundEl);
        if(firstEl > secoundEl)
        {
            correctMove=false
        }
    }
    if(correctMove){
    this.prepend(dragItem) ;
    startGame = true;
    movesNum.innerText = Number(movesNum.innerText)+1
    workStatus.innerHTML='Move one Ring'
    }
    else{
        console.log('filed move not in the top');
        workStatus.innerHTML="Not correct move"
    }
    checkEndGame()
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.style.border = '2px dotted red'
}
function dragLeave(){
    this.style.border = 'none'
}
//End Listener Event

// ************
function initRing(){

    rings[0].style.width ="35px"
    rings[1].style.width ="70px"
    rings[2].style.width ="105px"
}
function addRing()
{
    if (numRing.innerText < 6 )
    {
        if(!startGame){
        numRing.innerText++;
        workStatus.innerHTML='add new Ring'
        let tmp = rings[2].cloneNode(true)
        ringListener(tmp);
        if(numRing.innerText == 4 )
        {
            tmp.style.width="140px"
        }
        else if(numRing.innerText == 5 )
        {
            tmp.style.width="175px"
        }
        else if(numRing.innerText == 6 )
        {
            tmp.style.width="210px"
        }
        
        tours[0].append(tmp)
        }
        else{
            workStatus.innerHTML="Game already started we can't add new ring"
        }
        
    }
    else{
        workStatus.innerHTML='maximum num of Ring 6'
    }
    
}

function removeRing(){
    if (numRing.innerText >= 4 )
    {
        if(!startGame){
        numRing.innerText--;
        workStatus.innerHTML='remove Ring'
        let lastElementFirstTour = tours[0].children[tours[0].children.length-1]
        lastElementFirstTour.remove()
        }else{
            workStatus.innerHTML="Game already started we can't remove ring"
        }
    }
    else{
        workStatus.innerHTML='minimum num of Ring 3'
    }
}

function moveRing(tourStart,tourEnd){
    let node = tours[tourStart].children[0]
    // setTimeout(()=>node.style.display ='none',0);
    
    setTimeout(()=>{
        node.style.display ='none'
        areas[tourStart].append(node)
        node.style.display ='block'
    },500)
    // setTimeout(()=>node.style.display ='block',500);
    
    // setTimeout(()=>this.style.display ='block',0);
    setTimeout(()=>{
        node.style.display ='none'
        areas[tourEnd].append(node)
        node.style.display ='block'
    },1000)

    setTimeout(()=>{
        node.style.display ='none'
        tours[tourEnd].prepend(node)
        node.style.display ='block'
    },1500)
}

function solve(){
    
    let sol = TowerOfHanoiGreedyAlgorithm(Towers)
    console.log("Solution", sol);
    let from
    let to
    // 
    for(let i =0 ;i<sol.length ;i++){
        console.log(sol[i]);
    }
    // 
    for(let i =0 ;i<sol.length - 1 ;i++){
        // console.log("+++++++++++++++++++++++++++++");
        // console.log(sol[i][0].length,"+",sol[i][1].length,"+",sol[i][2].length)
        // console.log(sol[i+1][0].length,"+",sol[i+1][1].length,"+",sol[i+1][2].length)
        // console.log(sol[i][0].length - sol[i+1][0].length,"+",sol[i][1].length - sol[i+1][1].length,"+",sol[i][2].length - sol[i+1][2].length)
        // // 1 from ==== -1 to
        setTimeout(()=>{
        for (let j=0 ; j< 3 ; j++){
            if( sol[i][j].length - sol[i+1][j].length === 1 ){
                from = j
            }
            else if(sol[i][j].length - sol[i+1][j].length === -1)
            {
                to = j 
            }
        }
        // console.log("+++++++++++++++++++++++++++++");

        // break
        console.log(from,"-->",to)
        moveRing(from,to)
    },1500*i)
        
        // setTimeout(()=>{moveRing(from,to)},1500*i)
        
    }
    
    
}
// ****************************************************** main Execute ****************************************//
initListener()
initRing()
