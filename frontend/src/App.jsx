import './App.css'
import {Routes, Route} from "react-router-dom"
import { Signup } from './components/Signup'
function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/sign-up' element={<Signup/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
