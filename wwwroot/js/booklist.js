
var dataTable;

$(document).ready(function () {
    loadDataTable();
    var data = 0;
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "book/GetAll",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <button onclick=Edit("${data}") class='btn btn-primary form-control text-white' style='cursor:pointer; width:70px;'>
                            Edit
                        </button> 
                        &nbsp;                       
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                            data-toggle="modal" data-target="#confirmDelete"
                            data-title="Delete Book" data-message="Are you sure you want to delete this book?")>
                            Delete
                        </a>
                        </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
}

function Delete(Id) {
    $.ajax({
        type: "DELETE",
        data: {
            id: Id
        },
        success: function (data) {
            if (data.success) {
                dataTable.ajax.reload();
            }
            else {
                alert(data.message);
            }
        }
    });
}
function Edit(Id) {
    $.ajax({
        url: "Book/Edit",
        type: "GET",
        data: {
            id: Id
        }
    })
        .done(function (response) {
            $("#Updateid").val(response.id);
            $("#name").val(response.name);
            $("#author").val(response.author);
            $("#isbn").val(response.isbn);
        });
    $('#edit').modal('show')
}

function Update() {
    $.ajax({
        url: "Book/Update",
        type: "PUT",
        data: {
            data: {
                id: $("#Updateid").val(),
                name: $("#name").val(),
                author: $("#author").val(),
                isbn: $("#isbn").val()
            }
        },
    })
        .done(function (response) {
            toastr.success(data.message);
            dataTable.ajax.reload();
        });
}

$('#confirmDelete').on('show.bs.modal', function (e) {
    $message = $(e.relatedTarget).attr('data-message');
    $(this).find('.modal-body p').text($message);
    $title = $(e.relatedTarget).attr('data-title');
    $(this).find('.modal-title').text($title);

    var form = $(e.relatedTarget).closest('form');
    $(this).find('.modal-footer #confirm').data('form', form);
});

$('#confirmDelete').find('.modal-footer #confirm').on('click', function () {
    dataTable.ajax.reload();


s});
