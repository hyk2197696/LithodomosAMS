var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var AssetSchema = new Schema({
    //all Assets' attributes
    name: {type: String, require: true},
    project: {type: Schema.ObjectId, ref: 'Project'},
    reference: {type: Schema.ObjectId, ref: 'Reference'},
    fakeDirectory: {type: Schema.ObjectId, ref: 'FakeDirectory', require: true},
    trueLocation: {type: String, require: true},
    fileName :{type: String, require: true},
    fileType: {type: Schema.ObjectId, ref: 'FileType', require: true},
    _type: {type: String, enum:['Asset', 'Model', 'Shader', 'Diagram', 'Status', 'ArchitecturalElement', 'natural', 'manMade'], require: true, default: 'Asset'},
    period: {type: Schema.ObjectId , ref: 'Period'},

    //Shader
    shaderType: {type: Schema.ObjectId, ref: 'ShaderType'},

    //Diagram
    diagramType: {type: Schema.ObjectId, ref: 'DiagramType'},

    site: {type: Schema.ObjectId, ref: 'Site'},
    originalPublication: {type: Schema.ObjectId, ref: 'Publication' },


    //Model
    levelOfDetail:{type: String, enum: ['high','low', 'optimised']},
    culture: {type: Schema.ObjectId, ref: 'Culture'},

    //Statue
    material: {type: String},
    pose: {type: String},
    gender: {type: String, enum:['male', 'female', 'uncertain']},
    statueType: {type: Schema.ObjectId, ref: 'StatueType'},
    location: {type: String},

    //ArchitecturalElement
    architecturalElementType: {type: Schema.ObjectId, ref: 'ArchitecturalElementType'},
    style: {type: Schema.ObjectId, ref: 'Style'},

    //Natural
    naturalType: {type: Schema.ObjectId, ref: 'NaturalType'},

    //ManMade
    manMadeType: {type: Schema.ObjectId, ref: 'ManMadeType'}
});

module.exports = mongoose.model('Asset', AssetSchema);

// var ModelSchema = AssetSchema.extend({
//     levelOfDetail: {type: String, required: true, enum: ['high', 'low', 'optimised']}
// });
// var Asset = mongoose.model('Asset', AssetSchema);
// var Model = mongoose.model('Model', ModelSchema);
// var newmodel = {
//     name: 'aaa',
//     fakeDirectory:null,
//     trueLocation:'aaa',
//     fileName: 'aaa',
//     levelOfDetail:'high'
// }
//
// var newMod = new Model(newmodel);
// console.log('begin');
// newMod.save(err => {
//     console.log('success');
//     console.log(newMod);
//     console.log('end');
// });