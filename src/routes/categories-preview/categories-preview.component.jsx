import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
//import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
//  const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(category => {
          const products = categoriesMap[category];
          return (<CategoryPreview key={category} category={category} products={products} />)
        })
      }
    </Fragment>
  )
}

export default CategoriesPreview;