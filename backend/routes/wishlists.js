const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//Add book to wishlists
router.put("/add-book-to-wishlist", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookwishlist = userData.wishlists.includes(bookid);
        if(isBookwishlist){
            return res.status(200).json({ message: "Book is already in wishlists" });
        }
        await User.findByIdAndUpdate(id, { $push: { wishlists: bookid }});
        return res.status(200).json({ message: "Book added to wishlists" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"})
    }
});
//Delete book from wishlists
router.put("/delete-book-from-wishlist", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookwishlist = userData.wishlists.includes(bookid);
        if(isBookwishlist){
            await User.findByIdAndUpdate(id, { $pull: { wishlists: bookid }});
        }
        return res.status(200).json({ message: "Book removed from wishlists" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"})
    }
});
//Get a user's list of wishlisted books
router.get("/get-user-wishlist", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("wishlists");
        const wishlistBooks = userData.wishlists;
        return res.status(200).json({ 
            status: "Success",
            data: wishlistBooks,
        }); 
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
    }
});

module.exports = router