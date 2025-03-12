💻 Installation des dépendances :
    "bcrypt", "body-parser", "dotenv", "ejs", "express", "express-session", "method-override", "mongoose", "nodemon", "cors", "nodemailer".

🔗 Connexion à la base de données MongoDB.

🛠️ Création d'un script dans package.json : npm run dev

🪪 Deux rôles : user / admin :
        User : la possibilité d'ajouter un nouveau livre / modifier ses livres ajoutés.
        Admin : la possibilité de supprimer tous les livres / modifier tous les livres.

    *Seule la page d'accueil est accessible sans connexion : "/"
    *Afin d'accéder à la liste des livres, il faut s'identifier : "/books"

🖥️ Utilisation du moteur de template : EJS

🔒 Sécurisation des routes avec les middlewares pour les rôles : user, admin et user/admin.

🛡️ Utilisation de sessions pour maintenir la connexion d'un utilisateur.