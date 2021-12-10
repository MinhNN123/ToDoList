$(document).ready(function () {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next, today',
            center: 'title',
            right: 'month, agendaWeek, agendaDay'
        },
        editable: true,
        events: function (start, end, timezone, callback) {
            $.ajax({
                url: "?controller=pages&action=getList",
                success: function (response) {
                    var events = [];
                    var object = JSON.parse(response);

                    for (var i = 0; i < object.length; i++) {
                        events.push({
                            title: object[i].title,
                            start: object[i].start,
                            end: object[i].end,
                            id: object[i].id,
                            status: object[i].status
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
            $('#startingDate').val(new Date(start).toJSON().slice(0, 19));
            $('#endingDate').val(new Date(end).toJSON().slice(0, 19));

            $('#titleModal').text("Add an Event");
            $(".modal-footer").append('<button type="button" class="btn btn-success" id="addButton">Save</button>');
        },

        editable: true,
        eventDrop: function (event, delta) {
            var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
            var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
            $.ajax({
                url: 'edit-event.php',
                data: 'title=' + event.title + '&start=' + start + '&end=' + end + '&id=' + event.id,
                type: "POST",
                success: function () {
                    displayMessage("Updated Successfully");
                }
            });
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
                        $('#workName').val(object[0].title);
                        $('#status').val(object[0].status);
                        $('#startingDate').val(new Date(object[0].start).toJSON().slice(0, 19));
                        $('#endingDate').val(new Date(object[0].end).toJSON().slice(0, 19));
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
        $('#errorWorkName').text('');
        $("#errorStartingDate").text('');
        $("#errorEndingDate").text('');
        $("#errorStatus").text('');
        $('#titleModal').text('');
        $('#workName').val('');
        $('#status').val(1);
        $('#startingDate').val();
        $('#endingDate').val();
        $("#updateButton, #deleteButton, #addButton").remove();
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

        if ((status != 1) && (status != 2) && (status != 3)) {
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

