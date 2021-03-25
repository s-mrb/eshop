import { Link } from 'react-router-dom'
import deleteProduct from '../../Redux/Actions/deleteProduct'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
const ProductListItem = ({ id, name, price, category, countInStock }) => {
  const dispatch = useDispatch()
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteProduct(id))
  }
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{category}</td>
        <td>{countInStock}</td>
        <td>
          <a href='#0' onClick={handleDelete}>
            <i className='fas fa-trash'></i>
          </a>
        </td>

        <td>
          <Link to={`/admin/products/${id}`}>edit</Link>
        </td>
      </tr>
    </>
  )
}

export default ProductListItem
