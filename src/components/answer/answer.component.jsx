import {  useContext} from 'react';
import { QuestionContext } from '../../contexts/questionContext';
import BirdDetails from '../bird-details/bird-details.component';

const Answer = () => { 
    const [questionState, dispatch] = useContext(QuestionContext);
    const currentBirds = questionState.birdsData[questionState.currentCategoryIndex];
    const currentBird = currentBirds[questionState.currentBirdId];
    const chosenBird =  currentBirds[questionState.chosenBirdId ];
    const isWin = questionState.win;

    const chooseBird = (event) => { 
        console.log('id', event.target.value) 
        dispatch({ type: 'CHOOSE', payload: event.target.value })
        if (currentBird.id === event.target.value) {
            dispatch({ type: 'WIN', payload: event.target.value }); 
        };
    }
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
            { chosenBird ?
                <BirdDetails 
                name ={chosenBird.name}
                image ={chosenBird.image}
                description={chosenBird.description}
                audio={chosenBird.audio}
                />
                :<div className="bird-details--dummy">
                    <h4 className="bird-details--dummy-text">Послушайте плеер.</h4>
                    <h4 className="bird-details--dummy-text">Выберите птицу из списка</h4></div>
            }  
        </div>
    )
}

export default Answer;
