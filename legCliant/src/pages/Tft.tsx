import axios from 'axios'
import { useEffect, useState } from 'react'

interface PlayerData {
  name: string;
  profileIconId: number;
  puuid: string;
}

const Tft = () => {
  const [searchPlayer, setSearchPlayer] = useState('')
  const [playerData, setPlayerData] = useState<PlayerData | null>(null)
  const [matchData, setMatchData] = useState<any>(null)

  const riotGamesApisearchPlayer = async () => {
    try {
      const { data } = await axios.get(`https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/q7ASz-K3dOQDyD8w6wNPzdyUWr7J1fVWkSoYpiWMpO5WmT_nXQvHvbdyK-MtPoZng28hoghTrussGQ?api_key=${process.env.REACT_APP_API_KEY}`)
       
    
      setPlayerData(data)
    } catch (error) {
      console.error(error)
    }
  }
  const getMatchId = async (puuid:string)=>{
    
    const { data } = await axios.get(`https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/q7ASz-K3dOQDyD8w6wNPzdyUWr7J1fVWkSoYpiWMpO5WmT_nXQvHvbdyK-MtPoZng28hoghTrussGQ/ids?start=0&count=10&api_key= ${process.env.REACT_APP_API_KEY}`)
    console.log(data);
    
    return data;
  
  }
  const getMatchInfo = async (matchId:string)=>{
    const { data } = await axios.get(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${process.env.REACT_APP_API_KEY}`)
   
    return data;
  }
  useEffect(() => {
    const fetchData = async () => {
      if (playerData) {
        try {
          const matchIds = await getMatchId(playerData.puuid);
          const matchInfo = await Promise.all(matchIds.map(async (matchId: string) => {
            const info = await getMatchInfo(matchId);
            return info;
          }));
          setMatchData(matchInfo);
        } catch (error) {
          console.log("what");
          
          console.error(error);
        }
      }
      console.log(matchData);
      
    };
    fetchData();
  }, [playerData])

  return (
    <div className='flex flex-col text-center mx-auto justify-center max-w-[33%]'>
      <label htmlFor="">Your search</label>
      <input className='border my-5' type="text" placeholder='Enter summoner name' onChange={e => setSearchPlayer(e.target.value)} />
      <button className='border border-neutral-950 bg-slate-700 text-white' onClick={riotGamesApisearchPlayer}>Click here to search</button>

      {playerData && (
        <>
          <span>{playerData.name}</span>
          {playerData.profileIconId && (
            <img src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/${playerData.profileIconId}.png`} alt="" className='w-52 h-52' />
          )}
          <div className='flex justify-start flex-wrap'>
            <h2 className='text-center'>your stats</h2>
            <div >
              {matchData && matchData.map((match: any) => (
                <div key={match.metadata.match_id}>
                    <h3>Match {match.metadata.match_id}</h3>
                    <div>
                      {match.info.participants.map((participant: any) => (
                        <div key={participant.puuid}>
                          <h4>{participant.puuid === playerData.puuid ? playerData.name : 'Opponent'}</h4>
                          <div>
                            <p>placement: {participant.placement}</p>
                            <p>total_damage_to_players: {participant.total_damage_to_players} | killed {participant.total_damage_to_players /20}</p>
                            <div className='flex justify-around'>
                            {participant.units.map((unit: any) => (
                            <div className='flex ' key={unit.character_id}>{unit.character_id.slice(6)}</div>
                            ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              ))}
    
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Tft
