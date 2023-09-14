require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//Importing body Parser
const bodyParser = require("body-parser");
//Database
const database = require("./Database/database")//since it is in same file so we are using ./

// Models

const BookModel = require("./Database/book");
const PublicationModel = require("./Database/publication");
const AuthorModel = require("./Database/author");

//initialise express

//Creating Book Management Project 
const booky= express();

//Allow the express the body and convert it into json format so that user as well as machine can understand
booky.use(bodyParser.urlencoded({extended: true})); /*this is something we have to use when we are dealing with POST request */

booky.use(bodyParser.json()); //bodyparser should use only json format

mongoose.connect(process.env.MONGO_URL, // process entire URL available in .env file  and it will render it on runtime so one basically see it or hack it our database
{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    // useFindAndModify : false,
    // useCreateIndex : true
}
).then(() => console.log("Connection Established"));


// We will be using mongoose to get all the books  mongoDB and Mongoose are related to asynchorous task

// when we have asynchorous take we have follow certain rules
// write async
// when we have call function or try to find anything we have to write await
 // below changes are done


/*
Route           /
Description    Get all the books
Access          PUBLIC
Parameter       NONE
Methods         GET

*/


booky.get("/",async(req,res) =>{
    const getAllBooks = await BookModel.find();//find function - inside find function we are not putting any parameters that mean inside book model it will search the schema goto the model and check that what are the database available and print the databases because here the parameter is nothing so i will print everything 


    return res.json(getAllBooks) //books as a key and as value database.books kind of DOM
});

/*
Route           /is
Description    Get specific books on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET

*/

booky.get("/is/:isbn",async (req,res) =>{

    const getSpecificBook = await BookModel.findOne({ISBN:  req.params.isbn}); // find() find alot it will return more than one element but here we just have to find one book because isbn are uniques so that why we will write findOne() which is an another function which just return one thing only

    //  if(getSpecificBook.length === 0) -> this is not support in mongoDB( === 0) is not understand by mongoDB because its not an language

    // NULL !0=1 , !1=0
        if(!getSpecificBook){
            return res.json({error: `No book found for the ISBN of ${req.params.isbn}`})
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

booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category:  req.params.category}); // find() find alot it will return more than one element but here we just have to find one book because isbn are uniques so that why we will write findOne() which is an another function which just return one thing only

    //  if(getSpecificBook.length === 0) -> this is not support in mongoDB( === 0) is not understand by mongoDB because its not an language

    // NULL !0=1 , !1=0
        if(!getSpecificBook){
            return res.json({error: `No book found for the category of ${req.params.category}`})
        }

        return res.json({book: getSpecificBook});
});

/*
Route           /lang
Description    Get specific books on language
Access          PUBLIC
Parameter       language
Methods         GET

*/

booky.get("/lang/:language", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({language:  req.params.language}); // find() find alot it will return more than one element but here we just have to find one book because isbn are uniques so that why we will write findOne() which is an another function which just return one thing only

    //  if(getSpecificBook.length === 0) -> this is not support in mongoDB( === 0) is not understand by mongoDB because its not an language

    // NULL !0=1 , !1=0
        if(!getSpecificBook){
            return res.json({error: `No book found for the language of ${req.params.language}`})
        }

        return res.json({book: getSpecificBook});
});

/*
Route           /author
Description    Get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET

*/

booky.get("/author", async (req,res) => {

    const getAllAuthors = await AuthorModel.find();
    
    return res.json(getAllAuthors);
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

booky.get("/publication", async(req,res) => {
    const getAllPublications = await PublicationModel.find();
   
    return res.json(getAllPublications);
});



// POST Method Start

/*
Route           /book/new
Description    add new books
Access          PUBLIC
Parameter       NONE
Methods         POST

*/

booky.post("/book/new", async (req,res) =>{
    // fetching our new book from our  body we have to de-structure it. why are we destructuring it because in our body we will passing our book inside it like an object format and that is the way we can destructure it and use in mongoose and mongoDB so it is imp to destructure it.
    
    const { newBook } = req.body; // fetch the body of our request

    const addNewBook = BookModel.create(newBook);
    return res.json(
        {
            books: addNewBook,
            message:"Book was added !!!"
    
    });

    
    });

/*
Route           /author/new
Description    add new author
Access          PUBLIC
Parameter       NONE
Methods         POST

*/

booky.post("/author/new", async (req,res) => {
const { newAuthor } = req.body;
const addNewAuthor = AuthorModel.create(newAuthor);
return res.json({
    author: addNewAuthor,
    message:"Author was added !!!"
    
    });
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



 /**********PUT **********/


/*
Route           /book/update
Description     update book on isbn
Access          PUBLIC
Parameter       ISBN
Methods         PUT

*/

booky.put("/book/update/:isbn" , async (req,res) => {
        //updating database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true // this is imp parameter this is basically update the entire book and also this will update the BookTitle in backend but it will also show the new Book on frontend also like mongoDB frontend and postmen
        }
    );

    return res.json({
        books: updatedBook
    });

});
   
    
/*
Route           /book/author/update
Description     update / add a new author
Access          PUBLIC
Parameter       ISBN
Methods         PUT

*/

booky.put ("/book/author/update/:isbn" , async(req,res) =>{

    //update book database 
    const updatedBook = await BookModel.findOneAndUpdate(
        // we need bookmodel to fetch and make changes
        {
            ISBN : req.params.isbn // first parameter
        },
        {
          // we cannot use ($push) method because duplicate value can be added if we click send button by mistake

          $addToSet : {
            author : req.body.newAuthor // second parameter
          }
        },
        {
            new : true // third parameter 
        }
    );

    // update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor // first parameter  
        },
        { 
    
            $addToSet: {
                books: req.params.isbn // second parameter
            }
        },
        {
            new:true // third parameter
        }
    );

    return res.json(
        {
            books : updatedBook,
            author : updatedAuthor,
            message : "New author was added"
        }
    )
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

booky.delete("/book/delete/:isbn", async (req,res) => {

    // which ever book that does match with isbn ,just send it to an updatedbookDatabase array 
    // and rest will be filter out 


    // we are using filter instead of slicing and all because map and filter has low time complexity .
    
    // whenever you want to return something you should map and filter   and if you replace the data or change the data then you use foreach loop.

    // Now we will be using delete of entire like mongoDB and then will b modify to perform the delete operation

    const updatedbookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN : req.params.isbn
        }
    );

    return res.json(
        {
            books : updatedbookDatabase
        }
    )

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


