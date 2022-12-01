import { createContext, useReducer } from 'react';
import birdsData from '../data';
export const QuestionContext = createContext();



const getQuestionId = () => {
  const maximum = 6;
  const minimum = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  return randomNumber;
};


let MAXIMUM__SCORE__PER__LEVEL = 5;
const setScore = (prevScore, clicks) => {
  let score = 0;
  for (let i = clicks; i < MAXIMUM__SCORE__PER__LEVEL +1; i++) {
    score++
    
  }
  return prevScore + score
}


const initialState = {
  birdsData,
  level: 0,
  questionId: getQuestionId(),
  chosenAnswerId: null,
  clicks: 0,
  score: 0,
  correctAnswers: 0,
  isCorrectAnswer: false,  
  win: false,
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_LEVEL':
      return {
        ...state,
        level: state.level + 1,
        questionId: getQuestionId(),
        chosenAnswerId: null,        
        isCorrectAnswer: false,
        clicks: 0,        
        win: false,
      };

    case 'WIN':
      if (state.correctAnswers > 4) {
        return {
          ...state,
          score: setScore(state.score, state.clicks),
          win: true,  
          isCorrectAnswer: true,        
        };
      } else {
        return {
          ...state,
          chosenAnswerId: action.payload,
          isCorrectAnswer: true,
          correctAnswers: state.correctAnswers + 1,
          win: false,
          score: setScore(state.score, state.clicks),
        };
      }

    case 'CHOOSE':
      return {
        ...state,
        clicks: state.clicks + 1,        
        chosenAnswerId: action.payload ,
        win: false,
      };

    case 'NEW_GAME':
      return {
        birdsData,        
        questionId: getQuestionId(),
        chosenAnswerId: null,
        clicks: 0,
        score: 0,
        correctAnswers: 0,
        isCorrectAnswer: false,
        level: 0,
        win: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const QuestionProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

