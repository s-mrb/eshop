import axios from 'axios'

const deleteProduct = (id) => async (dispatch, getState) => {
  const { token } = getState().loggedUser.user

  dispatch({ type: 'DELETE_PRODUCT_REQUEST' })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const emptyBody = {}
    const res = await axios.post(
      `http://localhost:55555/admin/products/delete/${id}`,
      emptyBody,
      config
    )

    console.log(res.body)
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'DELETE_PRODUCT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default deleteProduct
