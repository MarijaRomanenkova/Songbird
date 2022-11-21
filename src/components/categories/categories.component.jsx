import { useContext } from "react";
import { QuestionContext } from '../../contexts/questionContext';

const Categories = () => {
  const [questionState] = useContext(QuestionContext);
  const level = questionState.level;
    return (
      <div className='categories-container'>        
        <div className={ level === 0 ? 'category-active' : 'category'}><p className='categories-text'>Разминка</p></div>
        <div className={ level === 1 ? 'category-active' : 'category'}><p className='categories-text'>Воробьиные</p></div>
        <div className={ level === 2 ? 'category-active' : 'category'}><p className='categories-text'>Лесные птицы</p></div>
        <div className={ level === 3 ? 'category-active' : 'category'}><p className='categories-text'>Певчие птицы</p></div>
        <div className={ level === 4 ? 'category-active' : 'category'}><p className='categories-text'>Хищные птицы</p></div>
        <div className={ level === 5 ? 'category-active' : 'category'}><p className='categories-text'>Mорские птицы</p></div>
      </div>
      
        
    )
}


export default Categories;
