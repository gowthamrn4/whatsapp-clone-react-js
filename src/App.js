// import logo from './logo.svg';
import './App.scss';
import Routes from './Routes';
import GlobalContext from './shared/contexts/Global-Context';

function App() {
  return (
    <GlobalContext>
      <div className="App">
        <Routes></Routes>
      </div>
    </GlobalContext>
  );
}

export default App;
