import AudioPlayer from "react-h5-audio-player";  
import styles from 'components/bird-details/bird.details.module.scss'

const BirdDetails = ( chosenAnswer  ) => {    
    return (
      <div className={styles.BirdDetails__container}>
          <img className= {styles.BirdDetails_Image} src={chosenAnswer.image} alt={`${chosenAnswer.name}`} />
        <div>
          <h2 className={styles.BirdDetails__BirdName_Text}>{chosenAnswer.name}</h2>
          <h4 className={styles.BirdDetails__BirdSpecies_Text}>{chosenAnswer.species}</h4>
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
export default BirdDetails;


