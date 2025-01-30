import Nav from '../../components/Nav/Nav';
import SignIn from '../../components/SignIn/SignIn';

const SignInPage = ({loggedIn,setLoggedIn}) => {
    return(
        <>
        <Nav loggedIn={loggedIn}/>
        <SignIn/>
        </>

    )
}

export default SignInPage;