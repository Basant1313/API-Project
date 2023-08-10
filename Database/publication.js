const mongoose = require("mongoose");

// create publication schema

// way to create schema
const PublicationSchema = mongoose.Schema (
    {        
        // Schema is ready it basically contain key-value(data-type) pair  where we will be creating our entire database inside mongoDB 
        
            id:Number,
            name:String,
            books:[String]
        
    }
    
    );


    // Make a Model- because we cannot directly use the schema we have use it in terms of model

    const PublicationModel = mongoose.model("publications",PublicationSchema) //-> "books" is basically the database name in the mongoDB.BookSchema is schema name.

    // Export the module

    module.exports = PublicationModel // so from here our book model will get export and we will using it in index.js file