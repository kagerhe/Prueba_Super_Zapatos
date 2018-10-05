var uri = "http://localhost:51645/Services/Stores";
var uriedit = "http://localhost:51645/Services/Stores/Edit/";
var uridelete = "http://localhost:51645/Services/Stores/Delete/";
var uriadd = "http://localhost:51645/Services/Stores/Add";

$(document).ready(function () {

    GetAll();
    $('#addStore').on('click', function () {
        CreateStore();
    })
});

function GetAll() {
    // Send an AJAX request
    $('#listStore tbody').html('');
    $.getJSON(uri +"/All")
        .done(function (data) {
            var store = data.stores
            $.each(store, function (key, item) {
                $('#table').append(formatItemTable(item));
            });
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log(err)
        });
}

function editStore(id, store) {
    $.ajax({
        url: uriedit + id,
        type: 'PUT',
        crossDomain: true,
        dataType: "json",
        data: store,
        statusCode: {
            200: function () {
                ClearForm();
                alert(200);
                redireccionar();
            },
            404: function () {
                alert(404)
            },
            400: function () {
                alert(400)
            }
        }
    });
}

function formatItemTable(item) {
    var td = "<tr><td>" + item.Id
        + "</td><td>" + item.Name
        + "</td><td>" + item.Address
        + "</td><td>" + formatButton(item.Id)
        + "</td></tr>"
    return td
}

function formatButton(valor) {
    var btnEdit = "<a href='javascript:void(0);' onclick='UpdateStore(" + valor + ")'  class='btn btn-warning btn-sm'><i class='fa fa-pencil'></i> Edit</a>"
    var btnRemove = "<a href='javascript:void(0);' onclick='DeleteStoreById(" + valor + ")'  class='btn btn-danger btn-sm' style='margin-left:5px; margin-rigth:0'><i class='fa fa-trash'></i> Delete</a>"
    return btnEdit + btnRemove
}

alertify.defaults.transition = "slide";

function DeleteStoreById(id) {
    alertify.defaults.theme.ok = "btn btn-danger";
    alertify.defaults.theme.cancel = "btn btn-primary";
    alertify.confirm('Alert Title', function () {
        deleteStore(id)
        redireccionar();
        alertify.success('Removed');
    }, function () {
        redireccionar();
        alertify.error('Declined');
    }).set({
        labels: { ok: 'Delete', cancel: 'Cancel' }
    }).setContent("You want to delete this store")
        .setHeader("Update Store")
        .setting({
            'pinnable': true,
            'modal': true,
            'closable': false
        });
}

alertify.defaults.theme.ok = "btn btn-success";
alertify.defaults.theme.cancel = "btn btn-danger";

function UpdateStore(id) {
    alertify.confirm('Alert Title', function () {
        editStore(id, GetData())
        redireccionar();
        alertify.success('Accepted ');
    }, function () {
        redireccionar();
        alertify.error('Declined');
    }).set({
        labels: { ok: 'Accept', cancel: 'Cancel' }
    }).setContent($('#formStore')[0])
        .setHeader("Update Store")
        .setting({
            'pinnable': true,
            'modal': true,
            'closable': false
        });
    findStore(id)
}

function CreateStore() {
    alertify.confirm('Alert Title', 'Alert Message!', function () {
        addStore(GetData())
        alertify.success('Accepted');
    }, function () {
        redireccionar();
        alertify.error('Declined');
    }).set({
        labels: { ok: 'Accept', cancel: 'Cancel' }
    })
        .setContent($('#formStore')[0])
        .setHeader("Create Store")
        .setting({
            'pinnable': true,
            'modal': true,
            'closable': false
        });
}

function findStore(id) {
    $.ajax({
        url: uriedit + id,
        success: function (data) {
            formatItem(data.store);
        }
    });

}

function addStore(store) {
    $.ajax({
        url: uriadd,
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        data: store,
        statusCode: {
            200: function () {
                redireccionar();
            },
            404: function () {
                alert(404)
            },
            400: function () {
                alert(400)
            }
        }
    });
}


function deleteStore(id) {
    $.ajax({
        url: uridelete + id,
        type: 'DELETE',
        contentType: 'application/json;chartset=utf-8',
        statusCode: {
            200: function () {
                ClearForm();
                alert(200);
                redireccionar();
            },
            404: function () {
                alert(404)
            },
            400: function () {
                alert(400)
            }
        }
    });
}

function GetData() {
    var store = {
        Id: $('#idn').val(),
        Name: $('#name').val(),
        Address: $('#address').val()
    }
    return store
}

function ClearForm() {
    $('#idn').val('')
    $('#name').val('')
    $('#address').val('')
}

function formatItem(item) {
    $('#idn').val(item.Idn)
    $('#name').val(item.Name)
    $('#address').val(item.Address)
}

function redireccionar() {
    location.href = window.location.pathname;
}
