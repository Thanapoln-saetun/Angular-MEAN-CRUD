const express = require("express");
const app = express();

const bookRoute = express.Router();
let Book = require("../model/Book");

// Add book
bookRoute.route("/add-book").post((req, res, next) => {
  Book.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
});

// Get all book
bookRoute.route("/").get((req, res, next) => {
  Book.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
});

// Get book
bookRoute.route("/read-book/:id").get((req, res, next) => {
  Book.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
});

// Update book
bookRoute.route("/update-book/:id").put((req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((data) => {
      res.json(data);
      console.log("Book Updated Successfully");
    })
    .catch((error) => {
      next(error);
      console.log(error);
    });
});

// Delete book
bookRoute.route("/delete-book/:id").delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.status(200).json({ msg: data });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = bookRoute;
