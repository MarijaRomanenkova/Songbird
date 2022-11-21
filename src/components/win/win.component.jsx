import { useContext, Fragment } from "react";
import { QuestionContext } from '../../contexts/questionContext';


const Win = () => {
    const [questionState, dispatch] = useContext(QuestionContext);
    const isWin = questionState.win;
    const score = questionState.score;

    return (
        <Fragment>
            <div className={ isWin ? 'win-container' : 'hidden'}>
                <h1>Поздравляем!</h1> 
                <h5>
                Вы прошли викторину и набрали {score} из 30 возможных баллов</h5>
                
                <button type="button" className="btn" onClick={()=> dispatch({type:"NEW_GAME"})}>
                    Play again
                </button>
            </div>
        </Fragment>
    )
}

export default Win;
