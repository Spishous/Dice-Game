let game=new Game();
game.setWinLimit(100);
game.loadGame();
game.setEnableSaveGame()
game.startGame();

function actionNewGame(){
    game.restartGame();
}
function actionRoll(){
    if(game.inWaitingAction()){
        game.rollDice();
    }
}
function actionHold(){
    if(game.inWaitingAction()){
        game.hold();
    }
}
