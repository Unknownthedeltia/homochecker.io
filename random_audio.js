// ボタン要素、結果表示要素、音量要素を取得
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const resultDiv = document.getElementById("result");
const volumeControl = document.getElementById("volumeControl");

// 音声ファイルのリストを定義
const audioFiles = ["ikimasuyo.mp3", "ikimasyone.mp3", "inmyu.mp3","koko.mp3","miseteyaruyo.mp3"
    ,"naantukareta.mp3","oigruua.mp3","soudayo.mp3","ureshiidaro.mp3","yarimasunee.mp3"];

// 現在の音声オブジェクト
let currentAudio = null;

// 「はい」ボタンがクリックされたときの処理
function onYesButtonClick() {
    resultDiv.textContent = "やっぱりホモじゃないか！！";

    // ボタンのテキストを「そうだよ」に変更
    yesButton.textContent = "そうだよ";

    // 「そうだよ」ボタンをクリックしたらランダム音声を再生
    yesButton.removeEventListener("click", onYesButtonClick); // 元のリスナーを削除
    yesButton.addEventListener("click", playRandomAudio); // ランダム音声再生リスナーを追加
}

// 「いいえ」ボタンがクリックされたときの処理
function onNoButtonClick() {
    resultDiv.textContent = "ホモは嘘つき";

    // ボタンを「はい」に戻す処理を呼び出し
    resetYesButton();
}

// ランダムな音声を再生する関数
function playRandomAudio() {
    // 音声ファイルの中からランダムに1つを選択
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const selectedAudio = audioFiles[randomIndex];

    // 既存の音声を停止
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // 新しい音声オブジェクトを作成して再生
    currentAudio = new Audio(selectedAudio);
    currentAudio.volume = volumeControl.value; // 現在の音量を設定
    currentAudio.play();

    // 結果を表示
    resultDiv.textContent = `再生中: ${selectedAudio}`;
}

// 音量を調節する関数
function adjustVolume() {
    if (currentAudio) {
        currentAudio.volume = volumeControl.value;
    }
}

// 「そうだよ」ボタンを「はい」に戻す関数
function resetYesButton() {
    // ボタンのテキストを「はい」に戻す
    yesButton.textContent = "はい";

    // イベントリスナーをリセット
    yesButton.removeEventListener("click", playRandomAudio); // ランダム音声再生リスナーを削除
    yesButton.addEventListener("click", onYesButtonClick); // 元のクリック処理を再追加
}

// 初期化処理
function initialize() {
    yesButton.addEventListener("click", onYesButtonClick);
    noButton.addEventListener("click", onNoButtonClick);
    volumeControl.addEventListener("input", adjustVolume); // 音量スライダー変更時に音量を調整
}

// アクセスカウンターの更新
function updateAccessCounter() {
    fetch("access_counter.php")
        .then(response => response.json())
        .then(data => {
            counterValue.textContent = data.count;
        })
        .catch(error => {
            console.error("カウンター更新エラー:", error);
            counterValue.textContent = "エラー";
        });
}

// 初期化関数を呼び出し
initialize();
