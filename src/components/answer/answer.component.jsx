import {  useContext , useEffect} from 'react';
import { QuestionContext } from '../../contexts/questionContext';
import useSound from 'use-sound';
import correct from '../../assets/sounds/correct.ogg';
import incorrect from '../../assets/sounds/incorrect.ogg';

import BirdDetails from '../bird-details/bird-details.component';

const Answer = () => { 
    const [questionState, dispatch] = useContext(QuestionContext);
    const currentBirds = questionState.birdsData[questionState.currentCategoryIndex];
    const currentBird = currentBirds[questionState.currentBirdId];
    const chosenBird =  currentBirds[questionState.chosenBirdId ];
    const isWin = questionState.win;  
    const [playCorrect] = useSound(correct);
    const [playIncorrect] = useSound(incorrect);
    
  
    const chooseBird = (event) => { 
        dispatch({ type: 'CHOOSE', payload: event.target.value })
        if (currentBird.id === event.target.value) {
            dispatch({ type: 'WIN', payload: event.target.value });             
            playCorrect();
              

        } else {
            playIncorrect(); 
                                
        }        
    }

   
    return (
        <div className= {!isWin ? 'answer-container' : 'hidden'}>
            <ul className="birds-list-container">
                {currentBirds.map((bird, index) =>
                    (<li
                        className='bird-item' 
                        key={bird.id} 
                        value={bird.id}
                        onClick={chooseBird}                                                                                           
                        > 
                            { bird.name}     
                    </li> 
                    )                    
                )}                
            </ul> 
            { chosenBird ?
                <BirdDetails 
                name ={chosenBird.name}
                image ={chosenBird.image}
                description={chosenBird.description}
                audio={chosenBird.audio}
                species={chosenBird.species}
                />
                :<div className="bird-details--dummy">
                    <h4 className="bird-details--dummy-text">Послушайте плеер.</h4>
                    <h4 className="bird-details--dummy-text">Выберите птицу из списка</h4></div>
            }  
        </div>
    )
}

export default Answer;
