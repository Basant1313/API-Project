// MongoDB Operators -> PowerFull


// Logical Operators


//$inc -> increment , -1,-2,-3 ( we donn not decrement operator in MongoDB )

// $min -> minimum

//$max -> maximum

//$set -> used to set a data 

// book.title = "xyz" -> this actually the meaning of set.

//$unset -> removing a property from an object

// example of unset = book {

    // title: " Hello "  here the unset is used we don't want to delete the object but we want to remove the property of an object.
//}

// Array operators =
//$push -> insert 
// $pop -> used to extrac/delete/remove the last element
//$pull -> extract/remove/delete any of the element but we can also store it.because in pop we can access the last element but in pull we can access any element
//example of pull
// name = ["bal0r" , "xyzzz"]
// pull : {

// name : "xyzzz"
// }

//$addToset -> it doesn't allow duplicate (its same as push but its not contain duplicates)