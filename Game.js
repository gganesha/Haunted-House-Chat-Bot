const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    TRYAGAIN: Symbol("y"),
    LIVE: Symbol("live"),
    LOOK: Symbol("look"),
    SING: Symbol("sing"),
    DOOR1: Symbol("6"),
    LEFT: Symbol("left"),
    IGNORE: Symbol("ignore"),
    END: Symbol("n")
});

//total amount of lives
let lifeCounter = 3;

export default class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
    }

    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "You are trapped in the 'Haunted House of Waterloo' and have 3 LIVES to get out of the house before you fall into the depths of HELL, so do you want to [LIVE] OR [DIE]?";
                this.stateCur = GameState.LIVE;
                break;
            case GameState.TRYAGAIN:
                //counter case which reduces when you don't get a question right  
                lifeCounter-=1;
                //left it as sInput.match(y), so user can input 'yes', 'ye', 'y'
                if(sInput.toLowerCase().match("y") && lifeCounter > 0){
                    sReply = "Lives Remaining: " + lifeCounter + ". You want to [LIVE] or [DIE]?";
                    this.stateCur = GameState.LIVE;
                } else if(sInput.toLowerCase().match("y") && lifeCounter === 0){
                    sReply = "You have 0 lives remaining: GAME OVER!";
                    this.stateCur = GameState.END;
                } 
                else {
                    sReply = "GAME OVER! LOSER! SAY HI TO SATAN!";
                    this.stateCur = GameState.END;
                }
                break;
            case GameState.LIVE:
                if(sInput.toLowerCase().match("live")){
                    sReply = "Great! Now, walk up to the door, you will hear a dog in the other room, do you: [LOOK] OR [SIT DOWN]?";
                    this.stateCur = GameState.LOOK;
                }else if (sInput.toLowerCase().match("die")){
                    sReply ="You have died! Try again? [Yes or No]";
                    this.stateCur = GameState.TRYAGAIN;
                }
                break;
            case GameState.LOOK:
                if(sInput.toLowerCase().match("look")){
                    sReply = "You see a big dog! Do you [PLAY DEAD], [STAY STILL], [SING] OR [DANCE]";
                    this.stateCur = GameState.SING;
                }else{
                    sReply = "You died of starvation! Try again? [Yes or No]";
                    this.stateCur = GameState.TRYAGAIN;
                }
                break;
            case GameState.SING:
                if(sInput.toLowerCase().match("sing")){
                    sReply = "The dog fell asleep. The door to the next room is locked. Guess what number it is? (1-10)";
                    this.stateCur = GameState.DOOR1;
                }else{
                    sReply = "The dog got angry and chewed you to death! Try again? [Yes or No]";
                    this.stateCur = GameState.TRYAGAIN;
                }
                break;
            case GameState.DOOR1:
                if(sInput.toLowerCase().match("6")){
                    sReply = "The door opened and there are 3 corridors, choose 1: [LEFT], [MIDDLE] OR [RIGHT]";
                    this.stateCur = GameState.LEFT;
                }else{
                    sReply = "The dog woke up before you could unlock the code and began to chew you to death! Try again? [Yes or No]";
                    this.stateCur = GameState.TRYAGAIN;
                }
                break;
            case GameState.LEFT:
                if(sInput.toLowerCase().match("left")){
                    sReply = "You walk into the room, you see Frankenstein on a stretcher. Do you [REVIVE HIM] or [IGNORE IT]?";
                    this.stateCur = GameState.IGNORE;
                } else {
                    sReply = "When you walked through the door, you fell down a trap hole. Try again? [Yes or No]";
                    this.stateCur = GameState.TRYAGAIN;
                }
                break;
            case GameState.IGNORE:
                if(sInput.toLowerCase().match("ignore")){
                    sReply = "YOU WON! You were able to get through the 'Haunted House of Waterloo' ALIVE.";
                } else {
                    sReply = "By reviving Frankenstein, he became hungry and ate you. Smart move. Try again? [Yes or No]";
                    this.stateCur = GameState.TRYAGAIN;
                }
                break;
            case GameState.END:
                //left it as sInput.match(n), so user can input 'nah', 'no', 'n'
                if(sInput.toLowerCase().match("n")){
                sReply = "GAME OVER! LOSER! SAY HI TO SATAN!";  
                } 
                break;
        }
        return([sReply]);
    }
}