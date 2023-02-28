const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contact = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true}
})

const Contact = mongoose.model("Contact", contact)
module.exports = Contact