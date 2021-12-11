<?php
require('app/config/connection.php');

class ToDoListTableModel
{
  public function getToDoList()
  {
    $list = [];
    $connection = Connection::getInstance();
    $sqlSearch = 'SELECT id, work_name, starting_date, ending_date, status FROM to_do_list_table WHERE delete_flg = 0';
    $request = $connection->query($sqlSearch);
    $result = $request->fetchAll();

    foreach ($result as $item) {
      $list[] = array(
        'id' => $item['id'],
        'title' => $item['work_name'],
        'start' => $item['starting_date'],
        'end' => $item['ending_date'],
        'status' => $item['status']
      );
    }

    return $list;
  }

  public function addToDoEvent()
  {
    $connection = Connection::getInstance();
    $workName = isset($_POST['workName']) ? $_POST['workName'] : "";
    $startingDate = isset($_POST['startingDate']) ? $_POST['startingDate'] : "";
    $endingDate = isset($_POST['endingDate']) ? $_POST['endingDate'] : "";
    $status = isset($_POST['status']) ? (int)$_POST['status'] : 1;
    $sqlInsert = "INSERT INTO  to_do_list_table (work_name, starting_date, ending_date, status, insert_datetime, update_datetime) 
    VALUES ('" . $workName . "', '" . $startingDate . "', '" . $endingDate . "', " . $status . ",CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())";
    $result = $connection->query($sqlInsert);

    return $result;
  }

  public function getToDoEventById()
  {
    $event = [];
    $eventId = isset($_POST['id']) ? (int)$_POST['id'] : "";
    $connection = Connection::getInstance();
    $sqlSearch = 'SELECT id, work_name, starting_date, ending_date, status FROM to_do_list_table WHERE delete_flg = 0 and id ='.$eventId.'';
    $request = $connection->query($sqlSearch);
    $result = $request->fetchAll();

    foreach ($result as $item) {
      $event[] = array(
        'id' => $item['id'],
        'title' => $item['work_name'],
        'start' => $item['starting_date'],
        'end' => $item['ending_date'],
        'status' => $item['status']
      );
    }

    return $event;
  }

  public function updateToDoEventById()
  {
    $connection = Connection::getInstance();
    $eventId = isset($_POST['id']) ? (int)$_POST['id'] : "";
    $workName = isset($_POST['workName']) ? $_POST['workName'] : "";
    $startingDate = isset($_POST['startingDate']) ? $_POST['startingDate'] : "";
    $endingDate = isset($_POST['endingDate']) ? $_POST['endingDate'] : "";
    $status = isset($_POST['status']) ? (int)$_POST['status'] : 1;
    $sqlUpdate = "UPDATE to_do_list_table set work_name = '".$workName."', starting_date = '".$startingDate."',  ending_date = '".$endingDate."',
    status = ".$status.", update_datetime = CURRENT_TIMESTAMP() where id =".$eventId."";
    $result = $connection->query($sqlUpdate);

    return $result;
  }

  public function deleteToDoEventById()
  {
    $connection = Connection::getInstance();
    $eventId = isset($_POST['id']) ? (int)$_POST['id'] : "";
    $sqlUpdate = "DELETE FROM to_do_list_table where id =".$eventId."";
    $result = $connection->query($sqlUpdate);

    return $result;
  }
}