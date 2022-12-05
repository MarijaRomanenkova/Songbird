import { createContext, useReducer } from 'react';
import birdsData from '../data';
export const QuestionContext = createContext();

const getRandomQuestionId = (level) => {  
  const maximum = birdsData[level].length;
  const minimum = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  return randomNumber;
};

const MAXIMUM__SCORE__PER__LEVEL = 5;

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
  questionId: getRandomQuestionId(0),
  chosenAnswerId: null,
  clicks: 0,
  score: 0,
  numberOfCorrectAnswers: 0,
  isCorrectAnswer: false,  
  isGameOver: false,
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_LEVEL':
      return {
        ...state,
        level: state.level + 1,
        questionId: getRandomQuestionId(state.level),
        chosenAnswerId: null,        
        isCorrectAnswer: false,
        clicks: 0,        
        isGameOver: false,
      };

    case 'WIN':
      if (state.numberOfCorrectAnswers > 4) {
        return {
          ...state,
          score: setScore(state.score, state.clicks),
          isGameOver: true,  
          isCorrectAnswer: true,        
        };
      } else {
        return {
          ...state,
          chosenAnswerId: action.payload,
          isCorrectAnswer: true,
          numberOfnumberOf: state.numberOfCorrectAnswers + 1,
          isGameOver: false,
          score: setScore(state.score, state.clicks),
        };
      }

    case 'CHOOSE':
      return {
        ...state,
        clicks: state.clicks + 1,        
        chosenAnswerId: action.payload ,
        isGameOver: false,
      };

    case 'NEW_GAME':
      return {
        birdsData,        
        questionId: getRandomQuestionId(state.level),
        chosenAnswerId: null,
        clicks: 0,
        score: 0,
        numberOfCorrectAnswers: 0,
        isCorrectAnswer: false,
        level: 0,
        isGameOver: false,
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

