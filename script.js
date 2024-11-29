// ボタン要素と結果表示用の要素を取得
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const resultDiv = document.getElementById("result");

// 音声ファイルを準備
const audio = new Audio("soudayo.mp3");

// 「はい」ボタンがクリックされたときの処理
function onYesButtonClick() {
    resultDiv.textContent = "やっぱりホモじゃないか！！";

    // ボタンのテキストを「そうだよ」に変更
    yesButton.textContent = "そうだよ";

    // 「そうだよ」ボタンをクリックしたら音声を再生
    yesButton.removeEventListener("click", onYesButtonClick); // 元のリスナーを削除
    yesButton.addEventListener("click", playAudio); // 音声再生リスナーを追加
}

// 「いいえ」ボタンがクリックされたときの処理
function onNoButtonClick() {
    resultDiv.textContent = "ホモは嘘つき";

    // ボタンを「はい」に戻す処理を呼び出し
    resetYesButton();
}

// 音声を再生する関数
function playAudio() {
    audio.play();
}

// 「そうだよ」ボタンを「はい」に戻す関数
function resetYesButton() {
    // ボタンのテキストを「はい」に戻す
    yesButton.textContent = "はい";

    // イベントリスナーをリセット
    yesButton.removeEventListener("click", playAudio); // 音声再生リスナーを削除
    yesButton.addEventListener("click", onYesButtonClick); // 元のクリック処理を再追加
}

// 初期化処理
function initialize() {
    yesButton.addEventListener("click", onYesButtonClick);
    noButton.addEventListener("click", onNoButtonClick);
}

// 初期化関数を呼び出し
initialize();
