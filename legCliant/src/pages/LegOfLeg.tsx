import axios from 'axios'
import React, { useState } from 'react'

const LegOfLeg = () => {
    const [searchPlayer, setSearchPlayer ] = useState('')
    const [playerData, setPlayerData ] = useState<any>({})
    
      const riotGamesApisearchPlayer = async () => {
        try {
        const data = await axios.get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchPlayer}?api_key=${process.env.REACT_APP_API_KEY}`)
    
        setPlayerData(data.data)
        console.log(data.data);
        
      } catch (error) {
        
      }
    
    }
      
      
      return (
        <><div className='flex flex-col text-center mx-auto justify-center max-w-[33%]'>
        <label htmlFor=""> ur serach</label>
        <input className='border my-5' type="text" placeholder='enter summner name' onChange={e=>setSearchPlayer(e.target.value)} />
        <button className='border border-neutral-950 bg-slate-700 text-white ' onClick={()=>riotGamesApisearchPlayer()}>click here for search</button>
         
          <span>{playerData?.name}</span>
          {playerData?.profileIconId&&<img src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/${playerData?.profileIconId}.png`} alt="" className='w-52 h-52'/>}
          </div>
          
        </>
      );
    }

export default LegOfLeg