// import express
const express = require("express")

// utilisation de la méthode router() pour gerer plusieurs routes
const router = express.Router()

// importe controller
const userController = require("../controller/controller-user")

// import de middleware 
const authUserAdmin = require("../middleware/authUserAdmin")

// ---------inscription------------
// Inscription / affichage
router.get("/register", userController.register)

// Inscription / post le formulaire 
router.post("/register-user", userController.registerUser)

// ---------Connexion---------
// connexion / affichage
router.get("/login", userController.login)

// connexion / envoie des données de connexion
router.post("/login-user", userController.loginUser)

// -------------Deconnexion---------
//deconnecté l'utilisateur
router.post("/logout",authUserAdmin, userController.logout)

module.exports = router