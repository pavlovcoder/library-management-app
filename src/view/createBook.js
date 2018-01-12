/**
 * @fileOverview  View methods for the use case "create book"
 * @author Gerd Wagner
 */
pl.view.createBook = {
  /**
   * initialize the createBook form
   */
  setupUserInterface: function () {
    var formEl = document.forms['Book'],
        submitButton = formEl.commit;
    formEl.isbn.addEventListener("input", function () { 
        formEl.isbn.setCustomValidity( 
            Book.checkIsbnAsId( formEl.isbn.value).message);
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
        e.preventDefault();;
        formEl.reset();
    });
    // take care of saving data when the app is closed 
    window.addEventListener("beforeunload", function () {
        Book.saveAll(); 
    });
  },
  /**
   * save session data
   */
  handleSubmitButtonClickEvent: function () {
    var formEl = document.forms['Book'];
    var slots = { isbn: formEl.isbn.value, 
          title: formEl.title.value,
          year: formEl.year.value
    };
    // set error messages in case of constraint violations
    formEl.isbn.setCustomValidity( Book.checkIsbnAsId( slots.isbn).message);
    formEl.title.setCustomValidity( Book.checkTitle( slots.title).message);
    formEl.year.setCustomValidity( Book.checkYear( slots.year).message);
    if (formEl.edition.value) {
      slots.edition = formEl.edition.value;
      formEl.edition.setCustomValidity( Book.checkEdition( slots.edition).message);
    }
    // save the input data only if all of the form fields are valid
    if (formEl.checkValidity()) Book.add( slots);
  }
};