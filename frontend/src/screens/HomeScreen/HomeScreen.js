import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Product from '../../components/Product/Product'
import { useDispatch, useSelector } from 'react-redux'
import getProductsList from '../../Redux/Actions/getProductsList'
import Loading from '../../components/Loading/Loading'
import Message from '../../components/Message/Message'
import getTopProducts from '../../Redux/Actions/getTopProducts'
import MainCarousel from '../../components/MainCarousel/MainCarousel'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
import { Link } from 'react-router-dom'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword ? match.params.keyword : ''
  const productList = useSelector((state) => state.productList)
  const dispatch = useDispatch()
  const {
    loading: top_loading,
    success: top_success,
    error: top_error,
    topProducts,
  } = useSelector((state) => state.topProducts)

  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  const { loading, products, error } = productList
  useEffect(() => {
    dispatch(getProductsList(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <HelmetTag />

      {keyword && (
        <Link to='/'>
          <Button variant='light' className='mb-2'>
            Go Back
          </Button>
        </Link>
      )}
      {top_success && !keyword.length && (
        <MainCarousel products={topProducts} />
      )}
      {loading ? (
        <div
          className='d-flex justify-content-center'
          style={{
            paddingTop: '30vh',
          }}
        >
          <Loading />
        </div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1 className='mt-2'>Products</h1>

          <Row>
            {products.length
              ? products.map((product) => (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className='py-3'
                    key={product._id}
                  >
                    <Product product={product} />
                  </Col>
                ))
              : null}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
