import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MainCarousel = ({ products }) => {
  return (
    <>
      <Carousel pause='hover' className='bg-dark'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid></Image>
              <Carousel.Caption className='carousel-caption'>
                <h3>{product.name}</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default MainCarousel
