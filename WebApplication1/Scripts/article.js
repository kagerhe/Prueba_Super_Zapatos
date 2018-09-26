var uri = "http://localhost:51645/Services/Article/GetAllArticles";


$(function () {

    GetAll();
    $('#addnewArticle').on('click', function () {
        CreateArticle();
    })
});

function GetAll() {
    
    $('#listArticle tbody').html('');
    //$.getJSON(uri)
    //    .done(function (data) {
    //        var articles = data.articles
    //        $.each(articles, function (key, item) {
    //            $('#table').append(formatItemTable(item));
    //        });
    //    })
    //    .fail(function (jqXHR, textStatus, err) {
    //        console.log(err)
    //    });

       }

function GetAllStore(id) {
    $.getJSON("http://localhost:51645/Services/Stores")
        .done(function (data) {
            var store = data.stores
            $.each(store, function (key, item) {
                $('#selectStore').append(formatItemSelect(item, id))
            });
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log(err)
        });
}

function CreateArticle() {
    alertify.confirm('Alert Title', function () {
        addArticle(GetData())
        alertify.success('Accepted');
    }, function () {
        redireccionar();
        alertify.error('Declined');
    }).set({
        labels: { ok: 'Accept', cancel: 'Cancel' }
    })
        .setContent($('#formStore')[0])
        .setHeader("Create Article")
        .setting({
            'pinnable': true,
            'modal': true,
            'closable': false
        });
    GetAllStore(0)
    $('#idn').val(1)
}

