import Nav from '../../components/Nav/Nav';
import CreateStock from '../../components/CreateStock/CreateStock';

const NewStock = ({loggedIn,setLoggedIn}) => {

    return(
        <>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <CreateStock setLoggedIn={setLoggedIn}/>
        </>
    )
}

export default NewStock;