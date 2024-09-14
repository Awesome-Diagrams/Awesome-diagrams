import './App.css';
import { FaBeer } from 'react-icons/fa';

function App(   ) {
  const n = 5;
  return       (
    <div className="App">
    <div className="flex flex-row gap-3">
      <FaBeer size={64}/>
      <div>text</div>
    </div>
    </div>
  );

}


export default App;
