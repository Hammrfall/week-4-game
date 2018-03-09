//Global variables
var stateOfGame = 1;
/* values of StateofGame:
1 = player character needs to be selected
2 = opponent character needs to be selected
3=combat
4= player defeated
5= player won
*/
var playerCharacter;
var opponentCharacter;
var opponentsDefeated = 0;
var LevelValue = 2;

function Character() {
    this.id = "";
    this.name = "";
    this.imgRef = "";
    this.classes = "";
    this.maxHitPoints = 0;
    this.currentHitPoints = 0;
    this.level = 0;
    this.attackDice = 0;

    this.takeDamage = function (amount) {
        this.currentHitPoints -= amount;
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
luke.attackDice = 28;

var obiWan = new Character;
obiWan.id = "obi-wan";
obiWan.name = "Obi-Wan Kenobi";
obiWan.imgRef = "assets/images/ObiWanKenobi.png";
obiWan.classes = "character";
obiWan.maxHitPoints = 120;
obiWan.currentHitPoints = obiWan.maxHitPoints;
obiWan.level = 0;
obiWan.attackDice = 20;

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
maul.attackDice = 6;

$(document).ready(function () {
    $("#battlereport").html("Select your character: ");
    $("#playercontainer").hide();
    $("#opponentcontainer").hide();
});

function addCharacter(CharacterObject, AreaId) {
    var holder = document.createElement("div");
    $(holder).attr("id", CharacterObject.id);
    $(holder).addClass("character");
    $(holder).html("<img src=" + CharacterObject.imgRef + " alt=" + CharacterObject.name + " />");

    var nextHolder = document.createElement("div");
    $(nextHolder).addClass("hitpoints hitpointscombat");
    $(nextHolder).html('<h5>' + CharacterObject.name + '</h5><br>' + "<h5>Hit points:");

    var nextNextHolder = document.createElement("span")
    $(nextNextHolder).attr("id", CharacterObject.id);
    $(nextNextHolder).addClass("badge badge-secondary subtitle " + CharacterObject.id + "currenthitpoints")
    $(nextNextHolder).html("<h5>" + CharacterObject.currentHitPoints + "</h5>");

    $(nextHolder).append(nextNextHolder);
    $(holder).append(nextHolder);
    $("#" + AreaId).append(holder);
}

function rollDice(D) { //generates and returns a random number from 1 to D
    var diceRoll = Math.floor(Math.random() * D) + 1;
    return diceRoll;
}

$(".character").click(function () { /*captures when a character is clicked */
    switch (stateOfGame) {
        case 1: //selecting playerCharacter
            switch (this.id) {
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
            $("#playercontainer").fadeIn();
            addCharacter(playerCharacter, "playercontainer");
            stateOfGame = 2;
            $("#battlereport").html("Select an opponent: ");
            break;

        case 2: //selecting opponentCharacter
            if (this.id !== playerCharacter.id) {
                switch (this.id) {
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
                if (opponentsDefeated >= 2) {
                    $("#startcontainer").fadeOut()
                }
                $("#opponentcontainer").fadeIn();
                addCharacter(opponentCharacter, "opponentcontainer");
                stateOfGame = 3; //go to combat mode
                $("#battlereport").html("Ready for combat!");
                break;
            }
    }
});

$("#attack").click(function () { // Captures the user clicking the attack button
    if (stateOfGame === 3) {
        var myElement = document.getElementById("combat");
        myElement.play(); //plays lightsaber noise
        var playerDamage = rollDice(opponentCharacter.attackDice);
        var opponentDamage = (LevelValue * playerCharacter.level) + rollDice(playerCharacter.attackDice);
        playerCharacter.takeDamage(playerDamage);
        opponentCharacter.takeDamage(opponentDamage);
        playerCharacter.level++; //'<h5>' + CharacterObject.currentHitPoints + '</h5>
        $("." + playerCharacter.id + "currenthitpoints").html('<h5>' + playerCharacter.currentHitPoints + '</h5>');
        $("." + opponentCharacter.id + "currenthitpoints").html('<h5>' + opponentCharacter.currentHitPoints + '</h5>');
        $("#battlereport").html('<p>Battle report:</p> You received ' + playerDamage + ' damage. <br><br><p> Your opponent received ' + opponentDamage + '.');
        if (playerCharacter.currentHitPoints <= 0) {
            stateOfGame = 4;
            $("#battlereport").html("You have been defeated");
        } else if (opponentCharacter.currentHitPoints <= 0) {
            $("#opponentcontainer").hide();
            $("#" + opponentCharacter.id).remove();
            opponentsDefeated++;
            if (opponentsDefeated === 3) {
                stateOfGame = 5;
                $("#battlereport").html("You won!");
            } else {
                $("#opponentcontainer").hide();
                $("#battlereport").append("<p> and you have defeated " + opponentCharacter.name + "!</p>");
                stateOfGame = 2;
            }
        }
    } else if (stateOfGame === 2) {
        $("#battlereport").html("Select an opponent: ");
    }
});

$("#reset").click(function () { // captures the user clicking the reset button
    location.reload();
});