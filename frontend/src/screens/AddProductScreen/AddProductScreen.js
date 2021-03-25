import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'
import Loading from '../../components/Loading/Loading'
import Message from '../../components/Message/Message'
import addProduct from '../../Redux/Actions/addProduct'
import resetAddProduct from '../../Redux/Actions/resetAddProduct'
// import resetUpdateProduct from '../../Redux/Actions/resetUpdateProduct'
import resetProductList from '../../Redux/Actions/resetProductList'
import axios from 'axios'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const AddProductScreen = ({ history }) => {
  const { user } = useSelector((state) => state.loggedUser)

  // eslint-disable-next-line
  const [isAdmin, setisAdmin] = useState(user.isAdmin)
  const [inputErrorMessage, setInputErrorMessage] = useState(false)
  const dispatch = useDispatch()
  const { id, error, loading } = useSelector((state) => state.addProduct)
  const [uploading, setUploading] = useState()
  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  let [price, setPrice] = useState('')
  let [image, setImage] = useState('')
  let [brand, setBrand] = useState('')
  let [countInStock, setCountInStock] = useState('')
  let [category, setCategory] = useState('')

  useEffect(() => () => dispatch(resetAddProduct()), [dispatch])
  useEffect(() => {
    if (id) {
      // dispatch(resetUpdateProduct())
      dispatch(resetProductList())
    }
  }, [id, dispatch])

  useEffect(() => {
    if (id) {
      history.push(`/admin/products/${id}`)
    }
  })
  const handleUpdate = (e) => {
    e.preventDefault()

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
        const product = {
          name,
          description,
          image,
          brand,
          category,
          price,
          countInStock,
        }
        setInputErrorMessage(null)
        dispatch(addProduct(product))
      } catch (error) {
        setInputErrorMessage('Please check your inputs!')
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
      <HelmetTag title='Add Product' />

      <Container className='mt-5'>
        <h2 className='mb-3'>ADD ITEM</h2>
        {id && <Message variant='success'>Added Successfuly</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && (
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
              Add Product
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default AddProductScreen
