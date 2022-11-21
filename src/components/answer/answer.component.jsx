import {  useContext} from 'react';
import { QuestionContext } from '../../contexts/questionContext';

import BirdDetails from '../bird-details/bird-details.component';




const Answer = () => { 
    const [questionState, dispatch] = useContext(QuestionContext);
    const currentBirds = questionState.birdsData[questionState.currentCategoryIndex];
  
    const currentBird = currentBirds[questionState.currentBirdId];
  
    const chosenBird =  currentBirds[questionState.chosenBirdId ];

    const isWin = questionState.win;
    console.log ('win', isWin)

    const chooseBird = (event) => { 
        console.log('id', event.target.value) 
        dispatch({ type: 'CHOOSE', payload: event.target.value })
        if (currentBird.id === event.target.value) {
            dispatch({ type: 'WIN', payload: event.target.value }); 
            console.log(event.target.value)
                    
        } else {           
           console.log( ' incorrect answer'); 
        } 
        
        };

    
    
    
    
    return (
        <div className= {!isWin ? 'answer-container' : 'hidden'}>
            <ul className="birds-list-container">
                {currentBirds.map((bird) =>
                    (<li
                        className="bird-item"
                        key={bird.id} 
                        value={bird.id}
                        onClick={chooseBird}                                                 
                        > 
                            { bird.name} 
                                              
                    </li> 
                    )                    
                )}                
            </ul>  
            <div>
                { chosenBird ?
                    <BirdDetails 
                    name ={chosenBird.name}
                    image ={chosenBird.image}
                    description={chosenBird.description}
                    audio={chosenBird.audio}
                    />
                    :
                <h3>Послушайте плеер. Выберите птицу из списка</h3>
                }
            </div>
                   
        </div>
    )
}

export default Answer;
