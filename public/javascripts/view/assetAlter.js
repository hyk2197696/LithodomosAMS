var projects = [];
var poses = [];
var sites = [];
var allDirectories = [];
var currentDirectory = null;




function getallproject() {
    var req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallproject");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //$("#test").html(req.responseText);
            var responds = JSON.parse(req.responseText);
            for (i = 0; i < responds.length; i++) {
                project.push(responds[i].name);
            }
        }
    }
    req.send();
}
function project_create() {
    if ($("#new_project_name").val() == '') {
        alert('Please enter the project name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/catalog/projectcreate?name=" + $("#new_project_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            //alert(req.responseText);
            $("#project_create").modal('hide');
            $("#project_name").val($("#new_project_name").val());
        }
    }

    req.send();
}

function reference_create() {
    if ($("#new_reference_name").val() == '') {
        alert('Please enter the reference name!');
        return;
    }
    var req = new XMLHttpRequest();
    var url = "/catalog/referencecreate?name=" + $("#new_reference_name").val();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);
            var response = JSON.parse(req.responseText);
            //alert(response);
            // alert(response.message);
            $("#reference_create").modal('hide');
            //alert(response.newReference._id)
            $("#reference_default_option").val(response.newReference._id);
            $("#reference_default_option").html(response.newReference.name);
            //$("#reference").prepend('<option value="-1">No reference</option>')

        }
    }

    req.send();
}

function getallreference() {
    var req = new XMLHttpRequest();

    req.open("GET", "/dynamic/selectallreference");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            references = JSON.parse(req.responseText);
        }
    }
    req.send();
}

function getAllDirectory(callback) {

    var req = new XMLHttpRequest();
    req.open("GET", "/dynamic/selectalldirectory");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            //alert(req.responseText);

            callback(req.responseText);

        }
    }

    req.send();
};

function getFoldersById(id) {
    var folders = [];

    for (var i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i].super == id) {
            folders.push(allDirectories[i]);
        }
    }
    //alert(folders);
    return folders;
};

function getSuperFolderIdById(id) {
    for (var i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i]._id == id) {
            return allDirectories[i].super;
        }
    }
}
function getFolderObjectById(id) {
    for (var i = 0; i < allDirectories.length; i++) {
        if (allDirectories[i]._id == id) {
            return allDirectories[i]
        }
    }
}
function back(id) {
    if (id == null) {
        return;
    }
    currentDirectory = getSuperFolderIdById(id);
    var currentFolderName;
    if (currentDirectory == null) {
        currentFolderName = 'Root';
    } else {
        var currentFolder = getFolderObjectById(currentDirectory);
        currentFolderName = currentFolder.name;
    }
    setDirectoryTableHeader(currentFolderName);
    setDirectoryTableBody();

}

function explore(id) {
    //alert();
    currentDirectory = id;
    var currentFolder = getFolderObjectById(id);
    setDirectoryTableHeader(currentFolder.name);
    setDirectoryTableBody();
}

function setDirectoryTableHeader(name) {
    $("#directory_tbody").html('<th scope="row"><botton type="button" class="btn glyphicon glyphicon-arrow-left" onclick="back(\''
        + currentDirectory + '\')"></botton>' +
        '<botton type="button" class="btn-lg glyphicon glyphicon-folder-open" > ' + name + '</botton></th><th scope="row"/>');
}

function setDirectoryTableBody() {
    var folders = getFoldersById(currentDirectory);
    for (var i = 0, len = folders.length; i < len; i++) {
        var html = '<tr/><th scope="row"><botton  type="button" class="btn glyphicon glyphicon-folder-close onclick=" onclick="explore(\'' + folders[i]._id + '\')" > ' + folders[i].name + '</botton></th><th scope="row"/>';
        //alert(html);
        $("#directory_tbody").append(html);
    }
}

function save() {
    if (currentDirectory == null) {
        alert('Can\'t save assets in root directory,\nplease choose another');
        return;
    }
    $("#directory").val(currentDirectory);
    var req = new XMLHttpRequest();
    req.open("GET", "/dynamic/getfullfolderdirectory?id=" + currentDirectory);
    req.onreadystatechange = function () {

        if (req.readyState == 4) {

            $("#directoryContent").html('Root' + req.responseText);
        }
    }
    req.send();
}

function checkRequire() {
    if ($("#directory").val() == '') {
        alert("please select a directory");
        return false;
    } else {

        return true;
    }
}
