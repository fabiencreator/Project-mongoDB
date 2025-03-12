// import express
const express = require("express")

// utilisation de la méthode router() pour gerer plusieurs routes
const router = express.Router()

// importe controller
const bookController = require("../controller/controller-book")

// import de middleware 
const authAdmin = require("../middleware/authAdmin")

// import de middleware 
const authUserAdmin = require("../middleware/authUserAdmin")

// import de middleware 
const authuser = require("../middleware/authUser")

// --------Home Page--------
router.get('/', bookController.homePage)

// ----------Affichage----------
// affichage de l'ensemble des livres
router.get("/books",authUserAdmin, bookController.books)

// ----------ajout----------
// ajouter un nouveau livre
router.get("/book-formulaire-add", authuser, bookController.bookFormulaireAdd)

// ajouter un nouveau livre
router.post("/book-add", authuser, bookController.bookAdd)

// ---------Mise à jour---------
// mise a jour d'un livre
router.get("/book-formulaire-update/:id", authAdmin, bookController.bookFormulaireUpdate)

// mise a jour d'un livre
router.put("/book-update/:id", authAdmin, bookController.bookUpdate)

// ---------Supprimer-------
// ----------suppression un livre------
router.delete("/book-delete/:id",authAdmin , bookController.bookDelete)

module.exports = router