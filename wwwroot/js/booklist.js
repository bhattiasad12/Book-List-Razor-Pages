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
                "render": function (data, type, row) {
                    return `<div class="text-center">
                        <a onclick=Edit("/BookList/index?id=${data}") class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            Edit
                        </a> 
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
                data.message;
                dataTable.ajax.reload();
            }
            else {
                data.message;
            }
        } 
    });
}

function Edit(url) {
    $('#edit').modal('show')
}