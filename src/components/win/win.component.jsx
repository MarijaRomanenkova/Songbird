import { useContext, Fragment } from "react";
import { QuestionContext } from '../../contexts/questionContext';
import React from 'react'

import Confetti from 'react-confetti';


const Win = () => {
    const [questionState, dispatch] = useContext(QuestionContext);
    const isWin = questionState.win;
    const score = questionState.score;
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
        <Fragment>
            <div className={ isWin ? 'win-container' : 'hidden'}>
                <Confetti width={width} height={height} />
                <h1 className="win-title">Поздравляем!</h1> 
                <h5 className="win-text">Вы прошли викторину и набрали {score} из 30 возможных баллов</h5>                
                <button className="win-btn" type="button" onClick={()=> dispatch({type:"NEW_GAME"})}>
                Попробовать еще раз!
                </button>
            </div>
        </Fragment>
    )
}

export default Win;
