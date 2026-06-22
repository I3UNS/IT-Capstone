const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");

//Place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order){
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            //Saving order in user model
            await User.findByIdAndUpdate( id, {
                $push: { orders: orderDataFromDb._id },
            });

            //Clearing the cart
            await User.findByIdAndUpdate( id, {
                $pull: { cart: orderData._id },
            });
        };
        return res.json({
            status: "Success",
            message: "Order has been placed successfully.",
        });
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred." });
    }
});
//Get a user's order history
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book"},
        });

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred." });
    }
});
//Get all orders --> Admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({
                path: "book",
            })
            .populate({
                path: "user",
            })
            .sort({ createdAt: -1 });

        return res.json({ 
            status: "Success",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred." });
    }
});
//Update order status --> Admin
router.put("/update-order-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        
        //Check admin access
        const user = await User.findById(id);
        if (user.role !== "admin"){
            return res.status(400).json({ message: "You do not have admin access" });
        };

        await Order.findByIdAndUpdate( id, {
            status: req.body.status
        });
        return res.json({
            status: "Success",
            message: "Status has been updated successfully.",
        });
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred." });
    }
});
module.exports = router;