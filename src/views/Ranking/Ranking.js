import { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core'
import template from "./Ranking.jsx";
import getCircuitRanking from 'lib/getCircuitRanking.js'
import getCircuitTournaments from 'lib/getCircuitTournaments.js'
import { useParams } from "react-router-dom";

const useStyle = makeStyles((theme) => (
  {
    tournamentBox:
    {
      marginTop: theme.spacing(3),
    }
  }
))

const Ranking = () => {
  const { id } = useParams() 
  const [rankingId, setRankingId] = useState(id || 1)  
  const classes = useStyle()
  const [rankingState, setRankingState] = useState('initial')
  const [ranking, setRanking] = useState([])
  const [cachedRanking, setCachedRanking] = useState([])
  const [tournamentsState, setTournamentsState] = useState('initial')
  const [tournaments, setTournaments] = useState([])
  const [search, setSearch] = useState('')
  const [placement, setPlacement] = useState(false)


  useEffect(()=> {
    setRankingId(id)    
  })

  useEffect(() => {
    setRankingState('pending')

    getCircuitRanking(rankingId, placement).then((response) => {
      setCachedRanking(response.data.data)
      setRanking(response.data.data)
      setSearch('')
      setRankingState('success')
    }).catch((error) => {
      setRankingState('error')
      console.log('Something Went Wrong')
      console.log(error)
    })
  }, [placement, rankingId])

  useEffect(() => {
    setTournamentsState('pending')

    getCircuitTournaments(rankingId).then((response) => {
      setTournamentsState('success')
      setTournaments(response.data.data)
    }).catch((error) => {
      setTournamentsState('error')
      console.log('Something Went Wrong')
      console.log(error)
    })
  }, [rankingId])

  const handleSearch = (e) => {
    const tmp = e.target.value
    setSearch(tmp)
    if (tmp.length > 0){
      const filteredRanking = cachedRanking.filter((player) => (player['name'].toLowerCase().includes(tmp.toLowerCase())))     
      setRanking(filteredRanking)
    }
    else{
      setRanking(cachedRanking)
    }
  }

  const handlePlacement = () => {
    setPlacement(!placement)
  }
  return template({ classes, ranking, rankingState, tournaments, tournamentsState, search, placement, handlePlacement, handleSearch });
}

export default Ranking;
