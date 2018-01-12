/**
 * @fileOverview  Contains various controller functions for the use case updateBook
 * @author Mircea Diaconescu
 */
pl.ctrl.updateBook = {
  initialize: function () {
    pl.ctrl.updateBook.loadData();
    pl.view.updateBook.setupUserInterface();
  },
  /**
   *  Load session data
   */
  loadData: function () {
    Book.loadAll();
  }
};