export const apiPath = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/update-profile",
  },

  BOOK: {
    CREATE_BOOK: "/api/books",
    GET_BOOKS: "/api/books",
    GET_BOOK_BY_ID: (id) => `/api/books/${id}`,
    UPDATE_BOOK: (id) => `/api/books/${id}`,
    DELETE_BOOK: (id) => `/api/books/${id}`,
    UPDATE_COVER: "/api/books/cover",
  },

  AI: {
    GENERATE_OUTLINE: "/api/ai/generate-outline",
    GENERATE_CHAPTER_CONTENT: "/api/ai/generate-chapter",
  },

  EXPORT: {
    PDF: (bookId) => `/api/export/book/${bookId}/pdf`,
    DOCX: (bookId) => `/api/export/book/${bookId}/docx`,
  },
};
