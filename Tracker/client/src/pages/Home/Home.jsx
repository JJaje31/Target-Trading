import Nav from '../../components/Nav/Nav';
import Intro from '../../components/Intro/Intro'

const Home = ({loggedIn}) => {
    return(
        <>
<Nav loggedIn={loggedIn}/>
<div className='mt-[170px] h-100vh p-12'>
  <Intro/>
  </div>
  </>
    )
}

export default Home;