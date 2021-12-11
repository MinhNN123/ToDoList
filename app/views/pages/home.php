<!DOCTYPE html>
<html>

<head>
    <title>To do list</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./public/css/home.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src='./public/js/show_calendar.js'></script>
</head>
<body>
    <h1 class="text-center">To do list</h1>
    <div class="message-response text-center"></div>
    <div id="calendar"></div>
    <div id="createEventModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id = "titleModal"></h4>
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span> <span class="sr-only">close</span></button>
                </div>
                <div id="modalBody" class="modal-body">
                    <div class="form-group">
                        <label for="workName">Work Name:</label>
                        <input type="text" class="form-control" id="workName" placeholder="Work name" required>
                        <small id="errorWorkName"></small>
                    </div>
                    <div class="form-group">
                        <label for="startingDate">Starting date:</label>
                        <input class="form-control" type="date" value="" id="startingDate">
                        <small id="errorStartingDate"></small>
                    </div>
                    <div class="form-group">
                        <label for="endingDate">Ending date:</label>
                        <input class="form-control" type="date" value="" id="endingDate">
                        <small id="errorEndingDate"></small>
                    </div>
                    <div class="form-group">
                        <label>Status:</label>
                        <select class="form-select form-control" id="status">
                            <option value="<?php echo Constant::PLANNING ?>">Planning</option>
                            <option value="<?php echo Constant::DOING ?>">Doing</option>
                            <option value="<?php echo Constant::DONE ?>">Done</option>
                        </select>
                        <small id="errorStatus"></small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-dismiss="modal" aria-hidden="true">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>