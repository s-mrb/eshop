import { useState } from 'react'

const { Form, Button, Input, FormControl } = require('react-bootstrap')

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const handleSearch = (e) => {
    if (keyword.length) {
      e.preventDefault()
      const word = keyword.trim()
      setKeyword('')
      history.push(`/search/${word}`)
    }
  }
  return (
    <>
      <Form inline>
        <Form.Group>
          <Form.Control
            placeholder='Search product..'
            type='name'
            as='input'
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>

        <Button
          type='submit'
          onClick={handleSearch}
          variant='secondary'
          className='ml-sm-1'
        >
          Search
        </Button>
      </Form>
    </>
  )
}

export default SearchBar

// <Form>
// <Form.Group>
//   <Form.Control
//     placeholder='Search product..'
//     type='name'
//     as='input'
//     value={keyword}
//     onChange={(e) => {
//       setKeyword(e.target.value)
//     }}
//   ></Form.Control>
// </Form.Group>

// <Button type='submit' onClick={handleSearch}>
//   Search
// </Button>
// </Form>

// <FormControl placeholder='Search Item' className='ml-sm-2 mr-md-4' />
// <Button type='submit' onClick={handleSearch}>
//   Search
// </Button>
