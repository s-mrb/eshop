import axios from 'axios'

const addToCart = (id, qty) => async (dispatch, getState) => {
  const response = await axios.get(`http://localhost:55555/products/${id}`)
  const product = response.data.product
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      product: product._id,
      name: product.name,
      image: product.image,
      price: Number(product.price),
      countInStock: Number(product.countInStock),
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export default addToCart
