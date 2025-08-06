import { ExpenseGrouper } from './components/ExpenseGrouper';
import './App.css'
import { expenses } from './data';

function App() {

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseGrouper expenses={expenses}/>
    </div>
  )
}

export default App
