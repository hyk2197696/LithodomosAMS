var json = require('json');

var jsonString = [{Id:1, color:"blue"},{Id:2, color:"green"},{Id:3, color:"blue"},{Id:4, color:"red"}];
var filtered = jsonString.filter( item => {
    return item.color == 'green';
});
console.log(filtered);