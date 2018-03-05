
$(document).ready(function() {

//Global variables
var stateOfGame = 0;
var playerCharacter;
var opponentCharacter;
/* values of StateofGame
 0 = beginning/ reset
1 = player character selected
2 = opponent character selected
3=combat
4= opponent defeated
5= player defeated

*/

// defines character object
var character = {
    id: "",
    name: "",
    imgRef: "",
    classes: "",
    maxHitPoints: 0,
    currentHitPoints: 0,
    level: 0,
    attackDice: 0,

    takeDamage(amount) {
        this.currentHitPoints -= amount;
    },
    isDefeated() {
        var answer = false;
        if (this.currentHitPoints <= 0) {answer = true;}
        return answer;
    },
} 

var luke = new character;
    luke.id = "luke";
    luke.name = "Luke Skywalker";
    luke.imgRef = "assets/images/Luke.png";
    luke.classes = "character";
    luke.maxHitPoints = 100;
    luke.currentHitPoints = this.maxHitPoints;
    luke.level = 0;
    luke.attackDice = 20;

var obiWan = new character;
    obiWan.id = "obi-wan";
    obiWan.name = "Obi-Wan Kenobi";
    obiWan.imgRef = "assets/images/ObiWanKenobi.png";
    obiWan.classes = "character";
    obiWan.maxHitPoints = 120;
    obiWan.currentHitPoints = this.maxHitPoints;
    obiWan.level = 0;
    obiWan.attackDice = 16;

var sidious = new character;
    sidious.id = "sidious";
    sidious.name = "Darth Sidious";
    sidious.imgRef = "assets/images/emperor.png";
    sidious.classes = "character";
    sidious.maxHitPoints = 150;
    sidious.currentHitPoints = this.maxHitPoints;
    sidious.level = 0;
    sidious.attackDice = 12;

var maul = new character;
maul.id = "maul";
maul.name = "Darth Maul";
maul.imgRef = "assets/images/darth-maul.png";
maul.classes = "character";
maul.maxHitPoints = 180;
maul.currentHitPoints = this.maxHitPoints;
maul.level = 0;
maul.attackDice = 8;

});

function addCharacter(CharacterObject, AreaId){

var holder = document.createElement("div");
$(holder).attr("id".characterobject.id);
$("#" + AreaId).append(holder);

// Output a word
$(holder).attr("id", colors[i]).text(colors[i]);

}

function removecharacter(Area){

}

function upDateHitPoints(id){

}

function resetCombatDamage(CharacterToReset){
    CharacterToReset.currentHitPoints = CharacterToReset.maxHitPoints;
    CharacterToReset.level = 0;
}

//generates and returns a random number from 1 to D
function rollDice(D){
    var diceRoll = Math.floor(Math.random() * D) + 1;
    return diceRoll;
}

//fills upper row
function populateCharacterChoices(){

}


function engageInCombat(){



}




/*captures when a character is clicked */
$(".character").click (function() {
switch (stateOfGame) {
   case 1: //selecting playerCharacter

        break;

   case 2: //selecting opponentCharacter
   
        break;

    case 3: //in combat mode
        // do nothing
        break;

    case 4: // opponent defeated

        break;
    case 5: // player defeated

        break;
}


}); 

// Captures the user clicking the attack button
$("#attack").click (function() {



});

// captures the user clicking the reset button
$("#reset").click(function() {



});