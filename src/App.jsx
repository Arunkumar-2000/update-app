import './App.css'
import Home from './redux/components/Home'
import UserForm from './redux/components/UserForm'
function App() {

  return (
    <>
    <div className='container'>
      <h1>Practise Application</h1>
      <Home />
      <UserForm />
  </div>
    </>
  )
}

export default App