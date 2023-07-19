const { nanoid } = require('nanoid');

const books = require('./books');

const handleCreateBooks = (request, h) => {
  let response;
  const { name, pageCount, readPage } = request.payload

  if (readPage > pageCount) {
    response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400)

    return response;
  }

  if (name) {
    const id = nanoid(16);
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const book = {
      id,
      ...request.payload,
      finished,
      insertedAt,
      updatedAt
    };

    books.push(book);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
  
      return response;
    }
  } else {
    response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400)
  }

  return response;
}

const handleReadBooks = (request, h) => {
  if (request.params.bookId) {
    const bookId = request.params.bookId;

    return `get book id ${bookId}`
  }

  return `read all books`;
}

const handleUpdateBooks = (request, h) => {

  return `handleUpdateBooks`;
}

const handleDeleteBooks = (request, h) => {

  return `handleDeleteBooks`;
}

module.exports = {
  handleCreateBooks,
  handleReadBooks,
  handleUpdateBooks,
  handleDeleteBooks
}