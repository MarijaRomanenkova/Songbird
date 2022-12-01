import { useContext} from "react";
import { QuestionContext } from '../../contexts/questionContext';
import logo from '../../assets/logo.svg'

const Header = () => {
    const [questionState] = useContext(QuestionContext); 
    const score = questionState.score
    const clicks = questionState.clicks
    return (
        <div className='header-container'>
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <div className='score'><p> Score: {score} Clicks {clicks}</p> </div>
        </div>
        
    )
}
export default Header;


