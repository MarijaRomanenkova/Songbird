import {  Fragment, useContext, useState } from 'react';
import { QuestionContext } from 'contexts/questionContext';
import useSound from 'use-sound';

import correct from 'assets/sounds/correct.ogg';
import incorrect from 'assets/sounds/incorrect.ogg';
import BirdDetails from 'components/bird-details/bird-details.component'; 
import styles from './answer.module.scss';


const Answer = () => { 
    const [questionState, dispatch] = useContext(QuestionContext);
    const currentBirds = questionState.birdsData[questionState.currentCategoryIndex];
    const nextBirds = questionState.birdsData[questionState.currentCategoryIndex +1];
    const currentBird = currentBirds[questionState.currentBirdId];
    const chosenBird =  currentBirds[questionState.chosenBirdId ];
    const isWin = questionState.win;  
    const isButtonActive = questionState.isCorrectAnswer;
    
    const [playCorrect] = useSound(correct);
    const [playIncorrect] = useSound(incorrect);
    console.log('clicks', questionState.clicks)
    
    const initialBirdList = currentBirds.map(bird => ({
        ...bird,
        birdClass: styles.BirdsList_Item ,
        isAlreadyChosen: false,
            
    })) 

    

    const [birdsAnswers, setBirdsAnswers] = useState( initialBirdList )
    
    
    const chooseBird = (event) => { 
        dispatch({ type: 'CHOOSE', payload: event.target.value })        
        if (currentBird.id === event.target.value) {
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
        if(isWin === true) {            
            setBirdsAnswers(currentBirds.map(bird => ({
                ...bird,
                birdClass: styles.BirdsList_Item,
                isAlreadyChosen: false       
                })
            )) 
            dispatch({ type: 'NEW_GAME' }); 
        }
        setBirdsAnswers(nextBirds.map(bird => ({
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
            onClick={bird.isAlreadyChosen ? null : !isButtonActive? chooseBird : null} 
            > {bird.name}
        </li>                                                                  
        )
    )

    

    return (
        <Fragment>
            <div className= {!isWin ? styles.Answer__Container : styles.Hidden }>
                <ul className={styles.Birds_List__Container}>
                    {birdsList}              
                </ul> 
                { chosenBird ?
                    <BirdDetails 
                        name ={chosenBird.name}
                        image ={chosenBird.image}
                        description={chosenBird.description}
                        audio={chosenBird.audio}
                        species={chosenBird.species}
                    /> :                   
                    <div className={styles.Bird_Details__Dummy}>
                        <h4 className={styles.Bird_Details__Dummy__Text}>Послушайте плеер.</h4>
                        <h4 className={styles.Bird_Details__Dummy__Text}>Выберите птицу из списка</h4>
                    </div>
                }                  
            </div>
            <button
                type="button"
                disabled={!isButtonActive}
                className={isWin ? styles.Hidden : isButtonActive ? styles.Btn : styles.Disabled }
                onClick={handleNextButtonClick}
            > Next Level
            </button>
        </Fragment>
    )
}

export default Answer;


