import axios from 'axios'

const addReview = (product_id, review) => async (dispatch, getState) => {
  try {
    const { token } = getState().loggedUser.user
    dispatch({ type: 'ADD_REVIEW_REQUEST' })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.post(
      `http://localhost:55555/products/${product_id}/reviews`,
      review,
      config
    )

    dispatch({ type: 'ADD_REVIEW_SUCCESS', payload: response.data._id })
  } catch (error) {
    dispatch({
      type: 'ADD_REVIEW_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default addReview
