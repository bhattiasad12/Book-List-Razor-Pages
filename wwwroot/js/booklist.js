
var dataTable;

$(document).ready(function () {
    loadDataTable();
    var data = 0;
});
var url = 0;

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
                        <button onclick=Edit("${data}") class='btn btn-primary' style='cursor:pointer; width:70px;'>
                            Edit
                        </button> 
                        &nbsp;                       
                        &nbsp;
                        <button class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                            data-bs-toggle="modal" data-bs-target="#confirmDelete">
                            Delete
                        </button>
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

function Delete(url) {
    $.ajax({
        type: "DELETE",
        url: url,
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                dataTable.ajax.reload();
            }
            else {
                toastr.error(data.message);
            }
        }
    })
}

function Delete(Id) {
    $.ajax({
        url: "Book/Delete",
        type: "DELETE",
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
            savedChangesUpdate();
            dataTable.ajax.reload();
        });
}

var optionToast = {
    animation: true,
    delay: 2000
}

function savedChangesUpdate() {
    var toastHTMLElement = document.getElementById("liveToast");
    var toastElement = new bootstrap.Toast(toastHTMLElement, optionToast);
    toastElement.show();
}


