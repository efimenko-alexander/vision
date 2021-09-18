<?php
header('Content-Type: application/json');

require 'main.php';
require 'connect.php';

echo getData($link, "SELECT * FROM `services`");