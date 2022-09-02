//htmlの取得
const new_character = document.getElementById('start');

player_hp = 0;
player_Name = '';

enemy_hp = 0;
enemy_Name = '';

// function restart(){
//     window.location.href = 'index.html'
// }

//初めからを選んだ場合、新しくキャラを作成する。
new_character.addEventListener("click",function(){
    var player = make_character('勇者',150);
});

function make_character(name,hp){
    var character_status  = [];
    character_status.push(name);
    character_status.push(hp);
    return (character_status);
}
