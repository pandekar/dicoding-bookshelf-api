const { nanoid } = require('nanoid');

const books = require('./books');

const handleCreateBooks = (request, h) => {
  let response;
  const { name, pageCount, readPage } = request.payload;

  // page count validation
  if (readPage > pageCount) {
    response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }

  // name validation
  if (name) {
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const book = {
      id,
      ...request.payload,
      finished,
      insertedAt,
      updatedAt,
    };

    books.push(book);

    const isSuccess = books.filter((item) => item.id === id).length > 0;

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
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
  }

  return response;
};

const handleReadBooks = (request, h) => {
  let response;

  // query parameters validation
  if (request.query) {
    if (request.query.reading) {
      const { reading } = request.query;
      if (reading === '1') {
        const getBooks = books.filter((book) => book.reading === true);
        const filteredBooks = getBooks.map((book) => {
          const { id, name: bookName, publisher } = book;

          return { id, name: bookName, publisher };
        });

        response = h.response({
          status: 'success',
          data: {
            books: filteredBooks,
          },
        });
        response.code(200);

        return response;
      }

      if (reading === '0') {
        const getBooks = books.filter((book) => book.reading === false);
        const filteredBooks = getBooks.map((book) => {
          const { id, name: bookName, publisher } = book;

          return { id, name: bookName, publisher };
        });

        response = h.response({
          status: 'success',
          data: {
            books: filteredBooks,
          },
        });
        response.code(200);

        return response;
      }
    }

    if (request.query.finished) {
      const { finished } = request.query;
      if (finished === '1') {
        const getBooks = books.filter((book) => book.finished === true);
        const filteredBooks = getBooks.map((book) => {
          const { id, name: bookName, publisher } = book;

          return { id, name: bookName, publisher };
        });

        response = h.response({
          status: 'success',
          data: {
            books: filteredBooks,
          },
        });
        response.code(200);

        return response;
      }

      if (finished === '0') {
        const getBooks = books.filter((book) => book.finished === false);
        const filteredBooks = getBooks.map((book) => {
          const { id, name: bookName, publisher } = book;

          return { id, name: bookName, publisher };
        });

        response = h.response({
          status: 'success',
          data: {
            books: filteredBooks,
          },
        });
        response.code(200);

        return response;
      }
    }

    if (request.query.name) {
      const { name } = request.query;
      const getBooks = books.filter((book) => book
        .name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
      const filteredBooks = getBooks.map((book) => {
        const { id, name: bookName, publisher } = book;

        return { id, name: bookName, publisher };
      });

      response = h.response({
        status: 'success',
        data: {
          books: filteredBooks,
        },
      });
      response.code(200);

      return response;
    }
  }

  // param id validation
  if (request.params.bookId) {
    const { bookId } = request.params;
    const result = books.filter((book) => book.id === bookId)[0];

    if (result !== undefined) {
      response = h.response({
        status: 'success',
        data: {
          book: result,
        },
      });
      response.code(200);

      return response;
    }

    response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);

    return response;
  }

  // get all books
  const resultAllBooks = books.map((book) => {
    const { id, name, publisher } = book;

    return { id, name, publisher };
  });

  response = h.response({
    status: 'success',
    data: {
      books: resultAllBooks,
    },
  });
  response.code(200);

  return response;
};

const handleUpdateBooks = (request, h) => {
  let response;

  const { bookId } = request.params;
  const { name, pageCount, readPage } = request.payload;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  // find book index with id validation
  if (bookIndex !== -1) {
    // name validation
    if (!name) {
      response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);

      return response;
    }

    // page count validation
    if (readPage > pageCount) {
      response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);

      return response;
    }

    const updatedAt = new Date().toISOString();
    books[bookIndex] = {
      ...books[bookIndex],
      ...request.payload,
      updatedAt,
    };

    response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);

    return response;
  }

  response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};

const handleDeleteBooks = (request, h) => {
  let response;
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  // find index with id validation
  if (index !== -1) {
    books.splice(index, 1);
    response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);

    return response;
  }

  response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};

module.exports = {
  handleCreateBooks,
  handleReadBooks,
  handleUpdateBooks,
  handleDeleteBooks,
};
