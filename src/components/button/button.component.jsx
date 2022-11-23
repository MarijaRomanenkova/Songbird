import { useContext } from 'react';
import { QuestionContext } from '../../contexts/questionContext';

const Button = () => {
    const [questionState, dispatch] = useContext(QuestionContext);
    const isButtonActive = questionState.isCorrectAnswer;
    const isWin = questionState.win;  

    return (
        <div >
        <button
            type="button"
            disabled={!isButtonActive}
            className={isWin ? 'hidden' : isButtonActive ? "btn" : "disabled"}
            onClick={()=> dispatch({type:"NEXT_LEVEL"})}
        > 
            Next Level
        </button>
        </div>
    )
}
export default Button;


