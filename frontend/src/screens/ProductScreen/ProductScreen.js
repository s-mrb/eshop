import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, Image, ListGroup, Form } from 'react-bootstrap'
import Rating from '../../components/Rating/Rating'
import styles from './productScreen.module.css'
import getProductDetail from '../../Redux/Actions/getProductDetail'
import { useDispatch, useSelector } from 'react-redux'
import addToCart from '../../Redux/Actions/addToCart'
import Loading from '../../components/Loading/Loading'
import Message from '../../components/Message/Message'
import Comment from '../../components/Comment/Comment'
import addReview from '../../Redux/Actions/addReview'
import resetAddReview from '../../Redux/Actions/resetAddReview'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const ProductScreen = ({ match }) => {
  const productDetail = useSelector((state) => state.productDetail)
  const { user } = useSelector((state) => state.loggedUser)
  const {
    loading: addReviewLoading,
    success: addReviewSuccess,
    error: addReviewError,
  } = useSelector((state) => state.addReview)

  const product_id = match.params.id
  const [inputError, setInputError] = useState('')
  const { loading, product, error } = productDetail
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  useEffect(() => {
    dispatch(getProductDetail(product_id))
  }, [product_id, dispatch])

  useEffect(() => () => dispatch(resetAddReview()), [dispatch])
  useEffect(() => {
    if (addReviewSuccess) {
      dispatch(getProductDetail(product_id))
    }
  }, [dispatch, addReviewSuccess, product_id])

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const addComment = (e) => {
    e.preventDefault()
    if (!comment.length) {
      setInputError('Comment is required!')
    } else {
      setInputError('')
      const review = {
        rating,
        comment,
      }
      dispatch(addReview(product_id, review))
    }
  }
  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleRating = (e) => {
    setRating(e.target.value)
  }
  return (
    <>
      <Link to='/'>
        <Button variant='light' className={styles.backButton}>
          Go Back
        </Button>
      </Link>
      {loading ? (
        <div
          className='d-flex justify-content-center'
          style={{
            paddingTop: '27vh',
          }}
        >
          <Loading />
        </div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <HelmetTag title={product.name} />

          <Row>
            <Col sm={12} md={6} lg={6} xl={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>

            <Col sm={12} md={4} lg={3} xl={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col sm={12} md={2} lg={3} xl={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        onChange={(e) => {
                          setQty(e.target.value)
                        }}
                      >
                        {[...Array(product.countInStock)].map((e, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Link
                    to={`/cart/${product._id}?qty=${qty}`}
                    // onClick={() => console.log('sss')}
                  >
                    <Button
                      className='btn-block'
                      variant='dark'
                      disabled={product.countInStock === 0}
                      onClick={() => dispatch(addToCart(product._id, qty))}
                    >
                      ADD TO CART
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col sm={12} md={6} lg={6} xl={6}>
              {!user || !user.token ? (
                <Message variant='info'>
                  Please <Link to='/login'>Login</Link> to comment.
                </Message>
              ) : (
                <>
                  <Form.Group>
                    {inputError && (
                      <Message variant='danger'>{inputError}</Message>
                    )}

                    {addReviewLoading && (
                      <div className='text-right'>
                        <Loading type='ThreeDots' height='25' />
                      </div>
                    )}

                    {addReviewError && (
                      <Message variant='danger'>{addReviewError}</Message>
                    )}

                    {addReviewSuccess && (
                      <Message variant='success'>
                        Review Successfully added
                      </Message>
                    )}
                    <Form.Label as='h5'>Rating</Form.Label>

                    <Form.Control
                      defaultValue={rating}
                      as='select'
                      onChange={handleRating}
                      className='mb-2'
                    >
                      <option key={0} value={0}>
                        0 - Very Poor
                      </option>

                      <option key={1} value={1}>
                        1 - Poor
                      </option>

                      <option key={2} value={2}>
                        2 - Fine
                      </option>

                      <option key={3} value={3}>
                        3 - Good
                      </option>

                      <option key={4} value={4}>
                        4 - Very Good
                      </option>

                      <option key={5} value={5}>
                        5 - Great
                      </option>
                    </Form.Control>

                    <Form.Label as='h5'>Comment</Form.Label>

                    <Form.Control
                      type='text'
                      as='textarea'
                      value={comment}
                      onChange={handleComment}
                    ></Form.Control>
                  </Form.Group>
                  <div className='text-right'>
                    <Button type='submit' onClick={addComment} variant='dark'>
                      Add Review
                    </Button>
                  </div>
                </>
              )}
              <h4>Reviews</h4>

              <ListGroup variant='flush'>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <Comment
                      name={review.name}
                      rating={review.rating}
                      comment={review.comment}
                      date={review.updatedAt}
                      key={review._id}
                    />
                  ))
                ) : (
                  <Message variant='info'>No review yet!</Message>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
