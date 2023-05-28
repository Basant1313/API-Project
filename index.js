const express = require("express");

//Database
const database = require("./database")//since it is in same file so we are using ./

//initialise express

//Creating Book Management Project 
const booky= express();

/*
Route           /
Description    Get all the books
Access          PUBLIC
Parameter       NONE
Methods         GET

*/

booky.get("/",(req,res) =>{
    return res.json({books:database.books}) //books as a key and as value database.books kind of DOM
});

/*
Route           /is
Description    Get specific books on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET

*/

booky.get("/is/:isbn",(req,res) =>{
    const getSpecificBook = database.books.filter(
        (book)=>book.ISBN === req.params.isbn
        );

        if(getSpecificBook.length === 0){
            return res.json({error: `No book found foe the ISBN of ${req.params.isbn}`})
        }

        return res.json({book: getSpecificBook});
});

/*
Route           /c
Description    Get specific books on category
Access          PUBLIC
Parameter       category
Methods         GET

*/

booky.get("/c/:category",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )

    if(getSpecificBook.length === 0){
        return res.json({error:`No Book for the category of ${req.params.category}`})
    }
    return res.json({book:getSpecificBook});
});

/*
Route           /lang
Description    Get specific books on language
Access          PUBLIC
Parameter       language
Methods         GET

*/

booky.get("/lang/:language",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    )

    if(getSpecificBook.length === 0){
        return res.json({error: `No Book for language of ${req.params.language}`})
    }

    return res.json({book:getSpecificBook});
});

booky.listen(4000,() => {
    console.log("Server is up and running on PORT 4000 ")
});


