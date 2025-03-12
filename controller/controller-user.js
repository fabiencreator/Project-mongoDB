// importe le module bcrypt
const bcrypt = require("bcrypt")

// import de models books
const User = require("../models/models.user")

// --------------Inscription---------------
// creation de la fonction async pour affichage de l'inscription
exports.register = async (req, res) => {
    try{ 
        res.status(200).render("form-inscription.ejs")
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage de l'inscription'");
    }
}

// creation de la fonction async pour l'envoie du formulaire d'inscription
exports.registerUser = async (req,res) => {

    const {email, password, name} = req.body

    try {
        // conparaisont avec la base de données si l'email existe déjà
        let userExist = await User.findOne({email: email})

        if(userExist){
          return  res.send("L'adresse mail existe déjà.")
        }

        // hashé le mot de passe en utilisant le module Bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        // ...req.body recupere tout les propriétés et ajout le mot de passe hashé 

        const user = new User({
            email,
            password: hashedPassword, 
            name
        });

        console.log(user);

        const saveUser = await user.save()

        if(saveUser){
          return res.status(201).redirect("/")
        }
    }
    catch(err){
        console.log(err);
        return res.status(302).send("Erreur lors de l'inscription")
    }
}

// -----------------connexion-----------------
// creation de la fonction async pour affichage de la connexion
exports.login = async (req,res) => {
    try{
        res.status(200).render("form-connexion.ejs")
    }
    catch(err){
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage de la connexion");
    }
}

// creation de la fonction async pour la connexion
exports.loginUser = async (req,res) => {
    try{
        // recupere email et mot de passe du formulaire
        const { email, password} = req.body

        // Vérifiez d'abord dans la collection des users si l'utilisateur existe avec a partir de cette email
        const user = await User.findOne({email});
            
            if(!user){
              return res.status(200).send("L'adresse mail ou le mot de passe ne correspond pas")
            }

            // si il correspond à un mail dans la base de donée  
            const isValid = await bcrypt.compare(password, user.password)
    
            if(!isValid) {
              return res.status(200).send("L'adresse mail ou le mot de passe ne correspond pas ")
            }
    
            // recupere a la connexion une partie des données utilisateurs pour l'affichage et l'_id
            
            req.session.user = {
                _id: user._id,
                role: user.role,
                name: user.name,
                email: user.email,
              }

        res.status(201).redirect("/") 

            }
    catch(err){
        console.log(err);
        res.status(500).send("Erreur lors de la connexion");
    }
}

// -------------Deconnexion---------
//deconnecté l'utilisateur
exports.logout = async (req,res) => {
    try{ 

    req.session.destroy()

    res.status(200).redirect('/')
    
    }catch(err){
        console.log(err);
        res.status(500).send("Erreur de la deconnexion")
        
    }
}