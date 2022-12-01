import { useContext } from "react";
import { QuestionContext } from 'contexts/questionContext';
import styles from 'components/categories/categories.module.scss'

const Categories = () => {
  const [questionState] = useContext(QuestionContext);
  const level = questionState.level;
  const categoriesArray = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Mорские птицы']
  const CategoriesList = categoriesArray.map((category, index) => (
    <div key={index} className={index === level ? styles.Category_Active : styles.Category}><p className={styles.Categories_Text}>{category}</p> </div>))

    return (
      <div className={styles.Categories__Container}>        
        {CategoriesList}
      </div>
    )
}
export default Categories;


