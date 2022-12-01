import {  Fragment, useContext, useEffect, useState } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import useSound from 'use-sound';

import correct from 'assets/sounds/correct.ogg';
import incorrect from 'assets/sounds/incorrect.ogg';
import BirdDetails from 'components/bird-details/bird-details.component'; 
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
    console.log('clicks', questionState.clicks)
    
    const initialBirdList = thisLevelQuestionsArray.map(bird => ({
        ...bird,
        birdClass: styles.BirdsList_Item ,
        isAlreadyChosen: false,
            
    })) 

    

    const [birdsAnswers, setBirdsAnswers] = useState( initialBirdList )

    useEffect(() => {
        setBirdsAnswers(initialBirdList)
            
    }, [currentQuestionObject])
    
    

    const chooseBird = async (event) => { 
        
        dispatch({ type: 'CHOOSE', payload: event.target.value })        
        if ( currentQuestionObjectId === event.target.value) {
            dispatch({ type: 'WIN', payload: event.target.value });             
            playCorrect();  
            changeBirdsAnswers(event.target.value, styles.BirdsList_Item__correct); 
                   
        } else {
            playIncorrect();                   
            changeBirdsAnswers(event.target.value, styles.BirdsList_Item__incorrect);           
        }              
    }

    const changeBirdsAnswers = (id, newClass) => {
        setBirdsAnswers((birdsAnswers) =>
            birdsAnswers.map (
                (bird) => {
                    if(bird.id === id) {
                        return { ...bird, birdClass: newClass, isAlreadyChosen: true } 
                    } else {
                        return { ...bird } 
                    }                                    
                }
            )
        )
    }

    const handleNextButtonClick = () => {
        dispatch({type:"NEXT_LEVEL"});
        if(gameOver === true) {            
            setBirdsAnswers(thisLevelQuestionsArray.map(bird => ({
                ...bird,
                birdClass: styles.BirdsList_Item,
                isAlreadyChosen: false       
                })
            )) 
            dispatch({ type: 'NEW_GAME' }); 
        }
        setBirdsAnswers(nextLevelQuestionsArray.map(bird => ({
            ...bird,
            birdClass: styles.BirdsList_Item,
            isAlreadyChosen: false                  
            })
        ))        
    }

    const birdsList = birdsAnswers.map((bird) => (  
        <li
            className={bird.birdClass}
            key={bird.id}
            value={bird.id}
            onClick={bird.isAlreadyChosen ? null : !isNextButtonEnabled? chooseBird : null} 
            > {bird.name}
        </li>                                                                  
        )
    )

    

    return (
        <Fragment>
            <div className= {!gameOver ? styles.Answer__Container : styles.Hidden }>
                <ul className={styles.Birds_List__Container}>
                    {birdsList}              
                </ul> 
                { chosenAnswer ?
                    <BirdDetails 
                        name ={chosenAnswer.name}
                        image ={chosenAnswer.image}
                        description={chosenAnswer.description}
                        audio={chosenAnswer.audio}
                        species={chosenAnswer.species}
                    /> :                   
                    <div className={styles.Bird_Details__Dummy}>
                        <h4 className={styles.Bird_Details__Dummy__Text}>Послушайте плеер.</h4>
                        <h4 className={styles.Bird_Details__Dummy__Text}>Выберите птицу из списка</h4>
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


