const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const AssetSchema = new Schema({
    //all Assets' attributes
    name: {type: String, require: true},
    project: {type: Schema.ObjectId, ref: 'Project'},//shown as site
    reference: {type:String},
    period: {type: Schema.ObjectId, ref: 'Period'},
    fakeDirectory: {type: Schema.ObjectId, ref: 'FakeDirectory', require: true},
    trueLocation: {type: String, require: true},
    fileName: {type: String, require: true},
    fileType: {type: String, require: true},
    type: {
        type: String,
        enum: ['Asset',  'Shader', 'Diagram', 'Statue', 'Architectural Element', 'Prop'],
        require: true,
        default: 'Asset'
    },
    version: Number,
    history:{ type: [JSON] },

    valid: {type: Boolean, default: true}, //for soft deletion

    createTime: {type: Date, default: Date.now},
    deletedTime: {type: Date}, //record delete time
    lastAlterTime: {type: Date,default: Date.now}, //record last update time
    deletedBy: {type:String},
    //Shader
    shaderType: {type: Schema.ObjectId, ref: 'ShaderType'},//selection

    //Diagram
    diagramType: {type: Schema.ObjectId, ref: 'DiagramType'},
    site: {type: String},
    originalPublication: {type: Schema.ObjectId, ref: 'Publication'},


    //Model
    //levelOfDetail:{type: String, enum: ['high','low', 'optimised']},//not useful
    //culture: {type: Schema.ObjectId, ref: 'Culture'},//sel

    //Statue
    statueType: {type: Schema.ObjectId, ref: 'StatueType'},
    statueCulture: {type: Schema.ObjectId, ref: 'Culture'},
    material: {type: Schema.ObjectId, ref: 'Material'},//sel
    pose: {type: String},//typeahead
    gender: {type: String, enum: ['male', 'female', 'uncertain']},

    location: {type: String},

    //ArchitecturalElement
    architecturalCulture: {type: Schema.ObjectId, ref: 'Culture'},
    architecturalElementType: {type: Schema.ObjectId, ref: 'ArchitecturalElementType'},
    style: {type: Schema.ObjectId, ref: 'Style'},

    //Prop
    propType: {type: String, enum:['manmade', 'plant', 'animal']},
    propName: {type: Schema.ObjectId, ref: 'Prop'}
});

AssetSchema
    .virtual('createTimeFormatted')
    .get(function () {
        return this.createTime ? moment(this.createTime).format('YYYY-MM-DD hh:mm:ss') : ' ';
    });

AssetSchema
    .virtual('lastAlterTimeFormatted')
    .get(function () {
        return this.lastAlterTime ? moment(this.lastAlterTime).format('YYYY-MM-DD hh:mm:ss') : ' ';
    });

AssetSchema
    .virtual('deletedTimeFormatted')
    .get(function () {
        return this.deletedTime ? moment(this.deletedTime).format('YYYY-MM-DD hh:mm:ss') : ' ';
    });

AssetSchema
    .virtual('downloadLink')
    .get(function () {

        for(let i = 0; i < this.history.length; i++){
            if(this.history[i].activated === true){
                return this.trueLocation + this.history[i].name;
            }
        }
    });

AssetSchema
    .virtual('activatedVersion')
    .get(function() {
        for (let i = 0; i < this.history.length; i++) {
            if (this.history[i].activated === true) {
                return this.history[i]
            }
        }
    });


module.exports = mongoose.model('Asset', AssetSchema);
