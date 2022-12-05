import { useContext, useRef} from "react";
import { QuestionContext } from 'contexts/questionContext';
import AudioPlayer from "react-h5-audio-player";  

import styles from 'components/answerDetails/answerDetails.module.scss'


const AnswerDetails = ( chosenAnswer  ) => {  
  const [questionState] = useContext(QuestionContext); 
  const isCorrectAnswer = questionState.isCorrectAnswer;   

  const player = useRef(); 
  const pausePlayer = () => {
    player.current.audio.current.pause();    
  };

  if(isCorrectAnswer === true) {
    pausePlayer();
  }

  return (
    <div className={styles.AnswerDetails_Container}>
        <img className= {styles.AnswerDetails_Image} src={chosenAnswer.image} alt={`${chosenAnswer.name}`} />
      <div>
        <h2 className={styles.AnswerDetails_Name_Text}>{chosenAnswer.name}</h2>
        <h4 className={styles.AnswerDetails_Species_Text}>{chosenAnswer.species}</h4>
        <AudioPlayer             
          layout="horizontal-reverse" 
          src={chosenAnswer.audio}
          autoPlay={false}
          autoPlayAfterSrcChange={false}            
          showJumpControls={false}
          showFilledProgress={true}
          customAdditionalControls={[]}  
          customVolumeControls={[]}
          ref={player} 
        />
      </div>
      <div className={styles.AnswerDetails_Description}>{chosenAnswer.description}</div>       
    </div>
  )
}
export default AnswerDetails;


