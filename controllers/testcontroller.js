var json = require('json');

allDirectories = [{id:1},{id:2},{id:3},{id:null}];
function getFoldersById(id) {
    var folders = allDirectories.filter(function (item) {
        return item.id == id;
    });
    return folders;
};

console.log(getFoldersById(null));