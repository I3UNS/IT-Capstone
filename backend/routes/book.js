const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

//Add book --> Admin
router.post("/add-book", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin"){
            return res.status(400).json({ message: "You do not have admin access" });
        }
        const book = new Book({
            url: req.body.url, 
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
});
//Update book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        
        /*  BUG: bookId is undefined despite being declared in the headers tab. 
            Solution: Express converts all params in lowercase. Thus it is case sensitive ( bookId !== bookid ).
        */
        const { bookid }= req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url, 
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
        });
        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred" });
    }
});
//Delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred." });
    }
});
//Show all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
    }
});
//Show recently added books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
    }
});
//Find book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;               
        const book = await Book.findById(id);
        console.log(id, book);
        return res.json({
            status: "Success",
            data: book,
        });

    } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
    }
});
module.exports = router;