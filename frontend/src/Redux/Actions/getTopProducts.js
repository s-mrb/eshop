import axios from 'axios'

const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'TOP_PRODUCTS_REQUEST' })

    const response = await axios.get(`http://localhost:55555/products/top`)
    const topProducts = response.data
    dispatch({ type: 'TOP_PRODUCTS_SUCCESS', payload: topProducts })
  } catch (error) {
    dispatch({
      type: 'PROFILE_BY_ADMIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getTopProducts
