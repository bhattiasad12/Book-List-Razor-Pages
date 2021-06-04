
var dataTable;

$(document).ready(function () {
    loadDataTable();
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
                        <button onclick=Edit("${data}") class='btn btn-info form-control text-white' style='cursor:pointer; width:70px;'>
                            Edit
                        </button> 
                        &nbsp;                       
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                            onclick=Delete('/book/delete?id='+${data})>
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

function Delete(url) {
    $.ajax({
        type: "DELETE",
        url: url,
        success: function (data) {
            if (data.success) {
                var alert;
                alert = data.message;
                $('#alert').modal('show')

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
            debugger;
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
            debugger;
            $('#element').toast('show')
        });

}