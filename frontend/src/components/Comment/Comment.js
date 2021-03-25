import Rating from '../Rating/Rating'

const { ListGroup } = require('react-bootstrap')

const Comment = ({ name, rating, comment, date }) => {
  return (
    <>
      <ListGroup.Item>
        <div>{name}</div>
        <div>
          <Rating rating={rating} />
        </div>

        <div>{comment}</div>
        <div style={{ fontSize: '0.6rem', padding: '0px', marginTop: '1px' }}>
          {date.substring(0, 10)}
        </div>
      </ListGroup.Item>
    </>
  )
}

export default Comment
