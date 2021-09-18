<?php
header('Content-Type: application/json');

require 'main.php';
require 'connect.php';

$page = $_GET['page'];
$all = $_GET['all'];

$i = 0;
$j = 9;
setLimit();
if($all == null) echo getData($link, "SELECT * FROM `gallery` LIMIT $i, $j");
else echo getData($link, "SELECT * FROM `gallery`");