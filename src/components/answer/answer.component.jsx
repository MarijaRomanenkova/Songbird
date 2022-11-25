import {  Fragment, useContext, useState } from 'react';
import { QuestionContext } from '../../contexts/questionContext';
import useSound from 'use-sound';
import correct from '../../assets/sounds/correct.ogg';
import incorrect from '../../assets/sounds/incorrect.ogg';
import BirdDetails from '../bird-details/bird-details.component'; 

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

    const initialBirdList = currentBirds.map(bird => ({
        ...bird,
        birdClass: 'bird-item'        
    })) 

    const [birdsAnswers, setBirdsAnswers] = useState( initialBirdList )
    
    const chooseBird = (event) => { 
        dispatch({ type: 'CHOOSE', payload: event.target.value })        
        if (currentBird.id === event.target.value) {
            dispatch({ type: 'WIN', payload: event.target.value });             
            playCorrect();  
            changeBirdsAnswers(event.target.value, 'bird-item--correct');           
        } else {
            playIncorrect();              
            changeBirdsAnswers(event.target.value, 'bird-item--incorrect');           
        }              
    }

    const changeBirdsAnswers = (id, newClass) => {
        setBirdsAnswers((birdsAnswers) =>
            birdsAnswers.map (
                (bird) => {
                    if(bird.id === id) {
                        return { ...bird, birdClass: newClass } 
                    } else {
                        return { ...bird, birdClass: 'bird-item'  } 
                    }                                    
                }
            )
        )
    }

    const handleNexButtonClick = () => {
        dispatch({type:"NEXT_LEVEL"});
        if(isWin === true) {
            dispatch({ type: 'NEW_GAME' }); 
            setBirdsAnswers(initialBirdList)
        }
        setBirdsAnswers(nextBirds.map(bird => ({
            ...bird,
            birdClass: 'bird-item'        
            })
        ))        
    }

    const birdsList = birdsAnswers.map((bird) => (  
        <li
            className={bird.birdClass}
            key={bird.id}
            value={bird.id}
            onClick={chooseBird} 
            > {bird.name}
        </li>                                                                  
        )
    )
    return (
        <Fragment>
            <div className= {!isWin ? 'answer-container' : 'hidden'}>
                <ul className="birds-list-container">
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
                    <div className="bird-details--dummy">
                        <h4 className="bird-details--dummy-text">Послушайте плеер.</h4>
                        <h4 className="bird-details--dummy-text">Выберите птицу из списка</h4>
                    </div>
                }                  
            </div>
            <button
                type="button"
                disabled={!isButtonActive}
                className={isWin ? 'hidden' : isButtonActive ? "btn" : "disabled"}
                onClick={handleNexButtonClick}
            > Next Level
            </button>
        </Fragment>
    )
}

export default Answer;


