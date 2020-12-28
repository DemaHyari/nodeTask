const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
let schema = mongoose.Schema;
let category = new schema({
    categoryName: {type: String , required: true, default:"No Name"},
    categoryID: Number,
});
module.exports = mongoose.model('category', category);