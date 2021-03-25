import axios from 'axios'

const addProduct = (data) => async (dispatch, getState) => {
  try {
    const { token } = getState().loggedUser.user
    dispatch({ type: 'ADD_PRODUCT_REQUEST' })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.post(
      `http://localhost:55555/admin/products/add`,
      data,
      config
    )

    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: response.data._id })
  } catch (error) {
    dispatch({
      type: 'ADD_PRODUCT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default addProduct
