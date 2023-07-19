const { 
  handleCreateBooks,
  handleReadBooks,
  handleUpdateBooks,
  handleDeleteBooks
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handleCreateBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId?}',
    handler: handleReadBooks
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handleUpdateBooks
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handleDeleteBooks
  }
];

module.exports = routes;
