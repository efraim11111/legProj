
import { Route, Routes } from 'react-router-dom'
// import Loading from '../shared/Loading'
import Tft from '../pages/Tft'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import LegOfLeg from '../pages/LegOfLeg'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route path='/' element={<Home />} />
                <Route path='/tft' element={<Tft />} />
                <Route path='/leagueoflegends' element={<LegOfLeg />} />
                {/* <Route path='/loading' element={<Loading on={true}/>} /> */}
             
                <Route path='*' element={<h1 className='text-4xl'>404 not found</h1>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes