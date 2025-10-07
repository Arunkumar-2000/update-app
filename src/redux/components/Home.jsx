import React from 'react'
import { useSelector } from 'react-redux';


const Home = () => {

  const users = useSelector( state => state.users)
  return (
    <div>
      {users.map( item => (
        <div key={item.id}>{item.name}
        <p>{item.email}</p></div>
      ))}
      
    </div>
  )
}

export default Home;
