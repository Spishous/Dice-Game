class Game{
    dice=document.getElementById('dice');
    tour=0;
    currentIdPlayer=0;
    waitingAction=false;
    winLimit=5;
    players=[];
    enableSaveGame=false;
    constructor() {
        document.querySelectorAll('.player-content').forEach((e)=>{
            this.addPlayer(e);
        })
    }
    addPlayer(playerContent){
        let player=new Player(playerContent);
        this.players.push(player);
    }
    restartGame(){
        this.currentIdPlayer=0;
        this.tour=0;
        for(let player of this.players){
            player.resetScore();
        }
        this.startGame();
        this.saveGame();
    }
    startGame(){
        this.setWaitingAction(false);
        this.startTour();
        this.didIWin();
    }
    startTour(){
        document.body.classList.remove('end-game');
        this.hidePopup();
        this.setWaitingAction(true);
        document.querySelectorAll(".player-content").forEach((e)=>{e.classList.remove('currentTour')})
        this.getCurrentPlayer().getDOM().classList.add('currentTour');

    }
    nextTour(){
        this.tour++;
        this.currentIdPlayer++;
        this.currentIdPlayer=(this.currentIdPlayer%this.players.length);
        this.startTour();
    }
    getCurrentPlayer(){
        return this.players[this.currentIdPlayer];
    }
    rollDice(){
        this.setWaitingAction(false);
        let value;
        this.dice.classList.remove('animate')
        this.dice.offsetHeight;
        this.dice.classList.add('animate');
        let interval=setInterval(()=>{
            value=Math.ceil(Math.random()*6);
            this.dice.setAttribute('number',value);
        },50)
        setTimeout(()=>{
            clearInterval(interval);
            setTimeout(()=>{
                if(value!==1){
                    this.getCurrentPlayer().addRound(value);
                    this.startTour();
                }else{
                    this.getCurrentPlayer().looseRound();
                    this.nextTour();
                }
                if(this.enableSaveGame){
                    this.saveGame();
                }
            },200)
        },600)
    }
    hold(){
        if(!this.didIWin()){
            this.nextTour();
        }
        if(this.enableSaveGame){
            this.saveGame();
        }
    }
    didIWin(){
        let bool=this.getCurrentPlayer().roundToGlobal()>=this.winLimit
        if(bool){
            let namePlayer=this.getCurrentPlayer().getName();
            this.showPopup(namePlayer);
            this.endGame();
        }
        return bool
    }
    setWaitingAction(bool){
        this.waitingAction=bool;
        if(bool){
            document.querySelector('.command-content').classList.remove('waiting');
        }else{
            document.querySelector('.command-content').classList.add('waiting');
        }
    }
    inWaitingAction(){
        return this.waitingAction;
    }
    showPopup(win){
        let popup=document.getElementById("popup");
        if(!popup){
            let popupHTML="<div id='popup'><span>WIN</span><div id='name'></div></div>";
            document.body.insertAdjacentHTML('beforeend',popupHTML);
            popup=document.getElementById("popup");
        }
        popup.querySelector('#name').innerText=win;
        setTimeout(()=>{popup.classList.add('show');},10);
    }
    setWinLimit(limit){
        this.winLimit=limit;
    }
    endGame(){
        document.body.classList.add('end-game');
        this.setWaitingAction(true);
    }
    hidePopup(){
        let popup=document.getElementById("popup");
        if(popup){
            popup.classList.remove('show');
        }
    }
    saveGame(){
        for(let player of this.players){
            player.saveData();
        }
        localStorage.setItem('game',JSON.stringify({
            tour:this.tour,
            currentIdPlayer:this.currentIdPlayer
        }))
    }
    loadGame(){
        for(let player of this.players){
            player.loadData();
        }
        let data=JSON.parse(localStorage.getItem('game'));
        try{
            this.tour=data.tour;
            this.currentIdPlayer=data.currentIdPlayer;
        }catch (e) {console.log(e)}
    }
    setEnableSaveGame(bool=true){
        this.enableSaveGame=bool;
    }
}
