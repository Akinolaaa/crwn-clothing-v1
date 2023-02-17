import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
//import { useContext } from 'react';
import Directory from '../../components/directory/directory.component';
import Spinner from '../../components/spinner/spinner.component';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import { selectCategories, selectCategoriesIsLoading } from '../../store/categories/category.selector';

// const categories = [
//   {
//     "id": 1,
//     "title": "hats",
//     "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
//     "route": 'shop/hats',
//   },
//   {
//     "id": 2,
//     "title": "jackets",
//     "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
//     "route": 'shop/jackets'
//   },
//   {
//     "id": 3,
//     "title": "sneakers",
//     "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
//     "route": 'shop/sneakers'
//   },
//   {
//     "id": 4,
//     "title": "womens",
//     "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
//     "route": 'shop/womens'
//   },
//   {
//     "id": 5,
//     "title": "mens",
//     "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
//     "route": 'shop/mens'
//   }
// ]
const Home = () => {
  const categories = useSelector(selectCategories);
  const loadingCategories = useSelector(selectCategoriesIsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  },[])

  return (
    <div>
      <Outlet />
      {
      loadingCategories ? 
        <Spinner /> :
        <Directory categories={categories} />
      }
    </div>
  );
}

export default Home;