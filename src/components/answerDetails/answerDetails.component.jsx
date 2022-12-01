import AudioPlayer from "react-h5-audio-player";  
import styles from 'components/answerDetails/answerDetails.module.scss'

const AnswerDetails = ( chosenAnswer  ) => {    
    return (
      <div className={styles.AnswerDetails__container}>
          <img className= {styles.AnswerDetails_Image} src={chosenAnswer.image} alt={`${chosenAnswer.name}`} />
        <div>
          <h2 className={styles.AnswerDetails__Name_Text}>{chosenAnswer.name}</h2>
          <h4 className={styles.AnswerDetails__Species_Text}>{chosenAnswer.species}</h4>
          <AudioPlayer             
            layout="horizontal-reverse" 
            src={chosenAnswer.audio}
            autoPlay={false}
            autoPlayAfterSrcChange={false}            
            showJumpControls={false}
            showFilledProgress={true}
            customAdditionalControls={[]}  
            customVolumeControls={[]} 
          />
        </div>
        <div className={styles.BirdDetails_Description}>{chosenAnswer.description}</div>       
      </div>
    )
}
export default AnswerDetails;


