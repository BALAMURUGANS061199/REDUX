import logo from './logo.svg';
import './App.css';
import CustomerAdd from './CustomerAdd';
import EmployeeView from './EmployeeView';
import {Provider} from 'react-redux'
import {store} from './Store'
function App() {
  return (
    <Provider store={store}>
    <div className="App">
   <CustomerAdd/>
   <EmployeeView/>
    </div>
    </Provider>
  );
}
export default App;
