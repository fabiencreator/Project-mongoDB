// import express
const express = require("express")

// utilisation de la méthode router() pour gerer plusieurs routes
const router = express.Router()

// importe controller
const userBookController = require("../controller/controller-user-book")

// import de middleware 
const authuser = require("../middleware/authUser")

// ----------Affichage----------
// affichage de l'ensemble des livres
router.get("/books-user",authuser, userBookController.booksUser)

// ---------Mise à jour---------
// affichage du formulaire pour la mise a jour d'un livre
router.get("/book-formulaire-update-user/:id",authuser,  userBookController.bookFormulaireUpdateUser)

// mise a jour d'un livre
router.put("/book-update-user/:id",authuser,  userBookController.bookUpdateUser)

module.exports = router