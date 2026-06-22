const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    avatar: {
        type: String, 
        default: "https://cdn-icons-png.flaticon.com/128/3177/317740.png",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    cart: [
        {
        type: mongoose.Types.ObjectId,
        ref: "books",
        }
    ],
    orders: [
        {
        type: mongoose.Types.ObjectId,
        ref: "order",
        },
    ],
    //Refer to the diagrams for better understanding of the requirements
    address: {
        type: String, 
        required: true,
    },
    wishlists: [
        { 
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],

  }, 
  { timestamps: true }
);

module.exports = mongoose.model("user", user);