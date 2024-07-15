const interceptor = async (req, res, next) => {
  console.log({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body, // Make sure body-parser middleware is used before this interceptor
  });
  next();
};

module.exports = interceptor;
