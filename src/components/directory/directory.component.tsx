import { Category } from "../../store/categories/category.types";
import DirectoryItem from "../directory-item/directory-item.component";

import './directory.styles.scss';

type DirectoryProps = {
  categories: Category[];
}

const Directory = ({ categories }: DirectoryProps) => {
  return (
    <div className="categories-container">
      {categories.map((category) =>
        <DirectoryItem key={category.title} category={category}/>
      )}
    </div>
  )
}

export default Directory;