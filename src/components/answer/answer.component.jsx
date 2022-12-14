/* eslint-disable react/function-component-definition */
import React from 'react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import useSound from 'use-sound';
import cx from 'classnames';

import correct from 'assets/sounds/correct.ogg';
import incorrect from 'assets/sounds/incorrect.ogg';
import AnswerDetails from 'components/answerDetails/answerDetails.component'; 
import styles from './answer.module.scss';


const Answer = () => {
  const [questionState, dispatch] = useContext(QuestionContext); 
    const thisLevelQuestionsArray = questionState.birdsData[questionState.level];
    const nextLevelQuestionsArray = questionState.birdsData[questionState.level +1];
    const currentQuestionObject = thisLevelQuestionsArray[questionState.randomQuestionID] || {}; 
    const chosenAnswer = thisLevelQuestionsArray[questionState.chosenAnswerId ];
    const level = questionState.level
    const isGameOver = questionState.isGameOver; 
    const [playCorrect] = useSound(correct);
    const [playIncorrect] = useSound(incorrect);
    
    

    
    const initialAnswersListStyles = thisLevelQuestionsArray.map(item => ({
        ...item,
        itemClass: styles.AnswersList_Item ,
        isAlreadyChosen: false,
            
    }))     

  const [answersListStyles, setAnswersListStyles] = useState( initialAnswersListStyles )
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    setIsNextButtonDisabled(true);
}, [isGameOver]);

    useEffect(() => {
        setAnswersListStyles(initialAnswersListStyles);
    }, [level]);

       
    const nextButtonClasses = cx({
        button: true,
        [styles.Hidden]: isGameOver,
        [styles.Disabled]: isNextButtonDisabled,
        [styles.Btn]: !isNextButtonDisabled,
    })
 

    console.log('nextButtonClass', nextButtonClasses)

    const chooseAnswer = (event) => {         
        dispatch({ type: 'CHOOSE', payload: event.target.value -1})        
        if ( currentQuestionObject.id === event.target.value) {
            dispatch({ type: 'WIN', payload: event.target.value -1});             
            playCorrect();  
            changeAnswersListStyles(event.target.value, styles.AnswersList_Item__correct); 
            setIsNextButtonDisabled(false)                   
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
        setIsNextButtonDisabled(true);
        dispatch({type:"NEXT_LEVEL"}); 
        if(isGameOver === true) {                     
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
            onClick={item.isAlreadyChosen ? null : isNextButtonDisabled ? chooseAnswer : null} 
            > {item.name}
        </li>                                                                  
        )
    )    

    return (
        <Fragment>
            <div className= {!isGameOver ? styles.Answers_Container : styles.Hidden }>
                <ul className={styles.AnswersList_Container}>
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
                    <div className={styles.AnswerDetails_Dummy}>
                        <h4 className={styles.AnswerDetails_Dummy_Text}>???????????????????? ??????????.</h4>
                        <h4 className={styles.AnswerDetails_Dummy_Text}>???????????????? ?????????? ???? ????????????</h4>
                    </div>
                }                  
            </div>
            <button
                type="button"
                disabled={isNextButtonDisabled}
                className= {nextButtonClasses}                
                onClick={handleNextButtonClick}
            > Next Level
            </button>
        </Fragment>
    )
}

export default Answer;

