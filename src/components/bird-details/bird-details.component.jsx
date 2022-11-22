import AudioPlayer from "react-h5-audio-player";  

const BirdDetails = ( chosenBird  ) => {
    
    return (
      <div className='bird-details-container'>
        <div className= 'bird-details-image-wrapper' >        
          <img className= 'bird-details-image' src={chosenBird.image} alt={`${chosenBird.name}`} />
        </div>
        <div className='bird-details-wrapper'>
          <h2 className='bird-details-name-text'>{chosenBird.name}</h2>
          <h4 className='bird-details-species-text'>{chosenBird.species}</h4>
          <AudioPlayer 
                    className='bird-details-audio'
                    layout="horizontal-reverse" 
                    src={chosenBird.audio}
                    autoPlayAfterSrcChange={false}            
                    showJumpControls={false}
                    showFilledProgress={true}
                    customAdditionalControls={[]}  
                    customVolumeControls={[]} 
                />
        </div>
        <div className='bird-details-description'>{chosenBird.description}</div>       
      </div>
    )
}

export default BirdDetails;

