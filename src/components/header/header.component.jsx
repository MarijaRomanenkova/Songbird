import { useContext, useState, useEffect } from "react";
import { QuestionContext } from '../../contexts/questionContext';
import logo from '../../assets/logo.svg'


const Header = () => {
    const [questionState, dispatch] = useContext(QuestionContext); 
    const score = questionState.score
    
    
 
    return (
        <div className='header-container'>
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <div className='score'><p> Score: {score}</p> </div>
        </div>
        
    )
}

export default Header;
