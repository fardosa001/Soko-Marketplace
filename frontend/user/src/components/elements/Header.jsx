import Navbar from './Navbar';
const Header = () => {
    return (
        <header className="header">
            <div className='top-header'>
                <div className="logo"></div>
                <div className="searchbar"></div>
                <div className="header-icons">
                    <div className="heart"></div>
                    <div className="user"></div>
                    <div className="cart"></div>
                </div>
            </div>
            <div className='navbar'>
                <Navbar />
            </div>
        </header>
    );
  };
  
  export default Header