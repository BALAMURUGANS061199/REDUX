import logo from './logo.svg';
import './App.css';
import  CustomerAdd from './CustomerAdd'
import { Provider } from 'react-redux';
import { store } from './Store';
import CustomerView from './CustomerView';
  function App() {
    return (
      <Provider store={store}>
      <div className="App">
      <h1>React Redux Customer Example</h1>
      <CustomerAdd/>
      <CustomerView/>
      </div>
      </Provider>
    );
  }
export default App;
