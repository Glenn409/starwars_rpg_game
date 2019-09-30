//created toosn with random stats;
var obi = createChar('obi-wan','Obi-Wan Kenobi',120,randomAP(),randomCP(),'/assets/images/obi2.jpg');
var luke = createChar('skywalker','Luke Skywalker',100,randomAP(),randomCP(),'/assets/images/Skywalker-1.jpg');
var sidious = createChar('darth_sidious','Darth Sidious',150,randomAP(),randomCP(),'/assets/images/sidious.jpg');
var maul = createChar('darth_maul', 'Darth Maul',180, randomAP(), randomCP(),'/assets/images/maul.jpg');
//create arrays for controlling the flow of the game
var your_char = [];
var char_array = [obi,luke,sidious,maul];
var fighting_char = [];
//prevents user from clicking to have more than one active enemy;
var continue_status = true;

// function create a char
function createChar(title,display_name,hp,ap,cap,image){
    obj = {
        name: title,
        display: display_name,
        health_points: hp,
        attack_power: ap,
        counter_attack_power: cap,
        img: image
    }
    return obj;
};

//creates a random attack power for unit from;
function randomAP(){
    return Math.floor(Math.random()*8) + 4;
}
//creates random Counter Power for unit;
function randomCP(){
    return Math.floor(Math.random()*21) + 3;
}

//function update char_selection
function update_char(){
    var char = your_char[0];
    $('.start_charBox').remove();
    $('.char_selection').append(
        `<div class="start_charBox main-char" id="${char.name}">
            <div>${char.display}</div>
            <img src=${char.img}>
            <div>Current Health Points: ${char.health_points}</div>
            <div>Current Attack Power:  ${char.attack_power}</div>
        </div> `
    )
}
//removes enemy from waiting list to the fight
function move_enemy_to_fight(enemy){
    if(continue_status === false){
    } else if (continue_status === true){
        for(i=0;i < char_array.length;i++){
            if(char_array[i].name === enemy){
                fighting_char.push(char_array[i]);
                char_array.splice(i,1);
            }
        }
        continue_status = false;
    }
    update_fight_row();
    $('.fight_stats').text('');
}
//update fight_row
function update_fight_row(){
    $('.fight_row').text('');
    $('.fight_row').append(
        `<div>
            <button class='button'>Attack</button>
            <div>${fighting_char[0].display}</div>
            <img class='fightIMG' src=${fighting_char[0].img}>
            <p>HP: ${fighting_char[0].health_points}</p>
         </div>`
        )
}
//creates enemies and updates choices
function update_enemies(){
        $('.enemies_selection').text('');
        for(i=0;i<char_array.length;i++){
            console.log(char_array[i]);
            $('.enemies_selection').append(
                `<div class="enemiesBox" id="${char_array[i].name}">
                    <h1>${char_array[i].display}</h1>
                    <img class='enemieIMG' src=${char_array[i].img}>
                    <p>HP: ${char_array[i].health_points}</p>
                </div>`
            )
        }
    }

//simulates the fight
function fight(){
    fighting_char[0].health_points -= your_char[0].attack_power;

    if(fighting_char[0].health_points > 0){
        $('.fight_stats').text('');
        $('.fight_stats').append(
            `<div>You attacked for ${your_char[0].attack_power} this round!</div>
             <div>${fighting_char[0].display} counter attacked you for ${fighting_char[0].counter_attack_power}!`
        )
        your_char[0].health_points -= fighting_char[0].counter_attack_power;
        your_char[0].attack_power += 8;

        if(your_char[0].health_points <= 0){
            alert('You have Lost, Game Restarting!');
            endGame();
        } else {
            update_fight_row();
            update_char();
        }

        
    } else if (fighting_char[0].health_points <= 0){
        $('.fight_stats').text('');
        $('.fight_stats').append(
            `<div>You have defeated ${fighting_char[0].display} this round!</div>
             <div>Pick a new Target!</div>!`
        )
        update_fight_row();
        your_char[0].attack_power += 8;
        continue_status=true;
        fighting_char.pop();
        update_char();
        if(char_array.length === 0){
            alert('You have Won the game! Game Restarting!')
            endGame();
        }
    }
}
//simulates end game and restarts it for user
function endGame(){
     obi = createChar('obi-wan','Obi-Wan Kenobi',120,randomAP(),randomCP(),'/assets/images/obi2.jpg');
     luke = createChar('skywalker','Luke Skywalker',100,randomAP(),randomCP(),'/assets/images/Skywalker-1.jpg');
     sidious = createChar('darth_sidious','Darth Sidious',150,randomAP(),randomCP(),'/assets/images/sidious.jpg');
     maul = createChar('darth_maul', 'Darth Maul',180, randomAP(), randomCP(),'/assets/images/maul.jpg');
    
    your_char = [];
    char_array = [obi,luke,sidious,maul];
    fighting_char = [];
    
    continue_status = true;

    $('.char_selection').text('');
    $('.enemies_selection').text('');
    $('.fight_row').text('');
    $('.fight_stats').text('');

    $('.char_selection').append(
        `<div class="start_charBox" id='obi-wan'>
            <h1>Obi-Wan Kenobi</h1>
            <img src='assets/images/obi2.jpg'>
            <p class='hp'>120</p>
         </div>
         <div class="start_charBox" id='skywalker'>
            <h1>Luke skywalker</h1>
            <img src='assets/images/Skywalker-1.jpg'>
            <p class='hp'>100</p>
        </div>
        <div class="start_charBox" id='darth_sidious'>
            <h1>Dark Sidious</h1>
            <img src='assets/images/sidious.jpg'>
            <p class='hp'>150</p>
        </div>
        <div class="start_charBox" id='darth_maul'>
            <h1>Darth Maul</h1>
            <img src='assets/images/maul.jpg'>
            <p class='hp'>180</p>
        </div>`
    )
    $('#pick').text('Pick a unit!')
};

$(document).on('click','.start_charBox', function(){
    //removes onclick function after clickin main character;
    //sets main char
    $('#pick').text('');
    if(your_char.length === 1){
    } else {
        if(this.id === 'obi-wan'){
            char_array.splice(0,1);
            your_char.push(obi);
        } else if (this.id === 'skywalker'){
            char_array.splice(1,1);
            your_char.push(luke)
        } else if (this.id === 'darth_sidious'){
            char_array.splice(2,1);
            your_char.push(sidious);
        }else if( this.id === 'darth_maul'){
            char_array.splice(3,1);
            your_char.push(maul);
        }
    }
    update_char();
    update_enemies();
});

$(document).on('click', '.enemiesBox', function(){
    move_enemy_to_fight(this.id);
    update_enemies();
})

$(document).on('click','.button',function(){
    fight();
})