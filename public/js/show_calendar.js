$(document).ready(function () {
    const PLANNING = 1;
    const DOING = 2;
    const DONE = 3;

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next, today',
            center: 'title',
            right: 'month, agendaWeek, agendaDay'
        },
        editable: false,
        events: function (start, end, timezone, callback) {
            $.ajax({
                url: "?controller=pages&action=getList",
                success: function (response) {
                    var events = [];
                    var object = JSON.parse(response);

                    for (var i = 0; i < object.length; i++) {
                        var color = '';
                        if (object[i].status == PLANNING){
                            color = '#85C1E9';
                        }
                        else if (object[i].status == DOING){
                            color = '#7DCEA0';
                        }
                        else if (object[i].status == DONE){
                            color = '#F1948A';
                        }

                        events.push({
                            title: object[i].title,
                            start: object[i].start,
                            end: object[i].end,
                            id: object[i].id,
                            status: object[i].status,
                            color: color 
                        });
                    }
                    callback(events);
                }
            });
        },
        displayEventTime: false,
        eventRender: function (event, element, view) {
            if (event.allDay === 'true') {
                event.allDay = true;
            } else {
                event.allDay = false;
            }
        },
        eventLimit: true,
        selectable: true,
        selectHelper: true,
        select: function (start, end, allDay) {
            clearAllInput();
            $('#createEventModal').modal('show');
            var start = $.fullCalendar.formatDate(start, "Y-MM-DD");
            var end = $.fullCalendar.formatDate(end, "Y-MM-DD");
            $('#startingDate').val(start);
            $('#endingDate').val(end);
            $('#titleModal').text("Add an Event");
            $(".modal-footer").append('<button type="button" class="btn btn-success" id="addButton">Save</button>');
        },
        eventClick: function (event) {
            $.ajax({
                type: "POST",
                url: "?controller=pages&action=getEvent",
                data: "&id=" + event.id,
                success: function (response) {
                    var object = JSON.parse(response);
                    if (object.length > 0) {
                        var events = [];
                        for (var i = 0; i < object.length; i++) {
                            events.push({
                                title: object[i].title,
                                start: object[i].start,
                                end: object[i].end,
                                id: object[i].id,
                                status: object[i].status
                            });
                        }

                        clearAllInput();
                        var startingDate = moment(new Date(object[0].start)).format("Y-MM-DD");
                        var endingDate = moment(new Date(object[0].end)).format("Y-MM-DD");
                        $('#workName').val(object[0].title);
                        $('#status').val(object[0].status);
                        $('#startingDate').val(startingDate);
                        $('#endingDate').val(endingDate);
                        $('#titleModal').text("Edit Event");
                        $(".modal-footer").append('<button type="button" class="btn btn-primary" data-id=' + event.id + ' id="updateButton">Update</button>');
                        $(".modal-footer").append('<button type="button" class="btn btn-danger" data-id=' + event.id + ' id="deleteButton">Delete</button>');
                        $('#createEventModal').modal('show');
                    }
                }
            });
        }
    });

    $(document).on('click', '#addButton', function () {
        clearErrorMessage();
        if (IsValidInput()) {
            var workName = $('#workName').val();
            var startingDate = $('#startingDate').val();
            var endingDate = $('#endingDate').val();
            var status = $('#status').val();

            $.ajax({
                url: '?controller=pages&action=addEvent',
                data: 'workName=' + workName + '&startingDate=' + startingDate + '&endingDate=' + endingDate + '&status=' + status,
                type: "POST",
                success: function () {
                    $('#createEventModal').modal('hide');
                    $('#calendar').fullCalendar('refetchEvents');
                    displayMessage("Added Successfully");
                }
            });
        }
    });

    $(document).on('click', '#deleteButton', function () {
        var deleteMsg = confirm("Do you really want to delete?");
        if (deleteMsg) {
            var eventId = $(this).attr("data-id");
            $.ajax({
                type: "POST",
                url: '?controller=pages&action=deleteEvent',
                data: "&id=" + eventId,
                success: function () {
                    $('#createEventModal').modal('hide');
                    $('#calendar').fullCalendar('removeEvents', eventId);
                    displayMessage("Deleted Successfully");
                }
            });
        }
    });

    $(document).on('click', '#updateButton', function () {
        clearErrorMessage();
        if (IsValidInput()) {
            var workName = $('#workName').val();
            var startingDate = $('#startingDate').val();
            var endingDate = $('#endingDate').val();
            var status = $('#status').val();
            var eventId = $(this).attr("data-id");
            $.ajax({
                url: '?controller=pages&action=updateEvent',
                data: 'id=' + eventId + '&workName=' + workName + '&startingDate=' + startingDate + '&endingDate=' + endingDate + '&status=' + status,
                type: "POST",
                success: function () {
                    $('#createEventModal').modal('hide');
                    $('#calendar').fullCalendar('refetchEvents');
                    displayMessage("Update Successfully");
                }
            });
        }
    });

    function displayMessage(message) {
        $(".message-response").html("<div class='success'>" + message + "</div>");
        setInterval(function () { $(".success").fadeOut(); }, 2000);
    }

    function clearAllInput() {
        clearErrorMessage();
        $('#titleModal').text('');
        $('#workName').val('');
        $('#status').val(1);
        $('#startingDate').val();
        $('#endingDate').val();
        $("#updateButton, #deleteButton, #addButton").remove();
    }

    function clearErrorMessage() {
        $('#errorWorkName').text('');
        $("#errorStartingDate").text('');
        $("#errorEndingDate").text('');
        $("#errorStatus").text('');
    }

    function IsValidInput() {
        var workName = $('#workName').val();
        var startingDate = $('#startingDate').val();
        var endingDate = $('#endingDate').val();
        var status = $('#status').val();
        var result = true;

        if (workName == "") {
            $("#errorWorkName").text("Vui lòng nhập work name!");
            $("#errorWorkName").css("color", "red");
            result = false;
        }

        if (startingDate == "") {
            $("#errorStartingDate").text("Vui lòng nhập đầy đủ starting date!");
            $("#errorStartingDate").css("color", "red");
            result = false;
        }

        if (endingDate == "") {
            $("#errorEndingDate").text("Vui lòng nhập đầy đủ ending date!");
            $("#errorEndingDate").css("color", "red");
            result = false;
        }

        if (status == "") {
            $("#errorStatus").text("Vui lòng chọn status!");
            $("#errorStatus").css("color", "red");
            result = false;
        }

        if (status == "") {
            $("#errorStatus").text("Vui lòng chọn status!");
            $("#errorStatus").css("color", "red");
            result = false;
        }

        if ((status != PLANNING) && (status != DOING) && (status != DONE)) {
            $("#errorStatus").text("Vui lòng chọn status hợp lệ!");
            $("#errorStatus").css("color", "red");
            result = false;
        }

        if (endingDate < startingDate) {
            $("#errorStartingDate").text("Vui lòng nhập đúng starting date không lớn hơn ending date!");
            $("#errorStartingDate").css("color", "red");
            result = false;
        }

        return result;
    }
});

