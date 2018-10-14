const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true},
    category : {type: String, required: true},
    sub_category : { type: String, required: false},
    price : { type: Number, required: true},
    details : { type: String, required: false}, 
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('product_schema', ProductSchema);
