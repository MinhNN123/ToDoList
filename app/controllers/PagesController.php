<?php
require_once('app/controllers/BaseController.php');
require_once('app/models/ToDoListTableModel.php');

class PagesController extends BaseController
{
    function __construct()
    {
        $this->folder = 'pages';
    }

    public function home()
    {
        $this->render('home');
    }

    public function error()
    {
        $this->render('error');
    }

    public function getList()
    {
        $toDoListTableModel = new ToDoListTableModel();
        $data = $toDoListTableModel->getToDoList();
        echo json_encode($data);
    }

    public function getEvent()
    {
        $toDoListTableModel = new ToDoListTableModel();
        $data = $toDoListTableModel->getToDoEventById();
        echo json_encode($data);
    }

    public function addEvent()
    {
        $toDoListTableModel = new ToDoListTableModel();
        $data = $toDoListTableModel->addToDoEvent();
        echo json_encode($data);
    }

    public function updateEvent()
    {
        $toDoListTableModel = new ToDoListTableModel();
        $data = $toDoListTableModel->updateToDoEventById();
        echo json_encode($data);
    }

    public function deleteEvent()
    {
        $toDoListTableModel = new ToDoListTableModel();
        $data = $toDoListTableModel->deleteToDoEventById();
        echo json_encode($data);
    }
}
