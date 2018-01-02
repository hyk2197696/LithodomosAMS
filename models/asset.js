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
    _type: {type: String, enum:['Asset', 'Model', 'Shader', 'Diagram', 'Statues', 'Architectural Element', 'natural', 'manMade'], require: true, default: 'Asset'},
    createTime: { type: Date, default: Date.now },
    period: {type: Schema.ObjectId , ref: 'Period'},

    //Shader
    shaderType: {type: Schema.ObjectId, ref: 'ShaderType'},//selection

    //Diagram
    diagramType: {type: Schema.ObjectId, ref: 'DiagramType'},
    site: {type: String},
    originalPublication: {type: Schema.ObjectId, ref: 'Publication' },


    //Model
    //levelOfDetail:{type: String, enum: ['high','low', 'optimised']},//not useful
    //culture: {type: Schema.ObjectId, ref: 'Culture'},//sel

    //Statue
    statueType: {type: Schema.ObjectId, ref: 'StatueType'},
    statueCulture: {type: Schema.ObjectId, ref: 'Culture'},
    material: {type: Schema.ObjectId, ref: 'Material'},//sel
    pose: {type: String},//typeahead
    gender: {type: String, enum:['male', 'female', 'uncertain']},

    location: {type: String},

    //ArchitecturalElement
    architecturalCulture: {type: Schema.ObjectId, ref: 'Culture'},
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