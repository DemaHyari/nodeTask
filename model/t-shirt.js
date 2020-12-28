const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;
const tShirt = new schema({
    TShirtId: Number,
    TshirtName: String,
    TshirtPrice: Number,
    quantety: Number,
    categorys: [{type: objectId , ref: 'category'}]
});
module.exports = mongoose.model('tShirt', tShirt);