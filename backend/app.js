/* 
    Bugs:
    1. Port 1000 constantly caused the server to start and shut down.
        Console Log: 
            [nodemon] starting `node app.js`
            Server Started...
            [nodemon] clean exit - waiting for changes before restart.
        Solution: Changed the port 1000 to 3000. 
        Possible reason: Port 1000 must have been in use.
*/

const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");
const Wishlists = require("./routes/wishlists");
const Cart = require("./routes/cart");
const Orders = require("./routes/order");
app.use(express.json());

//Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Wishlists);
app.use("/api/v1", Cart);
app.use("/api/v1", Orders);

//Creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});
