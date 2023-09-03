import express from 'express';
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//Route for GET all books from database
router.get('/', async(req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

//Route for GET one book from database
router.get('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

//Route for update a book
router.put('/:id', async(req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }

        const result = await Book.findByIdAndUpdate(req.params.id, req.body);

        if(!result) {
            return res.status(404).json({ message: 'Book is not found!'})
        }

        return res.status(200).send({ message: 'Book is updated successfully'});
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})

//Route for delete a book
router.delete('/:id', async(req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);
        
        if(!result) {
            return res.status(404).send({ message: 'Book is not found!'})
        }

        result.deleteOne();
        return res.status(200).send({ message: 'Book is deleted successfully'})
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

//module.exports = router;
export default router;