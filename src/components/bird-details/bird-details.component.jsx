import AudioPlayer from "react-h5-audio-player";  
import styles from 'components/bird-details/bird.details.module.scss'

const BirdDetails = ( chosenBird  ) => {    
    return (
      <div className={styles.BirdDetails__container}>
          <img className= {styles.BirdDetails_Image} src={chosenBird.image} alt={`${chosenBird.name}`} />
        <div>
          <h2 className={styles.BirdDetails__BirdName_Text}>{chosenBird.name}</h2>
          <h4 className={styles.BirdDetails__BirdSpecies_Text}>{chosenBird.species}</h4>
          <AudioPlayer             
            layout="horizontal-reverse" 
            src={chosenBird.audio}
            autoPlay={false}
            autoPlayAfterSrcChange={false}            
            showJumpControls={false}
            showFilledProgress={true}
            customAdditionalControls={[]}  
            customVolumeControls={[]} 
          />
        </div>
        <div className={styles.BirdDetails_Description}>{chosenBird.description}</div>       
      </div>
    )
}
export default BirdDetails;


