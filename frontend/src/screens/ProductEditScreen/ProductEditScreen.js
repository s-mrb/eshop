import { useEffect, useState } from 'react'
import getProductDetail from '../../Redux/Actions/getProductDetail'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'
import Loading from '../../components/Loading/Loading'
import Message from '../../components/Message/Message'
import resetUpdateProduct from '../../Redux/Actions/resetUpdateProduct'
import updateProduct from '../../Redux/Actions/updateProduct'
import resetProductList from '../../Redux/Actions/resetProductList'
import axios from 'axios'
import HelmetTag from '../../components/HelmetTag/HelmetTag'

const ProductEditScreen = ({ match }) => {
  const id = match.params.id
  const productDetail = useSelector((state) => state.productDetail)
  const {
    loading: update_loading,
    success: update_success,
    error: update_error,
  } = useSelector((state) => state.updateProduct)

  const { loading, product, error } = productDetail
  const { user } = useSelector((state) => state.loggedUser)

  // eslint-disable-next-line
  const [isAdmin, setisAdmin] = useState(user.isAdmin)
  const [inputErrorMessage, setInputErrorMessage] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (product && product.name) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCountInStock(product.countInStock)
      setCategory(product.category)
      setDescription(product.description)
    }
  }, [product])

  useEffect(() => () => dispatch(resetUpdateProduct()), [dispatch])

  useEffect(() => {
    if (update_success) {
      // dispatch(resetUpdateProduct())
      dispatch(resetProductList())
    }
  }, [update_success, dispatch])
  useEffect(() => {
    dispatch(getProductDetail(id))
  }, [id, dispatch])

  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  let [price, setPrice] = useState('')
  let [image, setImage] = useState('')
  let [brand, setBrand] = useState('')
  let [countInStock, setCountInStock] = useState('')
  let [category, setCategory] = useState('')
  const [uploading, setUploading] = useState()

  const handleUpdate = (e) => {
    e.preventDefault()
    // let priceCheck = typeof price === 'number' ? false : price.length === 0
    // let countInStockCheck =
    //   typeof countInStock === 'number' ? false : countInStock.length === 0
    // console.log(countInStockCheck)
    // console.log(priceCheck)

    if (
      !name.length ||
      !description.length ||
      !image.length ||
      !brand.length ||
      !category.length
    ) {
      setInputErrorMessage('Please check your inputs!')
    } else {
      try {
        setPrice(Number(price))
        setCountInStock(Number(countInStock))
        const updatedData = {
          name,
          description,
          image,
          brand,
          category,
          price,
          countInStock,
        }
        setInputErrorMessage(null)
        dispatch(updateProduct(id, updatedData))
      } catch (error) {
        setInputErrorMessage('Please check your inputs!')
        dispatch(resetUpdateProduct())
      }
    }
  }

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handlePrice = (e) => {
    setPrice(e.target.value)
  }
  const handleImage = (e) => {
    setImage(e.target.value)
  }
  const handleBrand = (e) => {
    setBrand(e.target.value)
  }
  const handleCountInStock = (e) => {
    setCountInStock(e.target.value)
  }
  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `http://localhost:55555/uploads`,
        formData,
        config
      )

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Container className='mt-5'>
        {loading ? (
          <div
            className='d-flex justify-content-center'
            style={{
              paddingTop: '30vh',
            }}
          >
            <Loading />
          </div>
        ) : !isAdmin ? (
          <Message variant='danger'>Not Admin!</Message>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <HelmetTag title={`Admin | Update ${name}`} />

            <h2 className='mb-3'>ID {product._id}</h2>
            {update_success && (
              <Message variant='success'>Updated Successfuly</Message>
            )}
            {update_error && <Message variant='danger'>{update_error}</Message>}
            {update_loading && (
              <div className='text-right'>
                <Loading type='ThreeDots' height='25' />
              </div>
            )}
            {inputErrorMessage && (
              <Message variant='danger'>{inputErrorMessage}</Message>
            )}
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  as='input'
                  value={name}
                  onChange={handleName}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  as='input'
                  value={price}
                  onChange={handlePrice}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Image</Form.Label>
                {uploading && (
                  <div className='text-right'>
                    <Loading type='ThreeDots' height='25' />
                  </div>
                )}
                <Form.Control
                  type='text'
                  as='input'
                  value={image}
                  onChange={handleImage}
                ></Form.Control>

                <Form.File id='image' onChange={handleImageUpload}></Form.File>
              </Form.Group>

              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  as='input'
                  value={brand}
                  onChange={handleBrand}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Count in Stock</Form.Label>
                <Form.Control
                  type='number'
                  as='input'
                  value={countInStock}
                  onChange={handleCountInStock}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  as='input'
                  value={category}
                  onChange={handleCategory}
                ></Form.Control>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    as='textarea'
                    value={description}
                    onChange={handleDescription}
                  ></Form.Control>
                </Form.Group>
              </Form.Group>
              <div className='text-right'>
                <Button type='submit' onClick={handleUpdate} variant='dark'>
                  Update
                </Button>
              </div>
            </Form>
          </>
        )}
      </Container>
    </>
  )
}

export default ProductEditScreen
