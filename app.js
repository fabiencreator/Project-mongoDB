// Importe Express
const express = require("express");

// crée une instance de l'application Express
const app = express();

// j'importe methode-override afin utilise la methode DELETE/PUT/PATCH
const methodOverride = require('method-override');

// Importe Body-parser
const bodyParser = require("body-parser")

// permet de charger la variable d'environement a partir d'un fichier .env
require("dotenv").config();

// créer constante avec le numero de port et celui par default
const port = process.env.PORT || 3005;

// j'importe express-session 
const session = require("express-session")

// Importe cors
const cors = require('cors');

app.use(cors());

//------------ Maintenir une session avec express session ----------
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    // Durée de la session
    maxAge: 6555555, 
     // Empêche l'accès par JavaScript
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production' 
  }
  }));

  app.use((req, res, next) => { 
    res.locals.user = req.session.user;
    console.log(res.locals.user);
    next();
  });

// ---------utilisation EJS--------
// indique a l'application express d'utiliser EJS 
// (permet de generé HTML en integrant JavaScript)
// quand on utilise res.render() express sait qu'il doit utiliser EJS
app.set("view engine", "ejs");
// Definit le repertoire ./views a la racine 
// cela permet à express ou chercher les fichiers EJS
app.set("views", "./views");

// ----------Import de fichier--------
// import de fichiers
const connectDB = require("./dataBase/connect");
const routeBook = require("./routes/route-book");
const routeUser = require("./routes/route-user")
const routeUserBook = require("./routes/route-user-book")

// ---------------DataBase-------------
// dataBase appelle la fonction du fichier connect
connectDB();

// Middleware pour permettre l'utilisation de DELETE, PUT et PATCH
app.use(methodOverride('_method'));

// -------------Body-parser-------------
// utilisation de Body-parser pour analyser le corp de la req
//le corpt de la requete en json
app.use(bodyParser.json())
//permet de rendre accessible les donnée encodée dans l’URL d'un formulaire avec (Req.body)
// extented:true car j’utilise des d'objet ou de tableau dans mon formulaire
app.use(bodyParser.urlencoded({extended:true})) 

// ----------Routes---------
// utilisation des routes 
app.use(routeBook)
app.use(routeUser)
app.use(routeUserBook)

// -----------PORT SERVER-----------
// permet de demarrer le server
app.listen(port, () => {
    console.log("le port d'écoute est " + port);
  });