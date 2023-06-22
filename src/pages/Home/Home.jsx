import React from 'react'
import Navbar from '../../components/notes/Navbar';
import Greetings from '../../components/notes/Greetings';
import Cards from '../../components/notes/Card';

const Home = () => {
  return (
    <>
      <Navbar />
      <Greetings />
      <Cards />
    </>
  )
}

export default Home