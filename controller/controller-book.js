// import de models books
const Book = require("../models/models.book")

// ----------Affichage---------

exports.homePage = async (req, res) => {
    try{ 
        res.status(200).render("homePage.ejs")
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage des livres'");
    }
}

exports.books = async (req, res) => {
    try{ 
        
            const book = await Book.find()

            return res.status(200).render("books.ejs", {book:book})

    }
    catch(err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage des livres'");
    }
}

// -----------Ajout d'un livre-------------
exports.bookFormulaireAdd = async (req, res) => {
    try{ 
        res.status(200).render("form-add.ejs")
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage des livres'");
    }
}

exports.bookAdd = async (req, res) => {
    const {title, author, year_of_publication} = req.body
    console.log(req.body);

    const id = req.session.user._id
    console.log("ceci est l'id :" , id);

    const owner = req.session.user.name
    console.log(owner);

    try{
        const book = new Book({
            user : id,
            title,
            author,
            year_of_publication,
            owner : owner
        });
        
        console.log(book);
        
        const saveBook = await book.save()
        console.log(saveBook);
        
        res.status(201).redirect("/books")
    }
    catch(err){
        console.log(err);
        res.status(500).send("erreur lors de l'envoie")
    }
}

// -------Modifier une recette------------
exports.bookFormulaireUpdate = async (req, res) => {
    const id = req.params.id
    console.log(id);

    try{
        const book = await Book.findById(id)
        // console.log(recipe);
        res.status(200).render("form-update.ejs", {book:book})
    }
    catch(err){
        console.log(err);
        res.status(500).send("erreur lors de l'affichage")
    }
}

exports.bookUpdate = async (req,res) => {

    const id = req.params.id
    console.log(id);
 
    const updateBook = req.body
    console.log(updateBook);

    owner = req.session.user.name
    updateBook.owner = owner

     try{
         
         await Book.findByIdAndUpdate(id, updateBook)

             res.status(302).redirect("/books")
             
     }
     catch(err){
         console.log(err);
         res.status(500).send("erreur lors de l'envoie")
     }
 }

//  --------supprimer un livre--------
 exports.bookDelete = async (req,res) => {

    const id = req.params.id
    console.log(id);
    
    try{

        await Book.findByIdAndDelete(id)

        // Status 200 car le status 204 pas de contenu dans la reponse
        res.status(200).redirect("/Books")
    }
    catch(err){
        console.log(err);
        res.status(500).send("erreur lors de la suppression")
    }
}