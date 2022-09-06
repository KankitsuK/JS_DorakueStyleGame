///各フィールドのID取得
var explain_action = document.getElementById('info');//説明
var explain_action2 = document.getElementById('info2');//説明
var enemy_img = document.getElementById('enemy_img');//敵の画像
var fight_action = document.getElementById('fight');//たたかう
var skill_action = document.getElementById('skill');//すきる
var escape_action = document.getElementById('escape');//にげる
var fighter_hp = document.getElementById('fighter_hp');
var enemy_hp = document.getElementById('enemy_hp');

var cnd = [0,0];
var ene_cnd = [0,0];
var condition;
var my_condition;
var end_flg = false;
let win_count = 0;
let lose_count = 0;
let buttle_count = 0;

/*-----キャラ生成-----*/
//コンストラクタ
class Make_character{
    constructor(name,hp){
        this.name = name;
        this.hp = hp;
    }
}
//敵の生成
function make_enemy(){
    //敵の画像生成
    img_no = Math.floor(Math.random() * (6 - 1) + 1);
    img = ["enemy01.png","enemy02.png","enemy03.png","enemy04.png","enemy05.png","enemy06.png"];
    enemy_name = ["こうもり","ぷよスラ","シーツおばけ","ひのたま","パリピくらげ","ねこへいし"]
    enemy_img.src = "img/" + img[img_no];
    //敵のHP、名前で敵を生成する
    hp_num = Math.floor(Math.random() * (150 - 100) + 100);
    enemy = new Make_character(enemy_name[img_no],hp_num);
    enemy_hp.textContent='HP:'+ enemy.hp;
    e_hp = enemy.hp;
}
function make_player(){
    //プレイヤーキャラの生成
    player = new Make_character("勇者",200);
    fighter_hp.textContent='HP:'+ player.hp;
    f_hp = player.hp;
}
//つくる
make_enemy();
make_player();

/*----- [たたかう]に関する処理 -----*/
//クリックしたとき
fight_action.addEventListener("click", function(){
    condition = attack(e_hp);
    e_hp = condition[0];
    my_condition = enemy_attack(f_hp);
    f_hp = my_condition[0];

    //プレイヤーのたたかう処理
    if(e_hp>0 && f_hp>0){
        enemy_hp.textContent='HP:'+ e_hp;
        fighter_hp.textContent='HP:'+f_hp;
        explain_action.innerHTML  = '<p id="info">' + condition[1] + 'のダメージをあたえた！<br>' + my_condition[1] + 'のダメージを受けた</p>';
    }else if(f_hp<=0 && e_hp<=0){
        explain_action.innerHTML  = condition[1] + 'のダメージをあたえた！<br>' + my_condition[1] + 'のダメージを受けた<br>ギリギリのところで持ちこたえた……!</p>';
        enemy_hp.textContent='倒した！';
        fighter_hp.textContent='HP:1';
        win_count += 1;
    }else if(f_hp<0){
        fighter_hp.textContent='倒された……';
        lose_count += 1
    }else{
        enemy_hp.textContent='倒した！';
        win_count += 1;
    }
    console.log('win: '+win_count);
    console.log('lose: '+lose_count);
    console.log(buttle_count);
    console.log(enemy);
  });
//カーソルを合わせた時
fight_action.addEventListener("mouseover", function(){
    explain_action.textContent='相手に[固定]ダメージ:20';
    });


/*----- [すきる]に関する処理 -----*/
//クリックしたとき
skill_action.addEventListener("click", function(){
    condition = skill(e_hp);
    e_hp = condition[0];
    my_condition = enemy_attack(f_hp);
    f_hp = my_condition[0];

    //通常時
    if(e_hp>0 && f_hp>0){
        enemy_hp.textContent='HP:'+ e_hp;
        fighter_hp.textContent='HP:'+f_hp;
        explain_action.innerHTML  = '<p id="info">' + condition[1] + 'のダメージをあたえた！<br>' + my_condition[1] + 'のダメージを受けた</p>';

    //相打ち時、プレイヤーのHPを1にして戦闘勝利
    }else if(f_hp<=0 && e_hp<=0){
        explain_action.innerHTML  =
            condition[1] + 'のダメージをあたえた！<br>'
            + my_condition[1] + 'のダメージを受けた</p><br><p id="info">ギリギリのところで持ちこたえた……!';
        explain_action2.innerHTML = '<p id="info2">敵を倒した！</p>'
        enemy_hp.textContent='倒した！';
        fighter_hp.textContent='HP:1';
        window.setTimeout(game_End('win'), 500);

    //負け
    }else if(f_hp<0){
        enemy_hp.textContent='HP:'+ e_hp;
        fighter_hp.textContent='HP:0';
        explain_action.innerHTML  = '倒された……'
        game_End_lose();

    //勝ち
    }else{
        enemy_hp.textContent='倒した！';
        window.setTimeout(game_End_win, 500);
    }

});

//カーソルを合わせた時
skill_action.addEventListener("mouseover", function(){
    explain_action.textContent='相手に[ランダム]ダメージ:15~35';
});


/*----- [にげる]に関する処理 -----*/
//カーソルを合わせた時
escape_action.addEventListener("mouseover", function(){
    explain_action.textContent='戦闘を終了する';
    });

//クリックしたとき
escape_action.addEventListener("click", function(event){
    event.stopPropagation();
    game_End();

});

/*-----戦闘管理-----*/
function action(){
    condition = skill(e_hp);
    e_hp = condition[0];
    my_condition = enemy_attack(f_hp);
    f_hp = my_condition[0];
}

/*-----戦闘終了判定-----*/
function check_buttle(){

}

/*----- [たたかう]の内部処理 -----*/
function attack(hp){
    hp = hp - 20;
    cnd[0] = hp;
    cnd[1] = 20;
    if(hp > 0){
        return cnd;
    }else{
        return cnd;
    }
};

/*----- [すきる]の内部処理 -----*/
function skill(hp){
    skill_damage = Math.floor(Math.random() * (35 - 15) + 15);
    hp = hp - skill_damage
    cnd[0] = hp;
    cnd[1] = skill_damage;
    if(hp > 0){
        return cnd;
    }else{
        return cnd;
    }
};

/*----- 敵側の内部処理 -----*/
function enemy_attack(hp){
    damage = Math.floor(Math.random() * (15 - 15) + 15);
    hp = hp - damage;
    ene_cnd[0] = hp;
    ene_cnd[1] = damage;
    if(hp > 0){
        return ene_cnd;
    }else{
        return ene_cnd;
    }
};

/*----- ゲームを終了する -----*/
//勝ったとき
function game_End_win(){
    flag = window.confirm("勇者よ、よくぞやった！");
    if ( flag == true ){
        window.location.href = 'top_page.html';
    }else{
        //なにもしない
    }
};
//負けたとき
function game_End_lose(){
    flag = window.confirm("おお、死んでしまうとはなさけない もう一度立ち上がりなさい");
    if ( flag == true ){
        window.location.href = 'top_page.html';
    }else{
        //なにもしない
    }
};
//にげる押下
function game_End(){
    flag = window.confirm("ゲームを終了しますか？");
    if ( flag == true ){
        window.location.href = 'top_page.html';
    }else{
        //なにもしない
    }
};
