/**
 * @fileOverview  Contains various controller functions for the use case createBook
 * @author Gerd Wagner
 */
pl.ctrl.createBook = {
  initialize: function () {
    pl.ctrl.createBook.loadData();
    pl.view.createBook.setupUserInterface();
  },
  /**
   *  Load session data
   */
  loadData: function () {
    Book.loadAll();
  }
};