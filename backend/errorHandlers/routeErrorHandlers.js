const RouteNotFound = (req, res, next) => {
  const notFoundError = new Error(`Not Found ${req.originalUrl}`)
  res.status(404)
  next(notFoundError)
}

const ServerError = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { RouteNotFound, ServerError }
