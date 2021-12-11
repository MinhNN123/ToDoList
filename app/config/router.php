<?php
//Kiểm tra các tham số truyền vào từ URL
if (isset($_GET['controller'])) {
    $controller = $_GET['controller'];
    $action = isset($_GET['action']) ? $_GET['action'] : '';
} else {
    $controller = 'pages';
    $action = 'home';
}

//Khởi tạo danh sách controller và action tương ứng
$controllerList = array(
    'pages' => ['home', 'error', 'getList', 'getEvent', 'addEvent', 'updateEvent', 'deleteEvent']
);
