// import React, {useEffect, useState} from 'react'
// import { Link, useNavigate, useLocation } from "react-router-dom"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
// import ChipInput from 'material-ui-chip-input'
import { getPostsBySearch } from '../actions/posts'
// import { getPosts, getPostsBySearch } from '../actions/posts'

// const useQuery = () => new URLSearchParams(useLocation().search);

function SearchBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const query = useQuery();
    // const page = query.get('page');
    // const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState('');

    const handleSearch = (e) =>  {
        e.preventDefault();
        // console.log(tags);
        if(search.trim()|| tags.trim())  {
            dispatch(getPostsBySearch({search, tags: tags}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags}`, {replace: true});
        }else{
            navigate("/posts", {replace: true});
        }
    }
  return (
    <div>
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
            value={search} onChange={(e) =>{setSearch(e.target.value)}} onKeyDown={(e)=>{if(e.keycode === 13) handleSearch()}} />
            <input className="form-control me-2" type="search" placeholder="Search By Tags (tags must be comma seperated)" aria-label="Search By Tsgs"
            value={tags} onChange={(e) =>{setTags(e.target.value)}} onKeyDown={(e)=>{if(e.keycode === 13) handleSearch()}} />
            
            {/* <Link className="btn btn-outline-success" role="button" to= "/login" >Login </Link> */}
            <button className="btn btn-outline-success" onClick={handleSearch} disabled={!search.length && !tags.length}>SEARCH</button>
        </form>
  </div>
  )
}

export default SearchBar