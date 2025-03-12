const Book = require("../models/models.book")

// import de models books
const User = require("../models/models.user")

// ----------Affichage---------

exports.booksUser = async (req, res) => {
    const {_id} = req.session.user
    console.log(_id);

    try{
       const books = await Book.find({user:_id})
       console.log(books);
       
        res.status(200).render("books-user.ejs", {books : books})
    }

    catch(err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage des livres'");
    }
}

// -------Modifier un live------------
// affichage du formulaire pour la mise a jour d'un livre
exports.bookFormulaireUpdateUser = async (req, res) => {
    const id = req.params.id
    console.log(id);

    try{

        const book = await Book.findById(id)
        // console.log(recipe);
        res.status(200).render("form-update-user.ejs", {book:book})
    }
    catch(err){
        console.log(err);
        res.status(500).send("erreur lors de l'affichage")
    }
}

// mise a jour d'un livre
exports.bookUpdateUser = async (req,res) => {

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