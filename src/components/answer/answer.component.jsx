import {  Fragment, useContext, useEffect, useState } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import useSound from 'use-sound';

import correct from 'assets/sounds/correct.ogg';
import incorrect from 'assets/sounds/incorrect.ogg';
import AnswerDetails from 'components/answerDetails/answerDetails.component'; 
import styles from './answer.module.scss';


const Answer = () => { 
    const [questionState, dispatch] = useContext(QuestionContext); 
    const thisLevelQuestionsArray = questionState.birdsData[questionState.currentCategoryIndex];
    const nextLevelQuestionsArray = questionState.birdsData[questionState.currentCategoryIndex +1];
    const currentQuestionObject = thisLevelQuestionsArray[questionState.currentBirdId];
    const currentQuestionObjectId = currentQuestionObject.id; 
    const chosenAnswer = thisLevelQuestionsArray[questionState.chosenBirdId ];
    const gameOver = questionState.win;  
    const isNextButtonEnabled = questionState.isCorrectAnswer;
    
    const [playCorrect] = useSound(correct);
    const [playIncorrect] = useSound(incorrect);
    
    
    const initialAnswersListStyles = thisLevelQuestionsArray.map(item => ({
        ...item,
        itemClass: styles.AnswersList_Item ,
        isAlreadyChosen: false,
            
    })) 

    

    const [answersListStyles, setAnswersListStyles] = useState( initialAnswersListStyles )

    useEffect(() => {
        setAnswersListStyles(initialAnswersListStyles)
            
    }, [currentQuestionObject])
    
    

    const chooseAnswer = (event) => {         
        dispatch({ type: 'CHOOSE', payload: event.target.value })        
        if ( currentQuestionObjectId === event.target.value) {
            dispatch({ type: 'WIN', payload: event.target.value });             
            playCorrect();  
            changeAnswersListStyles(event.target.value, styles.AnswersList_Item__correct);                    
        } else {
            playIncorrect();                   
            changeAnswersListStyles(event.target.value, styles.AnswersList_Item__incorrect);           
        }              
    }

    const changeAnswersListStyles = (id, newClassName) => {
        setAnswersListStyles((answersListStyles) =>
            answersListStyles.map (
                (item) => {
                    if(item.id === id) {
                        return { ...item, itemClass: newClassName, isAlreadyChosen: true } 
                    } else {
                        return { ...item } 
                    }                                    
                }
            )
        )
    }

    const handleNextButtonClick = () => {
        dispatch({type:"NEXT_LEVEL"});
        if(gameOver === true) {            
            setAnswersListStyles(thisLevelQuestionsArray.map(item => ({
                ...item,
                itemClass: styles.AnswersList_Item,
                isAlreadyChosen: false       
                })
            )) 
            dispatch({ type: 'NEW_GAME' }); 
        }
        setAnswersListStyles(nextLevelQuestionsArray.map(item => ({
            ...item,
            itemClass: styles.AnswersList_Item,
            isAlreadyChosen: false                  
            })
        ))        
    }

    const answersList = answersListStyles.map((item) => (  
        <li
            className={item.itemClass}
            key={item.id}
            value={item.id}
            onClick={item.isAlreadyChosen ? null : !isNextButtonEnabled? chooseAnswer : null} 
            > {item.name}
        </li>                                                                  
        )
    )

    

    return (
        <Fragment>
            <div className= {!gameOver ? styles.Answers__Container : styles.Hidden }>
                <ul className={styles.AnswersList__Container}>
                    {answersList}              
                </ul> 
                { chosenAnswer ?
                    <AnswerDetails 
                        name ={chosenAnswer.name}
                        image ={chosenAnswer.image}
                        description={chosenAnswer.description}
                        audio={chosenAnswer.audio}
                        species={chosenAnswer.species}
                    /> :                   
                    <div className={styles.AnswerDetails__Dummy}>
                        <h4 className={styles.AnswerDetails__Dummy_Text}>Послушайте плеер.</h4>
                        <h4 className={styles.AnswerDetails__Dummy_Text}>Выберите птицу из списка</h4>
                    </div>
                }                  
            </div>
            <button
                type="button"
                disabled={!isNextButtonEnabled}
                className={gameOver ? styles.Hidden : isNextButtonEnabled ? styles.Btn : styles.Disabled }
                onClick={handleNextButtonClick}
            > Next Level
            </button>
        </Fragment>
    )
}

export default Answer;


