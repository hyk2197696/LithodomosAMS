let setModalInfo=(id,email,permission) => {
    $("#config_email").html('Email : ' + email);
    $("#user_id").val(id);

    if(checkSearch(permission)){
        $("#searchPermission").attr('checked', true);
    }else{
        $("#searchPermission").attr('checked', false);
    }
    if(checkCreate(permission)){
        $("#createPermission").attr('checked', true);
    }else{
        $("#createPermission").attr('checked', false);
    }
    if(checkUpdate(permission)){
        $("#updatePermission").attr('checked', true);
    }else{
        $("#updatePermission").attr('checked', false);
    }
    if(checkDelete(permission)){
        $("#deletePermission").attr('checked', true);
    }else{
        $("#deletePermission").attr('checked', false);
    }

};

let changePermission = () =>{
        let req = new XMLHttpRequest();

        let permission = [];
        if($("#searchPermission").prop('checked'))  permission.push('search');
        if($("#createPermission").prop('checked'))  permission.push('create');
        if($("#updatePermission").prop('checked'))  permission.push('update');
        if($("#deletePermission").prop('checked'))  permission.push('delete');
        let url = "/dynamic/changepermission?id=" + $("#user_id").val() + '&permission=' + permission ;

        req.open("GET", url);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                location.reload();
            }
        };
        req.send();


};

let deleteUser = (userId) =>{
        let req = new XMLHttpRequest();

        let permission = [];
        if($("#searchPermission").prop('checked'))  permission.push('search');
        if($("#createPermission").prop('checked'))  permission.push('create');
        if($("#updatePermission").prop('checked'))  permission.push('update');
        if($("#deletePermission").prop('checked'))  permission.push('delete');
        let url = "/dynamic/deleteuser?id=" + userId;

        req.open("GET", url);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                location.reload();
            }
        };
        req.send();


};
let checkSearch = permission => permission.indexOf('search')  !== -1;
let checkCreate = permission => permission.indexOf('create')  !== -1;
let checkUpdate = permission => permission.indexOf('update')  !== -1;
let checkDelete = permission => permission.indexOf('delete')  !== -1;