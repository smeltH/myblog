const mongoose = require('mongoose');
const userInfo = mongoose.Schema({
    username: String,
    password: String,
    isAdmin: Boolean
});
module.exports = mongoose.model('userInfos', userInfo);
