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


/*
Route           /publication/upadate/book
Description     update and add a new publication
Access          PUBLIC
Parameter       ISBN
Methods         PUT

*/

booky.put("/publication/update/book/:isbn",(req,res) =>{
//update the publication database
database.publication.forEach((pub) =>{ 
    // we want update the entire database but we don't want anything to be returned that,s why we are using for each loop
    if(pub.id === req.body.pubId){ 
        // so we will check that pulication which is in database is equal to pubId we have passed in our request then we will pushing(isbn) the that request. 
      return pub.books.push(req.params.isbn);
    }
});

//Update the book database
database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
        book.publications = req.body.pubId;
        return;
    }
});
return res.json(
    {
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"
    }
)
});



/*** DELETE ***/

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       ISBN
Methods         DELETE

*/

booky.delete("/book/delete/:isbn", (req,res) => {

    // which ever book that does match with isbn ,just send it to an updatedbookDatabase array 
    // and rest will be filter out 


    // we are using filter instead of slicing and all because map and filter has low time complexity .
    
    // whenever you want to return something you should map and filter   and if you replace the data or change the data then you use foreach loop.


    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
         database.books = updatedBookDatabase;

         return res.json({books : database.books})

});

/* In this we will use multiple parameter
 Route          /book/delete/author
Description     delete an author from a book and vice versa
Access          PUBLIC
Parameter       ISBN,authorId
Methods         DELETE

*/

//so first we go and check the ISBN is equal to whatever the ISBN is provided in the parameter then we basically go inside that particular and in that particular book also we have entire array of author and we iterate entire arrray of author we will filter out which is not equal to authorId provided in the parameter because the authorId provided in the parameter has to be deleted .The authorId which are not matching we will store them in new array and we will be assigning the book.author with the entire new array
booky.delete("/book/delete/author/:isbn/:authorId",(req,res) =>{


    //update the book database 
    database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
        const newAuthorList = book.author.filter(
            // if is good practice to use parseInt because whenever you are having in your parameter and your accesing it because it is possible this thing is in string format
            (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
        );

        book.author = newAuthorList;
        return;
    }

    });
    

    //update the author database

    // go to the author array of object having id  is equal to the id provided in the parameter if its having so then go inside that particular object and check if isbn is equal to the isbn provided in the parameters if it is so then keep that book aside and rest all book filter them out into new array and then update author book array to the new book array

    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)){
            const newBookList = eachAuthor.books.filter(
                (book)=>book !== req.params.isbn
            );
            eachAuthor.books = newBookList;
        }
    })


    return res.json({
        book:database.books,
        author:database.author,
        message:"Author was deleted!!! "
    });
});

booky.listen(4000,() => {
    console.log("Server is up and running on PORT 4000 ")
});


