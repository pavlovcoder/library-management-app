/**
 * @fileOverview  Contains various controller functions for the use case deleteBook
 * @author Mircea Diaconescu
 */
pl.ctrl.deleteBook = {
  initialize: function () {
    pl.ctrl.deleteBook.loadData();
    pl.view.deleteBook.setupUserInterface();
  },
  /**
   * Load session data
   */
  loadData: function () {
    Book.loadAll();
  }
};