
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
   
    return (
        <>
            <header className='pb-6'>
                <nav className='bg-slate-900 p-4 flex' >
                    <Link className='text-white me-3' to="/">HOME</Link> 
                    <Link className='text-white me-3' to="/tft">TFT</Link>
                    <Link className='text-white me-3' to="/leagueoflegends">LEAGUE</Link>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Navbar