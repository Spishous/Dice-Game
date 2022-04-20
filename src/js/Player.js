class Player{
    DOM;
    name;
    roundScore=0;
    globalScore=0;
    constructor(playerContent) {
        this.DOM=playerContent;
        this.name=this.DOM.querySelector('.namePlayer').innerText;
    }
    updateDom(){
        this.getDOM().querySelector('.roundScore').innerText=this.roundScore;
        this.getDOM().querySelector('.globalScore').innerText=this.globalScore;
    }
    addRound(value){
        this.roundScore+=value;
        this.updateDom();
    }
    looseRound(){
        this.roundScore=0;
        this.updateDom();
    }
    roundToGlobal(){
        this.globalScore+=this.roundScore;
        this.roundScore=0;
        this.updateDom();
        return this.globalScore;
    }
    resetScore(){
        this.roundScore=0;
        this.globalScore=0;
        this.updateDom();
    }
    getName(){
        return this.name;
    }
    getDOM(){
        return this.DOM;
    }
    saveData(){
        let data={
            globalScore:this.globalScore,
            roundScore:this.roundScore
        }
        localStorage.setItem(this.getName(),JSON.stringify(data));
    }
    loadData(){
        let data=JSON.parse(localStorage.getItem(this.getName()));
        if(data){
            try{
                this.globalScore=data.globalScore;
                this.roundScore=data.roundScore;
                this.updateDom();
            }catch (e) {console.log(e)}
        }

    }
}
