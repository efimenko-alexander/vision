<?php
header('Content-Type: application/json');

require 'main.php';
require 'connect.php';

$page = $_GET['page'];
$category = $_GET['category'];
$sort = $_GET['sort'];

$i = 0;
$j = 6;
setLimit();

if($category == 'none' && $sort == '') echo getData($link, "SELECT * FROM `store` LIMIT $i, $j");
else if($category != 'none' && $sort == '') {
    switch ($category) {
        case "hair":
            echo getData($link, "SELECT * FROM `store` WHERE `category` = 'Уход за волосами' LIMIT $i, $j");
            break;
        case "beard":
            echo getData($link, "SELECT * FROM `store` WHERE `category` = 'Уход за бородой' LIMIT $i, $j");
            break;
        case "styling":
            echo getData($link, "SELECT * FROM `store` WHERE `category` = 'Стайлинг' LIMIT $i, $j");
            break;
        case "accessories":
            echo getData($link, "SELECT * FROM `store` WHERE `category` = 'Аксессуары' LIMIT $i, $j");
            break;
    }
}
else if($category == 'none' && $sort != '') {
    switch ($sort) {
        case "priceDesc":
            echo getData($link, "SELECT * FROM `store` ORDER BY `price` DESC LIMIT $i, $j");
            break;
        case "priceAsc":
            echo getData($link, "SELECT * FROM `store` ORDER BY `price` ASC LIMIT $i, $j");
            break;
        case "titleDesc":
            echo getData($link, "SELECT * FROM `store` ORDER BY `title` DESC LIMIT $i, $j");
            break;
        case "titleAsc":
            echo getData($link, "SELECT * FROM `store` ORDER BY `title` ASC LIMIT $i, $j");
            break;
    }
} else {
    $categorySQL = '';
    $sortSQL = '';
    switch ($sort) {
        case "priceDesc":
            $sortSQL = 'ORDER BY price DESC';
            break;
        case "priceAsc":
            $sortSQL = 'ORDER BY price ASC';
            break;
        case "titleDesc":
            $sortSQL = 'ORDER BY title DESC';
            break;
        case "titleAsc":
            $sortSQL = 'ORDER BY title ASC';
            break;
    }

    switch ($category) {
        case "hair":
            $categorySQL = "`category` = 'Уход за волосами'";
            break;
        case "beard":
            $categorySQL = "`category` = 'Уход за бородой'";
            break;
        case "styling":
            $categorySQL = "`category` = 'Стайлинг'";
            break;
        case "accessories":
            $categorySQL = "`category` = 'Аксессуары'";
            break;
    }
    echo getData($link, "SELECT * FROM `store` WHERE $categorySQL $sortSQL LIMIT $i, $j");
}