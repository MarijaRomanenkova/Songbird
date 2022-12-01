import { createContext, useReducer } from 'react';
import birdsData from '../data';
export const QuestionContext = createContext();



const currentId = () => {
  const maximum = 6;
  const minimum = 0;
  const randomNumber =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  return randomNumber;
};

const setChosenBirdId = (a = 0) => {
  return a - 1;
};

const setCorrectAnswer = (bool = false) => {
  return bool;
};

const setWin = (bool = false) => {
  return bool;
};

const setToZero = () => {
  return 0;
};

const setScore = (prevScore, clicks) => {  
  if (clicks === 1) {
    return prevScore + 5;
  } else if (clicks === 2) {
    return prevScore + 4;
  } else if (clicks === 3) {
    return prevScore + 3;
  } else if (clicks === 4) {
    return prevScore + 2;
  } else if (clicks === 5) {
    return prevScore + 1;
  } else {
    return prevScore;
  }
};

const initialState = {
  birdsData,
  currentCategoryIndex: 0,
  currentBirdId: currentId(),
  chosenBirdId: setChosenBirdId(null),
  clicks: 0,
  score: 0,
  correctAnswers: 0,
  isCorrectAnswer: setCorrectAnswer(false),
  level: 0,
  win: setWin(false),
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_LEVEL':
      return {
        ...state,
        currentBirdId: currentId(),
        chosenBirdId: setChosenBirdId(null),
        currentCategoryIndex: state.currentCategoryIndex + 1,
        isCorrectAnswer: setCorrectAnswer(false),
        clicks: setToZero(),
        level: state.level + 1,
        win: setWin(false),
      };

    case 'WIN':
      if (state.correctAnswers > 4) {
        return {
          ...state,
          chosenBirdId: setChosenBirdId(null),
          score: setScore(state.score, state.clicks),
          win: setWin(true),          
        };
      } else {
        return {
          ...state,
          chosenBirdId: setChosenBirdId(action.payload),
          isCorrectAnswer: setCorrectAnswer(true),
          correctAnswers: state.correctAnswers + 1,
          win: setWin(false),
          score: setScore(state.score, state.clicks),
        };
      }

    case 'CHOOSE':
      return {
        ...state,
        clicks: state.clicks + 1,
        chosenBirdId: setChosenBirdId(action.payload),
        win: setWin(false),
      };

    case 'NEW_GAME':
      return {
        birdsData,
        currentCategoryIndex: 0,
        currentBirdId: currentId(),
        chosenBirdId: setChosenBirdId(null),
        clicks: 0,
        score: 0,
        correctAnswers: 0,
        isCorrectAnswer: setCorrectAnswer(false),
        level: 0,
        win: setWin(false),
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

