// importe mongoose pour créer sont schema
const mongoose = require("mongoose");

// id automatiquement recuperé

// defini un model
const bookSchema = mongoose.Schema ({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    title: {type: String, required:true},
    author: {type: String, required: true},
    year_of_publication: {type: Number, required: true},
    owner: {type: String, required: true},
})

// creation de constante en majuscule et singulier convention de nomage avec mongoose
const Book = mongoose.model("Books", bookSchema)

// export le module
module.exports = Book