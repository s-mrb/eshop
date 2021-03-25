import { Helmet } from 'react-helmet'

const HelmetTag = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

HelmetTag.defaultProps = {
  title: 'Welcome to E-Shop',
  description: 'Buy products online',
  keywords: 'e-shop, buy products, electronics, food',
}

export default HelmetTag
