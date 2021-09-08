const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Menu = new Schema({
  name:{type: String, required: true, unique: true} ,
  description:{type: String, required: true},
  lunchPrice:{type: Number, required: true} ,
  dinnerPrice:{type: Number, required: true} ,
  category:{type: String, required: true},
  image:{type: String}

})

module.exports = Menu;