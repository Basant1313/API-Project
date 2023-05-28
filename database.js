//Creating dataset

const books = [
    {        
        ISBN:"996511book",
        title:"Tesla",
        pubDate:"2023-05-25",
        language:"en",
        numPage: 250,
        author:[1,2],
        publication:[1],
        category:["tech","space","education"]
    }

]

const author = [
    {
        id:1,
        name:"Balor",
        books:["996511book","662811Annabelle"]
    },
    {
        id:2,
        name:"Elon Musk",
        books:["996511book"]
    },
]

const publication = [
    {
        id:1,
        name:"writeX",
        books:["996511book"]
    }
]


//this is an external dataset so we have tell this partiular file that this dataset has to be exported becuase bydefault they have the security and this cannot be used in other js file we have to export dataset.

module.exports = {books,author,publication};