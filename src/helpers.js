// Accept these errors
exports.wtf = (err) => {
  if (/branch\s+master\s+-> FETCH_HEAD/.test(err.message)) return;
  if (/master -> master/.test(err.message)) return;
  if (/Everything up-to-date/.test(err.message)) return;
  throw err;
};

// Only throw if the error is not 0
exports.stderrok = (error) => {
  // 0 or undefined should be ignored
  if (!error.code) return;
  throw error;
};
