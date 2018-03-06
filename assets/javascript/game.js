
//Global variables
var stateOfGame = 0;
/* values of StateofGame
 0 = beginning/ reset
1 = player character selected
2 = opponent character selected
3=combat
4= opponent defeated
5= player defeated
6= player won
*/
var stateOfGame = 1;
var playerCharacter;
var opponentCharacter;
var opponentsDefeated = 0;
var LevelValue = 10;

function Character() {
    this.id = "";
    this.name = "";
    this.imgRef =  "";
    this.classes = "";
    this.maxHitPoints= 0;
    this.currentHitPoints= 0;
    this.level= 0;
    this.attackDice= 0;

    this.takeDamage = function (amount) {
        this.currentHitPoints -= amount;
    }
    this.isDefeated = function () {
        var answer = false;
        if (this.currentHitPoints <= 0) {answer = true;}
        return answer;
    }
} 

var luke = new Character;
    luke.id = "luke";
    luke.name = "Luke Skywalker";
    luke.imgRef = "assets/images/Luke.png";
    luke.classes = "character";
    luke.maxHitPoints = 100;
    luke.currentHitPoints = luke.maxHitPoints;
    luke.level = 0;
    luke.attackDice = 20;

var obiWan = new Character;
    obiWan.id = "obi-wan";
    obiWan.name = "Obi-Wan Kenobi";
    obiWan.imgRef = "assets/images/ObiWanKenobi.png";
    obiWan.classes = "character";
    obiWan.maxHitPoints = 120;
    obiWan.currentHitPoints = obiWan.maxHitPoints;
    obiWan.level = 0;
    obiWan.attackDice = 16;

var sidious = new Character;
    sidious.id = "sidious";
    sidious.name = "Darth Sidious";
    sidious.imgRef = "assets/images/emperor.png";
    sidious.classes = "character";
    sidious.maxHitPoints = 150;
    sidious.currentHitPoints = sidious.maxHitPoints;
    sidious.level = 0;
    sidious.attackDice = 12;

var maul = new Character;
    maul.id = "maul";
    maul.name = "Darth Maul";
    maul.imgRef = "assets/images/darth-maul.png";
    maul.classes = "character";
    maul.maxHitPoints = 180;
    maul.currentHitPoints = maul.maxHitPoints;
    maul.level = 0;
    maul.attackDice = 8;


$(document).ready(function() {




});

function addCharacter(CharacterObject, AreaId){

    var holder = document.createElement("div");
    $(holder).attr("id",CharacterObject.id);
    $(holder).addClass("character");
    $(holder).html ("<img src=" + CharacterObject.imgRef + " alt=" + CharacterObject.name +" />");
    
    var nextHolder = document.createElement("div");
    $(nextHolder).addClass("hitpoints");
    $(nextHolder).html ('<h5>' + CharacterObject.name + '</h5><br>' +  "<h5>Hit points:");
    
    var nextNextHolder = document.createElement("span")
    $(nextNextHolder).attr("id",CharacterObject.id);
    $(nextNextHolder).addClass("badge badge-secondary subtitle " + CharacterObject.id  + "currenthitpoints")
    $(nextNextHolder).html ("<h5>" + CharacterObject.currentHitPoints + "</h5>");
     //<h5>Hit points<span id = "' + CharacterObject.name + '-hitpoints" class="badge badge-secondary subtitle currenthitpoints">'+ CharacterObject.currentHitPoints +'</span></h5>');
    $(nextHolder).append(nextNextHolder);
     $(holder).append(nextHolder);
    $("#" + AreaId).append(holder);
}

//generates and returns a random number from 1 to D
function rollDice(D){
    var diceRoll = Math.floor(Math.random() * D) + 1;
    return diceRoll;
}

/*captures when a character is clicked */
$(".character").click (function() {
switch (stateOfGame) {
   case 1: //selecting playerCharacter
        switch (this.id){
            case "luke":
                playerCharacter = luke;
                break;
            case "obi-wan":
                playerCharacter = obiWan;
                break;
            case "sidious":
                playerCharacter = sidious;
                break;
            case "maul":
                playerCharacter = maul;
                break;
        }
        $("#" + this.id).remove();
        console.log(playerCharacter);
        addCharacter (playerCharacter,"playercontainer");
        stateOfGame = 2;
        break;
        

   case 2: //selecting opponentCharacter
   if (this.id !== playerCharacter.id){
        switch (this.id){
            case "luke":
                opponentCharacter = luke;
                break;
            case "obi-wan":
                opponentCharacter = obiWan;
                break;
            case "sidious":
                opponentCharacter = sidious;
                break;
            case "maul":
                opponentCharacter = maul;
                break;
        }
        $("#" + this.id).remove();
        console.log(opponentCharacter);
        addCharacter (opponentCharacter,"opponentcontainer");
        stateOfGame = 3; //go to combat mode
        break;
    }

}


}); 

// Captures the user clicking the attack button
$("#attack").click (function() {
if(stateOfGame === 3){
    var playerDamage = rollDice(opponentCharacter.attackDice);
    var opponentDamage = (LevelValue * playerCharacter.level) + rollDice(playerCharacter.attackDice);
    playerCharacter.takeDamage(playerDamage);
    opponentCharacter.takeDamage(opponentDamage);
    playerCharacter.level++; //'<h5>' + CharacterObject.currentHitPoints + '</h5>
    $("." + playerCharacter.id  + "currenthitpoints").html ('<h5>' + playerCharacter.currentHitPoints + '</h5>');
    $("." + opponentCharacter.id  + "currenthitpoints").html ('<h5>' + opponentCharacter.currentHitPoints + '</h5>');
    $("#battlereport").html ('<p>Battle report:</p> You received ' + playerDamage + ' damage. <br><br><p> Your opponent received ' + opponentDamage + '.'); 
    console.log(playerCharacter);
    console.log(opponentCharacter);
    if (playerCharacter.currentHitPoints <= 0){
        stateOfGame = 5;
        $("#battlereport").html ("You have been defeated");
       // add reset button
    }
    else if (opponentCharacter.currentHitPoints <= 0) {
        $("#" + opponentCharacter.id).remove();
        opponentsDefeated++;
        if (opponentsDefeated === 3){
            StateofGame = 6;
            $("#battlereport").html ("You won!");            
        }
        else {
            stateOfGame = 2;            
        }    
        
    }

}


});

// captures the user clicking the reset button
$("#reset").click(function() {
    location.reload();
});