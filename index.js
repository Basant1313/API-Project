const express = require("express");

//Importing body Parser
const bodyParser = require("body-parser");
//Database
const database = require("./database")//since it is in same file so we are using ./

//initialise express

//Creating Book Management Project 
const booky= express();

//Allow the express the body and convert it into json format so that user as well as machine can understand
booky.use(bodyParser.urlencoded({extended: true})); /*this is something we have to use when we are dealing with POST request */

booky.use(bodyParser.json()); //bodyparser should use only json format
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

/*
Route           /author
Description    Get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET

*/

booky.get("/author",(req,res) => {
    return res.json({author: database.author});
});


/*
Route           /author/book
Description    Get all authors based on Book
Access          PUBLIC
Parameter       isbn
Methods         GET

*/

booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor === 0){
        return res.json({error : `No Author Found for the book of ${req.params.isbn}`});
    }

    return res.json({author : getSpecificAuthor});
});

/*
Route           /publication
Description    Get all Publication
Access          PUBLIC
Parameter       NONE
Methods         GET

*/

booky.get("/publication",(req,res) => {
    return res.json({publication : database.publication});
});



// POST Method Start

/*
Route           /book/new
Description    add new books
Access          PUBLIC
Parameter       NONE
Methods         POST

*/

booky.post("/book/new",(req,res) =>{
    const newBook = req.body; // fetch the body of our request
    database.books.push(newBook) // pushed new book into database
    return res.json({updatedBooks : database.books}); //giving response
    });

/*
Route           /author/new
Description    add new author
Access          PUBLIC
Parameter       NONE
Methods         POST

*/

booky.post("/author/new",(req,res) => {
const newAuthor = req.body;
database.author.push(newAuthor);
return res.json(database.author);
});

/*
Route           /publication/new
Description    add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST

*/

booky.post("/publication/new",(req,res) => {
const newPublication = req.body;
database.publication.push(newPublication);
return res.json(database.publication);
});


booky.listen(4000,() => {
    console.log("Server is up and running on PORT 4000 ")
});


