const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;
const orders = new schema({
    ordersNumber: Number,
    orderDateTime: String,
    customerPhoneNumber: String,
    tShirts: [{type: objectId , ref: 'tShirt'}]
});
module.exports = mongoose.model('orders', orders);