const base = require("@playwright/test");

exports.customtest =base.test.extend
(
    {
testDataForOrder:
    {
    username:"RY@gmail.com",
    password:"Password123",
productName :"iphone 13 pro"
},

});