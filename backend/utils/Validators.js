module.exports.validatePost = (
    title,
    author,
    ISNB,
    genres,
    url,
    ) => {
    const errors = {};
    if (title.trim() === '') {
        errors.title = 'title must not be empty';
    }
    if (author.trim() === '') {
        errors.author = 'author must not be empty';
    }
    if (ISNB.trim() === '') {
        errors.ISNB = 'ISNB must not be empty';
    }
      if (genres.trim() === '') {
        errors.genres = 'genres must not be empty';
      }
      if (url.trim() === '') {
        errors.url = 'url must not be empty';
      }
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };