import { useContext, useRef} from "react";
import { QuestionContext } from 'contexts/questionContext';
import AudioPlayer from "react-h5-audio-player";  
import MockUp from 'assets/bird-mock-up.jpg'
import styles from 'components/question/question.module.scss'


const Question = () => {    
    const [questionState] = useContext(QuestionContext);     
    const level = questionState.birdsData[questionState.level];   
    const question = level[questionState.randomQuestionID];  
    const isGameOver = questionState.isGameOver;
    const isCorrectAnswer = questionState.isCorrectAnswer     
    const HIDDEN__ANSWER = '******';

    const player = useRef(); 
      const pausePlayer = () => {
        player.current.audio.current.pause();    
      };
      
    if(isCorrectAnswer === true) {
        pausePlayer();
    }
    
     
    
    return ( 
        
        <div className={!isGameOver ? styles.Question_Container : styles.Hidden}>            
            <img 
                className= {styles.Question_Image}
                src={questionState.isCorrectAnswer ? question.image : MockUp} alt={question.name} />
            <div className = {styles.Question_Box} >
                <h1 className = {styles.Question_Title}>{
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
                    ref={player}
                                      
                />
            </div> 
        </div>
    )
}
export default Question;


