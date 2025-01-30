import Nav from '../../components/Nav/Nav';
import StockList from '../../components/StockList/StockList';

const MyStocks = ({loggedIn,setLoggedIn}) => {
    return(
    <>
    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <StockList loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </>
    )
}

export default MyStocks;

