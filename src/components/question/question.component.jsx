import { useContext } from "react";
import { QuestionContext } from 'contexts/questionContext';
import AudioPlayer from "react-h5-audio-player";  
import MockUp from 'assets/bird-mock-up.jpg'


const Question = () => {    
    const [questionState] = useContext(QuestionContext);     
    const level = questionState.birdsData[questionState.level];   
    const question = level[questionState.questionId] || {};  
    const gameOver = questionState.win;     
    const HIDDEN__ANSWER = '******';
    
    return ( 
        <div className={!gameOver ? 'question-container' : 'hidden'}>            
            <img 
                className= 'question-image'
                src={questionState.isCorrectAnswer ? question.image : MockUp} alt={question.name} />
            <div className = 'question-box'>
                <h1 className = 'question-title'>{
                    questionState.isCorrectAnswer === false ? HIDDEN__ANSWER : question.name }
                </h1>
                <AudioPlayer 
                    layout="horizontal-reverse" 
                    src={question.audio}
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


