var books = []
var book1 = 'All the Light We Cannot See';
var book2 = 'The Silent Sister';
var book3 = 'A Man Called Ove'
var book4 = 'Big Little Lies';

getBook(book1);
getBook(book2);
getBook(book3);
getBook(book4);

function getBook( bookName){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resObj = JSON.parse(xhttp.responseText);
      var title = resObj.items[0].volumeInfo.title;
      var img = resObj.items[0].volumeInfo.imageLinks.thumbnail;
      var date = resObj.items[0].volumeInfo.publishedDate;
      var author = resObj.items[0].volumeInfo.authors[0];
      var reviews = resObj.items[0].volumeInfo.ratingsCount;
      var rate = resObj.items[0].volumeInfo.averageRating;
      var book = {title: title,
                  date_published: date,
                  author: author,
                  reviews: reviews,
                  rate: rate,
                  img: img}
      books.push(book);
      upDateDOM();
    }
  }
  // Send an asynchronous HTTP GET request to the given end point (url)
  xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + bookName, true);
  xhttp.send();  
}







function createBookItem(bookObj) {
  var liElem = document.createElement('li')
  var a = document.createElement('a')
  var aText = document.createTextNode(bookObj.title)
  a.appendChild(aText)
  a.title = bookObj.title

  liElem.appendChild(a)




  var ulElem = document.createElement('ul')
  var liElem0 = document.createElement('li')
  var liElem1 = document.createElement('li')
  var liElem2 = document.createElement('li')
  var liElem3 = document.createElement('li')
  var liElem4 = document.createElement('li')
  var img = document.createElement('img')
  var date = document.createElement('div')
  var auther = document.createElement('div')
  var reviews = document.createElement('div')
  var stars = document.createElement('div')
  img.setAttribute('width','125')
  img.setAttribute('height','150')
  img.src = bookObj.img
  var pDate = document.createTextNode("Date: "+bookObj.date_published)
  var pAuther = document.createTextNode("Author: "+bookObj.author)
  var pReviews = document.createTextNode("Reviews: "+bookObj.reviews)
  var pStars = document.createTextNode("Rate: "+bookObj.rate)
  date.appendChild(pDate)
  auther.appendChild(pAuther)
  reviews.appendChild(pReviews)
  stars.appendChild(pStars)
  liElem0.appendChild(img)
  liElem1.appendChild(date)
  liElem2.appendChild(auther)
  liElem3.appendChild(reviews)
  liElem4.appendChild(stars)
  ulElem.appendChild(liElem0)
  ulElem.appendChild(liElem1)
  ulElem.appendChild(liElem2)
  ulElem.appendChild(liElem3)
  ulElem.appendChild(liElem4)
  liElem.appendChild(ulElem)

  return liElem
}

function sortByReviews (){
  books.sort(function (a, b) {
    return b.reviews - a.reviews
  })
}
function sortByPriceHigh (){
  books.sort(function (a, b) {
    return b.price > a.price
  })
}
function sortByPriceLow (){
  books.sort(function (a, b) {
    return b.price < a.price
  })
}
function sortByRating (){
  books.sort(function (a, b) {
    return b.rate - a.rate
  })
}

function upDateDOM() {
  var ulBooks = document.getElementById('books-list')
  ulBooks.innerHTML = ''
  for (item of books) {
    ulBooks.appendChild(createBookItem(item))
  }
}

// Sort by, select event
var select = document.getElementById("sort-books")
select.onchange = function () {
  if (select.value === 'reviews') {
    sortByReviews()
    upDateDOM()
  }
  else if (select.value === 'rating') {
    sortByRating()
    upDateDOM()
  }

}
