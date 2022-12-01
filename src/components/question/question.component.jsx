import { useContext } from "react";
import { QuestionContext } from 'contexts/questionContext';
import AudioPlayer from "react-h5-audio-player";  
import mockUp from 'assets/bird-mock-up.jpg'


const Question = () => {    
    const [questionState] = useContext(QuestionContext);     
    const currentCategory = questionState.birdsData[questionState.currentCategoryIndex];   
    const currentBird = currentCategory[questionState.currentBirdId] || {};  
    const gameOver = questionState.win;     
    const mystery = '******';
    
    return ( 
        <div className={!gameOver ? 'question-container' : 'hidden'}>            
            <img 
                className= 'question-image'
                src={questionState.isCorrectAnswer ? currentBird.image : mockUp} alt={currentBird.name} />
            <div className = 'question-box'>
                <h1 className = 'question-title'>{
                    questionState.isCorrectAnswer === false ? mystery : currentBird.name }
                </h1>
                <AudioPlayer 
                    layout="horizontal-reverse" 
                    src={currentBird.audio}
                    autoPlay={false}
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


