module.exports.notFoundHandler = (req, res, next) => {
  res.status(404).send("Not found");
};

module.exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
};
