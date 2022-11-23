import { createContext, useReducer } from "react";
import birdsData from '../data';
export const QuestionContext = createContext();


const currentId = () => { 
  const maximum = 6;
  const minimum = 0;
  const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  return randomNumber;  
}

const setChosenBirdId = (a = 0) => {  
  return a -1;
}

const setCorrectAnswer = (bool = false) => {
  return bool;
}

const setWin = (bool = false) => {
  return bool;
}

const setToZero = () => {
  return 0;
}


const setScore = (prevScore, clicks) => {
  let score = 0; 
  if(clicks === 0) {
    return prevScore + score + 5;
  } else if(clicks === 1) {
    return prevScore + score + 4;
  } else if(clicks === 2) {
    return prevScore + score + 3;
  } else if(clicks === 3) {
    return prevScore + score + 2;
  } else if(clicks === 4) {
    return prevScore + score + 1;
  } else {
    return prevScore ;    
  } 
}

const initialState = {
    birdsData,
    currentCategoryIndex: 0,
    currentBirdId: currentId(), 
    chosenBirdId: setChosenBirdId(),     
    clicks:0,  
    score: 0,
    correctAnswers: 0,    
    isCorrectAnswer: setCorrectAnswer(),
    level: 0,
    win: setWin(),
     
};

const reducer = (state, action) => { 
    switch (action.type) {
      case 'NEXT_LEVEL':            
          return {
            ...state,
            currentBirdId: currentId(),
            chosenBirdId:setCorrectAnswer(false),
            currentCategoryIndex: state.currentCategoryIndex +1,
            isCorrectAnswer: setCorrectAnswer(false),
            clicks: setToZero(),
            level: state.level + 1,
            
      }
      
      case 'WIN' : 
        if(state.correctAnswers > 4 ) {
          return {
            ...state,
            win: setWin(true), 
                   
          }
        } else {
          return {
            ...state,
            chosenBirdId: setChosenBirdId(action.payload), 
            isCorrectAnswer: setCorrectAnswer(true),
            correctAnswers: state.correctAnswers +1 ,                   
            win: setWin(false), 
            score: setScore(state.score, state.clicks),
            
            };
        }

      case 'CHOOSE':             
          return {
            ...state,          
            clicks: state.clicks +1 , 
            chosenBirdId: setChosenBirdId(action.payload),
            win: setWin(false),
            
         }
    
      case 'NEW_GAME':
        return {
          ...state,
          currentCategoryIndex: setToZero(),
          currentBirdId: currentId(), 
          chosenBirdId: setToZero(),           
          clicks: setToZero(),
          score: setToZero(),     
          correctAnswers: setToZero(),
          isCorrectAnswer: setCorrectAnswer(false),          
          win: setWin(false),
          level: setToZero(),
           
        }

      default:
      throw new Error(`Unknown action type: ${action.type}`);      
    }    
};






export const QuestionProvider = ({children}) => {
    const value = useReducer(reducer, initialState );
    return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>;
}
