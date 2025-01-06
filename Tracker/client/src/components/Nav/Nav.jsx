import {Link,useLocation,useParams} from 'react-router'
import { useState } from 'react'



const Header = ({ loggedIn, setLoggedIn }) => {
    const { userId } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleSignOut = () => {
      setLoggedIn(false);
      window.location.href = '/';
    };
  
    const getLinkClass = (path) =>
      location.pathname === path
        ? 'text-black font-semibold'
        : 'text-gray-400 hover:text-black';
  
    return (
      <nav className="bg-gray-100 fixed w-full top-0 left-0 z-50 shadow-lg">
        <div
          className="h-20 bg-local"
          style={{ backgroundImage: 'url("/images/stock.jpeg")' }}
        ></div>
  
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <div className="flex border-4 bg-lime-600 rounded-lg shadow-xl">
              <img
                className="h-10 m-2"
                src="/images/targetTrading.jpeg"
                alt="Target Trading Logo"
              />
            </div>
            <h1 className="font-mono text-black ml-2">Target Trading</h1>
          </div>
          <div
            className={`hidden md:flex items-center justify-center flex-1 space-x-10`}
          >
            {loggedIn ? (
              <>
                <Link
                  className={getLinkClass(`/NewStock/${userId}`)}
                  to={`/NewStock/${userId}`}
                >
                  New Stock
                </Link>
                <Link className={getLinkClass(`/MyStocks/${userId}`)} 
                to={`/MyStocks/${userId}`}>
                  My Stocks
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hover:text-black bg-gray-500 text-white py-1 px-4 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link className={getLinkClass('/')} to="/">
                  Home
                </Link>
                <Link className={getLinkClass('/SignIn')} to="/SignIn">
                  Sign In
                </Link>
                <Link className={getLinkClass('/SignUp')} to="/SignUp">
                  Sign Up
                </Link>
              </>
            )}
          </div>
  
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block md:hidden text-gray-400 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
  
         
            <div
              className={`${
                isMenuOpen ? 'block' : 'hidden'
              } absolute right-0 top-10 w-60 bg-gray-100 rounded-lg shadow-lg z-50`}
            >
              <div className="flex flex-col items-start p-4 space-y-2">
                {loggedIn ? (
                  <>
                    <Link
                      className={`${getLinkClass(
                        `/NewStock/${userId}`
                      )} w-full`}
                      to={`/NewStock/${userId}`}
                    >
                      New Stock
                    </Link>
                    <Link
                      className={`${getLinkClass(`/MyStocks/${userId}`)} w-full`}
                      to={`/MyStocks/${userId}`}
                    >
                      My Stocks
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="hover:text-black bg-gray-500 text-white py-1 px-4 rounded-lg w-full"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link className={`${getLinkClass('/')} w-full`} to="/">
                      Home
                    </Link>
                    <Link
                      className={`${getLinkClass('/SignIn')} w-full`}
                      to="/SignIn"
                    >
                      Sign In
                    </Link>
                    <Link
                      className={`${getLinkClass('/SignUp')} w-full`}
                      to="/SignUp"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };


export default Header;