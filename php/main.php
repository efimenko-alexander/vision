<?php

function setLimit() {
    global $page;
    global $i;
    global $j;
    if($page == 2) {
        $i = $j;
    }elseif ($page > 2) {
        $i = $j * $page - $j;
    }
}

function getData($connect,$query) {
    $datas = mysqli_query($connect, $query);
    $datasList = [];

    while($data = mysqli_fetch_assoc($datas)) {
        $datasList[] = $data;
    }

    return json_encode($datasList, JSON_UNESCAPED_UNICODE);
}