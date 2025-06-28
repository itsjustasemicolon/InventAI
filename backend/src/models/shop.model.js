const mongoose = require('mongoose');
const Admin = require("../models/admin.model.js"); 
const shopSchema = new mongoose.Schema({
    shopId : {
        type: String,
        required: true,
        unique: true
    },
    shopName: {
        type: String,
        required: true
    },
    admin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin,
    }
});
const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
