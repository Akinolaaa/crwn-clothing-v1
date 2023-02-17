import { Link } from 'react-router-dom';
import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.component';
import { CategoryItem } from '../../store/categories/category.types'


type CategoryPreviewProps = {
  category: string;
  products: CategoryItem[];
}

const CategoryPreview = ({category, products}:CategoryPreviewProps) => {

  return(
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={category}> {category.toUpperCase()} </Link>
      </h2>
      <div className='preview'>
        {
          products.filter((_, idx) => idx < 4)
          .map((product) => (<ProductCard key={product.id} product={product} />))
        }
      </div>
    </div>
  )
}

export default CategoryPreview;