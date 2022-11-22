import { useContext } from "react";
import { QuestionContext } from '../../contexts/questionContext';
import mockUp from '../../assets/bird-mock-up.jpg'

import AudioPlayer from "react-h5-audio-player";   


const Question = () => {    
    const [questionState, dispatch] = useContext(QuestionContext);     
    const currentCategory = questionState.birdsData[questionState.currentCategoryIndex];   
    const currentBird = currentCategory[questionState.currentBirdId];  
    const isWin = questionState.win;

    console.log('used Ids' , questionState.usedBirdsId);
     
    const mystery = '******'
    return ( 
        <div className={!isWin ? 'question-container' : 'hidden'}>            
            <img className= 'question-image'
            src={questionState.isCorrectAnswer ? currentBird.image : mockUp} alt={`${currentBird.name}`} />
            <div className = 'question-box'>
                <h1 className = 'question-title'>{
                    questionState.isCorrectAnswer === false ? mystery : currentBird.name }</h1>
                <AudioPlayer 
                    layout="horizontal-reverse" 
                    src={currentBird.audio}
                    autoPlayAfterSrcChange={false}          
                    showJumpControls={false}
                    showFilledProgress={true}
                    volumeControls={true}
                    customAdditionalControls={[]}  
                    customVolumeControls={[]} 
                    
                />
            </div>        
            
        </div>
    )
}

export default Question;
