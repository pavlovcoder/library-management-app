/**
 * @fileOverview  Contains various controller functions for the use case listBooks
 * @author Gerd Wagner
 */
pl.ctrl.listBooks = {
  initialize: function () {
    pl.ctrl.listBooks.loadData();
    pl.view.listBooks.setupUserInterface();   
  },
  /**
   * Load session data
   */
  loadData: function () {
    Book.loadAll();
  }
};