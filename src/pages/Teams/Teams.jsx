import React, { useEffect, useState } from 'react'
import TeamCard from '../../components/TeamCard/TeamCard'

const Teams = () => {
  const [teams, setTeams] = useState([])

  const getTeams = async () => {
    const response = await fetch('http://localhost:3000/api/teams')
    const responseData = await response.json()
    setTeams(responseData)
  }

  useEffect(() => {
    getTeams()
  }, [])

  return (
    <div>
      <h3>Teams Component</h3>
      {teams?.map((item, index) => (
        <div key={index}>
          <TeamCard data={item} />
        </div>
      ))}
    </div>
  )
}

export default Teams
