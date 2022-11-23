import Header from './components/header/header.component';
import Categories from './components/categories/categories.component';
import Question from './components/question/question.component';
import Answer from './components/answer/answer.component';
import Button from './components/button/button.component';
import Win from './components/win/win.component';


function App() {
  return (
    <div className="App-container"> 
      <Header />
      <Categories />
      < Question />
      <Answer/>      
      <Button />
      <Win /> 
    </div>
  );
}

export default App;
