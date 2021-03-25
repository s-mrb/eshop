import axios from 'axios'

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })
    const response = await axios.get(`http://localhost:55555/products/${id}`)

    dispatch({ type: 'PRODUCT_DETAIL_SUCCESS', payload: response.data.product })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAIL_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getProductDetail
