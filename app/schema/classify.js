const mongoose = require('mongoose');
const classifySchema = mongoose.Schema({
  name:String
})
module.exports = mongoose.model('classifies',classifySchema)
















