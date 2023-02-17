import { useNavigate } from 'react-router-dom';
import {BackgroundImage, Body, DirectoryItemContainer} from './directory-item.styles';
import { Category } from '../../store/categories/category.types';

const DirectoryItem = ({ category }:{category:Category}) => {
  const { title, items } = category;
  //Replacing imageUrl with Url of first item in category
  const imageUrl = items[0].imageUrl;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(`shop/${title.toLocaleLowerCase()}`);
  
  return(
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl}/>
      <Body>
        <h2>{title}</h2>
        <p> Shop Now </p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;