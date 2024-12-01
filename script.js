// ボタン要素、結果表示要素、音声選択要素を取得
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const resultDiv = document.getElementById("result");
const audioSelect = document.getElementById("audioSelect");
const volumeControl = document.getElementById("volumeControl");

// 現在の音声オブジェクト
let currentAudio = null;

// 「はい」ボタンがクリックされたときの処理
function onYesButtonClick() {
    resultDiv.textContent = "やっぱりホモじゃないか！！";

    // ボタンのテキストを「そうだよ」に変更
    yesButton.textContent = "そうだよ";

    // 「そうだよ」ボタンをクリックしたら音声を再生
    yesButton.removeEventListener("click", onYesButtonClick); // 元のリスナーを削除
    yesButton.addEventListener("click", playSelectedAudio); // 音声再生リスナーを追加
}

// 「いいえ」ボタンがクリックされたときの処理
function onNoButtonClick() {
    resultDiv.textContent = "ホモは嘘つき";

    // ボタンを「はい」に戻す処理を呼び出し
    resetYesButton();
}

// 選択された音声を再生する関数
function playSelectedAudio() {
    const selectedAudio = audioSelect.value; // ユーザーが選択した音声ファイルを取得

    // 既存の音声を停止
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // 新しい音声オブジェクトを作成して再生
    currentAudio = new Audio(selectedAudio);
    currentAudio.volume = volumeControl.value; // 現在の音量を設定
    currentAudio.play();
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
    yesButton.removeEventListener("click", playSelectedAudio); // 音声再生リスナーを削除
    yesButton.addEventListener("click", onYesButtonClick); // 元のクリック処理を再追加
}

// 初期化処理
function initialize() {
    yesButton.addEventListener("click", onYesButtonClick);
    noButton.addEventListener("click", onNoButtonClick);
    volumeControl.addEventListener("input", adjustVolume); // 音量スライダー変更時に音量を調整
}

// 初期化関数を呼び出し
initialize();

document.addEventListener("DOMContentLoaded", () => {
    // counter.php にアクセスしてカウンターを取得
    fetch('counter.php')
        .then(response => response.json())
        .then(data => {
            // アクセス数をHTMLに表示
            document.getElementById('accessCounter').textContent = data.count;
        })
        .catch(error => {
            console.error('カウンターの取得に失敗しました:', error);
        });
});

