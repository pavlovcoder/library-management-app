/**
 * @fileOverview  View methods for the use case "update book"
 * @author Gerd Wagner
 */
pl.view.updateBook = {
  /**
   * initialize the updateBook form
   */
  setupUserInterface: function () {
    var formEl = document.forms['Book'],
        submitButton = formEl.commit,
        selectBookEl = formEl.selectBook;
    // set up the book selection list
    util.fillSelectWithOptions( Book.instances, selectBookEl, "isbn", "title");
    // when a book is selected, populate the form with its data
    selectBookEl.addEventListener("change", function () {
      var book=null, bookKey = selectBookEl.value;
      if (bookKey) {
        book = Book.instances[bookKey];
        formEl.isbn.value = book.isbn;
        formEl.title.value = book.title;
        formEl.year.value = book.year;
        if (book.edition) formEl.edition.value = book.edition;
        else formEl.edition.value = "";
      } else {
        formEl.reset();
      }
    });
    // add event listeners for responsive validation
    formEl.title.addEventListener("input", function () { 
        formEl.title.setCustomValidity( 
            Book.checkTitle( formEl.title.value).message);
    });
    formEl.year.addEventListener("input", function () { 
        formEl.year.setCustomValidity( 
            Book.checkYear( formEl.year.value).message);
    });
    formEl.edition.addEventListener("input", function () { 
        formEl.edition.setCustomValidity( 
            Book.checkEdition( formEl.edition.value).message);
    });
    submitButton.addEventListener("click", this.handleSubmitButtonClickEvent);
    // neutralize the submit event
    formEl.addEventListener( 'submit', function (e) { 
        e.preventDefault();
        formEl.reset();
    });
    // take care of saving data when the app is closed 
    window.addEventListener("beforeunload", function () {
        Book.saveAll(); 
    });
  },
  /**
   * check data and invoke update
   */
  handleSubmitButtonClickEvent: function () {
    var formEl = document.forms['Book'];
    var slots = { isbn: formEl.isbn.value, 
        title: formEl.title.value,
        year: formEl.year.value,
        edition: formEl.edition.value 
    };
    // set error messages in case of constraint violations
    formEl.title.setCustomValidity( Book.checkTitle( slots.title).message);
    formEl.year.setCustomValidity( Book.checkYear( slots.year).message);
    formEl.edition.setCustomValidity( 
            Book.checkEdition( formEl.edition.value).message);
    if (formEl.checkValidity()) {
      Book.update( slots);
    }
  }
};