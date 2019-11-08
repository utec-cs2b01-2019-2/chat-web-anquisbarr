$(function(){
    var url = "http://127.0.0.1:8000/messages";
    var db ="http://127.0.0.1:8000/users";
    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url,
            insertUrl: url,
            updateUrl: url,
            deleteUrl: url,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        editing: {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true
        },
        remoteOperations: true,
        columns: [{
                dataField: "id",
                dataType: "number",
                allowEditing: false},

                {dataField: "content",
                //dataType: "text",
                allowEditing: true},

                {dataField: "user_from_id",
                lookup: {
                        dataSource: DevExpress.data.AspNet.createStore
                        ({
                            key: "id",
                            loadUrl: db,
                            onBeforeSend: function(method, ajaxOptions) {
                                ajaxOptions.xhrFields = { withCredentials: true };
                            }
                        }),
                        valueExpr: "id",
                        displayExpr: "username"
                        }
                 },
                {dataField: "user_to_id",
                lookup: {
                        dataSource: DevExpress.data.AspNet.createStore
                        ({
                            key: "id",
                            loadUrl: db,
                            onBeforeSend: function(method, ajaxOptions) {
                                ajaxOptions.xhrFields = { withCredentials: true };
                            }
                        }),
                        valueExpr: "id",
                        displayExpr: "username"
                        }
                }
                ]

                            }).dxDataGrid("instance");

            });
