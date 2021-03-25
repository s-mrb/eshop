const asyncHandler = require('express-async-handler')
const Product = require('../db/models/Product')
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const reviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (reviewed) {
      res.status(400)
      throw new Error('Already Reviewed!')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

module.exports = addReview
