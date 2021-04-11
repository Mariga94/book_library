const container = document.querySelector('.container');
const newBook = document.querySelector('.btn');
const closeBtn = document.createElement('button');
closeBtn.className='btn-close'
closeBtn.textContent = 'X'
container.prepend(closeBtn);
const inputField = document.querySelector('.form-field')

let myLibrary = [{
    title: 'Book one',
    author: 'bookwoo',
    pages: 56,
}];

class Book {
    constructor(author, title, pages) {
        this.author = author;
        this.title = title;
        this.pages = pages;
    }
}

//Store books in local storage
// localStorage.removeItem('books','${books}')
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(title) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.title === title) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

const addBookToLibrary = () => {

//get input values from the form
    const authorEl = document.querySelector('#author').value.trim();
    const titleEl = document.querySelector('#title').value.trim();
    const pagesEl = document.querySelector('#pages').value.trim();

    let addNewBook = function(authorEl, titleEl, pagesEl){
        const book = new Book(authorEl, titleEl, pagesEl);
        myLibrary.push(book);
        createDisplayCard(book);
        Store.addBook(book);
    }
    addNewBook(authorEl, titleEl, pagesEl); 
    

}

//clear input fields
const clearInputFields = () =>{
    document.querySelector('#author').value ='';
    document.querySelector('#title').value ='';
    document.querySelector('#pages').value ='';
    
}

//display books to the windows UI
const displayBooks = () => {
    const books = Store.getBooks();
    books.forEach((book) => {

        createDisplayCard(book);
    })
}


//
const createDisplayCard = (book) => {
    const table = document.querySelector('.table');
    const card = document.createElement('div');
    card.classList.add('card-container');

    const imageDiv =document.createElement('div')
    imageDiv.classList.add('image-div')
    const image = document.createElement('img');
    image.classList.add('book-image');
    image.src = " https://i.pinimg.com/originals/bd/7c/97/bd7c978f921e87f2f09afd238fa4650a.png";
    
    const textDiv = document.createElement('div');
    const btnDiv = document.createElement('div');
    btnDiv.className = 'button-btn';

    const readBtn = document.createElement('button');
    readBtn.classList = ' read', 'not-read';
    readBtn.textContent = 'read';

    const deleteBtn= document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = `Delete`;

    
    const title1= document.createElement('h6');
    title1.className = 'card-title';
    title1.textContent = `Title: ${book.title}`;

    const author1 = document.createElement('p');
    author1.className = 'card-author'
    author1.textContent = `Author: ${book.author}`

    const pages1 = document.createElement('p');
    pages1.className = 'card=pages';
    pages1.textContent = `Book pages: ${book.pages}`;

   
    imageDiv.appendChild(image);
    btnDiv.innerHTML += readBtn.outerHTML+ deleteBtn.outerHTML;
    textDiv.innerHTML += title1.outerHTML + author1.outerHTML + pages1.outerHTML;
    card.innerHTML += imageDiv.outerHTML +textDiv.outerHTML + btnDiv.outerHTML;

    table.appendChild(card);

}

//     // add book to library
document.querySelector('.book-form').addEventListener('submit',(e) => {
    e.preventDefault();
    addBookToLibrary();
    clearInputFields();
});

// // display books on load
document.addEventListener('DOMContentLoaded', displayBooks());


//Book library Event listners

//open form
newBook.addEventListener('click',() =>{
    container.style.display = 'block'
    console.log('open-pop-up')
    }
    )
    
    
//     //close form 
    closeBtn.addEventListener('click',() => {
        container.style.display = 'none';
        console.log('close-pop-up')
    })

    document.querySelector('.delete-btn').addEventListener('click',() => {
        console.log('pressed');
        Store.removeBook();
    })
    

   
