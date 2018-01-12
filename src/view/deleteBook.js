/**
 * @fileOverview  Contains various view functions for the use case deleteBook
 * @author Mircea Diaconescu
 * @author Gerd Wagner
 */
pl.view.deleteBook = {
  /**
   * Initialize the deleteBook form
   */
  setupUserInterface: function () {
    var formEl = document.forms['Book'],
        deleteButton = formEl.commit,
        selectBookEl = formEl.selectBook;
    // set up the book selection list
    util.fillSelectWithOptions( Book.instances, selectBookEl, 
        "isbn", "title");
    deleteButton.addEventListener("click", function () {
        var isbn = selectBookEl.value;
        if (isbn) {
          Book.destroy( isbn);
          // remove deleted book from select options
          selectBookEl.remove( selectBookEl.selectedIndex);
        }
    });
    window.addEventListener("beforeunload", function () {
        Book.saveAll(); 
    });
  }
};