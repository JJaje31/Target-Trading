import { useState} from 'react'
import './output.css'
import Home from '../../pages/Home/Home';
import { BrowserRouter,Route,Routes } from 'react-router';
import Nav from '../Nav/Nav'
import SignInPage from '../../pages/SignIn/SignIn'
import SignUpPage from '../../pages/SignUp/SignUp'
import NewStockPage from '../../pages/NewStock/NewStock';
import MyStocksPage from '../../pages/MyStocks/MyStocks'



function App() {
const [loggedIn,setLoggedIn] = useState(false)


  return (
    <>

<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/SignIn"  element={<SignInPage loggedIn={loggedIn}/>}/>
  <Route path="/SignUp"  element={<SignUpPage loggedIn={loggedIn}/>}/>
  <Route path="/NewStock/:userId"  element={<NewStockPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
  <Route path="/MyStocks/:userId" element={<MyStocksPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
</Routes>
</BrowserRouter>






    </>
  )
}

export default App

