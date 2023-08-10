const mongoose = require("mongoose");

// create book schema

// way to create schema
const BookSchema = mongoose.Schema (
    {        
        // Schema is ready it basically contain key-value(data-type) pair  where we will be creating our entire database inside mongoDB 
        ISBN: String,
        title: String,
        pubDate: String,
        language:String,
        numPage: Number,
        author:[Number],
        publications:[Number],
        category:[String]
    }
    
    );


    // Make a Model- because we cannot directly use the schema we have use it in terms of model


    // If below throwa error of overwrite then use another syntac
    // const BookModel = mongoose.model("books",BookSchema)
    const BookModel =mongoose.model.books || mongoose.model("books",BookSchema);
    
    
    //-> "books" is basically the database name in the mongoDB.BookSchema is schema name.

    // Export the module

    module.exports = BookModel // so from here our book model will get export and we will using it in index.js file