<?php
// カウンターファイルのパス
$filePath = 'counter.json';

// ファイルが存在するか確認
if (!file_exists($filePath)) {
    // 初期化: ファイルがない場合は作成
    file_put_contents($filePath, json_encode(["count" => 0]));
}

// ファイルを読み込み
$data = json_decode(file_get_contents($filePath), true);

// カウントを増加
$data['count']++;

// ファイルに書き戻す
file_put_contents($filePath, json_encode($data));

// 現在のカウントを返す
header('Content-Type: application/json');
echo json_encode(["count" => $data['count']]);
?>