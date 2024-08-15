function Book(title, author, year, genre, photo, availableCopies) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.genre = genre;
  this.photo = photo;
  this.isCheckedOut = false;
  this.availableCopies = availableCopies;
}

Book.prototype.checkOut = function () {
  if (this.availableCopies > 0) {
    this.isCheckedOut = true;
    this.availableCopies -= 1;
    updateStatus(this);
  } else {
    alert("No copies available for check out");
  }
};

Book.prototype.returnBook = function () {
  this.isCheckedOut = false;
  this.availableCopies += 1;
  updateStatus(this);
};

Book.prototype.reserveBook = function () {
  if (this.isCheckedOut) {
    alert(
      `The book "${this.title}" is currently checked out. It has been reserved for you.`
    );
  } else {
    alert(`The book "${this.title}" is available. No need to reserve.`);
  }
};

Book.prototype.updateDetails = function (
  newTitle,
  newAuthor,
  newYear,
  newGenre,
  newPhoto
) {
  this.title = newTitle || this.title;
  this.author = newAuthor || this.author;
  this.year = newYear || this.year;
  this.genre = newGenre || this.genre;
  this.photo = newPhoto || this.photo;
  updateBookDisplay(this);
};
const books = [
    new Book("MarcoPart1", "Rushikesh", 2023, "Fiction", "./IMG_0855.jpg", 3),
    new Book("Intro to JS", "vamshi", 2024, "Education", "./IMG_0855.jpg", 5),
  ];

//   books[0].updateDetails("Why Are You Not Mine", "Bharat", 2022, "Love", "./IMG_0855.jpg");


function updateBookDisplay(book) {
  document.getElementById("title").textContent = book.title;
  document.getElementById("author").textContent = book.author;
  document.getElementById("year").textContent = book.year;
  document.getElementById("genre").textContent = book.genre;
  document.getElementById("book-photo").src = book.photo;
  document.getElementById("available-copies").textContent =
    book.availableCopies;
  updateStatus(book);
}

function updateStatus(book) {
  let statusElement = document.getElementById("status");
  statusElement.textContent = book.isCheckedOut ? "Checked Out" : "Available";
}



let currentBook = books[0];
updateBookDisplay(currentBook);

function searchBooks(query) {
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.genre.toLowerCase().includes(query.toLowerCase())
  );
  if (filteredBooks.length > 0) {
    currentBook = filteredBooks[0];
    updateBookDisplay(currentBook);
  } else {
    alert("No books found.");
  }
}

document.getElementById("search-btn").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  searchBooks(query);
});

document.getElementById("check-out-btn").addEventListener("click", function () {
  if (currentBook) {
    currentBook.checkOut();
  }
});

document.getElementById("return-btn").addEventListener("click", function () {
  if (currentBook) {
    currentBook.returnBook();
  }
});

document.getElementById("reserve-btn").addEventListener("click", function () {
  if (currentBook) {
    currentBook.reserveBook();
  }
});
