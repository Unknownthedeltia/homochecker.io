<?php
header('Content-Type: application/json');

// カウンターファイルのパス
$counterFile = 'counter.json';

// ファイルが存在しない場合、初期化
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '0');
}

// 現在のカウント数を取得
$currentCount = (int)file_get_contents($counterFile);

// カウントを増やす
$newCount = $currentCount + 1;

// 新しいカウント数をファイルに保存
file_put_contents($counterFile, (string)$newCount);

// JSON形式で返す
echo json_encode(['count' => $newCount]);
