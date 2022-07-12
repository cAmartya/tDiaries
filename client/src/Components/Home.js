import React from 'react'
import PagiNation from './Pagination/Pagination'
import Posts from './Post/Posts'
import SearchBar from './SearchBar'
function Home() {
  return (
    <div className='container my-3'>
      <SearchBar/>
      <Posts />
      <PagiNation />
    </div>
  )
}

export default Home