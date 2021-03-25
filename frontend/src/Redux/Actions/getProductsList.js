import axios from 'axios'

const getProductsList = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' })
    let response

    if (keyword) {
      response = await axios.get(
        `http://localhost:55555/products?keyword=${keyword}`
      )
    } else {
      response = await axios.get(`http://localhost:55555/products`)
    }
    dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: response.data.products })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getProductsList
