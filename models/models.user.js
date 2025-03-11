// importe mongoose pour créer sont schema
const mongoose = require("mongoose");

// id automatiquement recuperé

// defini un model
const userSchema = mongoose.Schema ({
    email: {type: String, required:true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type:String, default:"user", enum:["user", "admin"]}
})

// creation de constante en majuscule et singulier convention de nomage avec mongoose
const User = mongoose.model("Users", userSchema)

// export le module
module.exports = User