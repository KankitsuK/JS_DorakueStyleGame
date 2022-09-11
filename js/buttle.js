///各フィールドのID取得
var explain_action = document.getElementById('info');//説明
var explain_action2 = document.getElementById('info2');//説明
var enemy_img = document.getElementById('enemy_img');//敵の画像
var fight_action = document.getElementById('fight');//たたかう
var skill_action = document.getElementById('skill');//すきる
var escape_action = document.getElementById('escape');//にげる
var fighter_hp = document.getElementById('fighter_hp');
var enemy_hp = document.getElementById('enemy_hp');

var damage;
var end_flg;
let win_count = 0;
let lose_count = 0;
let buttle_count = 0;

/*-----キャラ生成-----*/
//コンストラクタ
class Make_character{
    constructor(name,hp){
        this.name = name;
        this.hp = hp;
        return [name,hp];
    };
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
    enemy_hp.textContent='HP:'+ enemy[1];
}
//プレイヤーキャラの生成
function make_player(){
    player = new Make_character("勇者",200);
    fighter_hp.textContent='HP:'+ player[1];
}

make_enemy();
make_player();

/*-----たたかう-----*/
//クリックしたとき
fight_action.addEventListener("click", function(){
    //ゲームの全体管理関数を呼び出す
    buttle_action_controller('attack');

    //終わりならゲーム終了させる
    if(end_flg[0]){
        game_end(end_flg[1]);
    }

  });
//カーソルを合わせた時
fight_action.addEventListener("mouseover", function(){
    text = explain_action.textContent;
    explain_action.textContent='相手に[固定]ダメージ:20';
    });

/*----- [すきる]に関する処理 -----*/
//クリックしたとき
skill_action.addEventListener("click", function(){
    buttle_action_controller('skill');
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
    game_end();
});

//ダメージ計算
function attack(attack_method){
    //こうげき
    if(attack_method == 'attack'){
        return 20;
    //すきる
    }else if(attack_method == 'skill') {
        skill_damage = Math.floor(Math.random() * (35 - 15) + 15);
        return skill_damage;
    }else if(attack_method == 'enemy'){
        skill_damage = Math.floor(Math.random() * (45 - 15) + 15);
        return skill_damage;
    }else{
        console.error("不正な値が入力されています");
    }
}

//勝敗判定
function check_buttle(){
    //通常時
    if(enemy[1] > 0 && player[1] > 0){
        return [false, 'continue'];
    //相打ち時、プレイヤーのHPを1にして戦闘勝利
    }else if(enemy[1] <= 0 && player[1] <= 0){
        player[1] = 1;
        enemy[1] = 0;
        return [true, 'narrow_victory'];
    //勝ち
    }else if(enemy[1] <= 0){
        enemy[1] = 0;
        return [true, 'win'];
    //負け
    }else if(player[1] <= 0 || player[1] == 0){
        player[1] = 0;
        return [true, 'lose'];
    }
}

//表示の更新(戦闘続行)
function update_content_continue(chara1,chara2,dm1,dm2,flg){
    text = '<p id="info">' + chara1 + 'は' +chara2+ 'に' +dm1+ 'のダメージをあたえた！<br>' +chara2+ 'から' +dm2+ 'のダメージを受けた</p>';
    explain_action.innerHTML = text;
    enemy_hp.textContent = 'HP: ' + enemy[1];
    fighter_hp.textContent = 'HP: ' + player[1]
};

//表示の更新
function update_content_end(chara1,chara2,dm1,dm2,flg){
    if(flg == 'win'){
        explain_action.innerHTML = '<p id="info">' + chara1 + 'は' +chara2+'に' +dm1+ 'のダメージをあたえた！<br>' +chara2+ 'は倒れた</p>';
        enemy_hp.textContent = 'HP: ' + enemy[1];
        fighter_hp.textContent = 'HP: ' + player[1]
    }else if(flg == 'narrow_victory'){
        explain_action.innerHTML = '<p id="info">' + chara1 + 'は' +chara2+'に' +dm1+ 'のダメージをあたえた！<br>' +chara2+ 'から' +dm2+ 'のダメージを受けたが、持ちこたえた！<br>'+chara2+'は倒れた</p>';
        enemy_hp.textContent = 'HP: ' + enemy[1];
        fighter_hp.textContent = 'HP: ' + player[1]
    }else if(flg == 'lose'){
        explain_action.innerHTML = '<p id="info">' + chara1 + 'は' +chara2+'に' +dm1+ 'のダメージをあたえた！<br>' +chara2+ 'から' +dm2+ 'のダメージを受けた<br>'+chara1+'は倒れた……</p>';
        enemy_hp.textContent = 'HP: ' + enemy[1];
        fighter_hp.textContent = 'HP: ' + player[1]
    }
}

/*----- ゲームを終了する -----*/
function game_end(flg){
    //勝ったとき
    if(flg == 'win' || flg == 'narrow_victory'){
        window.alert(player[0] + 'よ、よくやった！ 厄介な魔物を倒したぞ');
    }else if (flg == 'lose') {
        window.alert('おお' +player[0]+ '！しんでしまうとはなさけない…。もう一度戦いなさい');
    } else {
        flag = window.confirm("ゲームを終了しますか？");
        if ( flag ){
            //OKならトップページに戻る
            window.location.href = 'top_page.html';
        }else{
            //なにもしない
        }
    }
}

//ゲーム全体の管理
function buttle_action_controller(click){
    //ダメージ計算(敵側)
    eDamage = attack(click);
    enemy[1]-=eDamage;

    //ダメージ計算(プレイヤー)  ※end_flgがtrueの場合、HP表示を行いゲーム終了
    pDamage = attack(click);
    player[1]-=pDamage;

    //勝敗判定と表示更新
    end_flg = check_buttle();
    if(end_flg[0] == false){
        //HP表示更新
        update_content_continue(player[0],enemy[0],eDamage,pDamage,end_flg);
    }else {
        update_content_end(player[0],enemy[0],eDamage,pDamage,end_flg[1]);
    }
}
