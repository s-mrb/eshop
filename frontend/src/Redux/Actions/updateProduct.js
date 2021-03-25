import axios from 'axios'

const updateProduct = (id, data) => async (dispatch, getState) => {
  const { token } = getState().loggedUser.user

  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.post(
      `http://localhost:55555/admin/products/update/${id}`,
      data,
      config
    )
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'UPDATE_PRODUCT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default updateProduct
