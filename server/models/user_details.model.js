const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserDetailsSchema = new Schema({
    name: {type: String, required: true},
    email : {type: String, required: true},
    password : { type: String, required: true},
    loyalty_card_no : { type: String, required: false}, 
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
});


// Export the model
module.exports = mongoose.model('user_details', UserDetailsSchema);
