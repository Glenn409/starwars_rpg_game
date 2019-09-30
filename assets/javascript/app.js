//created toosn with random stats;
var obi = createChar(120,randomAP(),randomCP());
var luke = createChar(100,randomAP(),randomCP());
var sidious = createChar(150,randomAP(),randomCP());
var maul = createChar(180, randomAP(), randomCP());

var your_char = [];
var char_array = [obi,luke,sidious,maul];


// function create a char
function createChar(hp,ap,cap){
    obj = {
        health_points: hp,
        attack_power: ap,
        counter_attack_power: cap
    }
    return obj;
};

//creates a random attack power for unit from 4-11 dmg;
function randomAP(){
    return Math.floor(Math.random()*8) + 4;
}
//creates random Counter Power for unit from 5-25 dmg;
function randomCP(){
    return Math.floor(Math.random()*21) + 5;
}

//function that appends elements to a div for character selection
function selectChar(array){

}
