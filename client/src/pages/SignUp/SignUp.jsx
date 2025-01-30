import Nav from '../../components/Nav/Nav';
import SignUp from '../../components/SignUp/SignUp';

const SignUpPage = ({loggedIn}) => {
    return(
        <>
        <Nav loggedIn={loggedIn}/>
        <SignUp/>
        </>
    )
}

export default SignUpPage;