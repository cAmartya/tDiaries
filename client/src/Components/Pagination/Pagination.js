import React, {useState, useEffect} from "react";
// import Pagination from "material-ui-flat-pagination";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './pagination.css'
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";


function PagigNation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { numberOfPages } = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  
  const changePage = ({ selected }) => {
    setPage(Number(selected)+1);

    navigate(`/posts?page=${page}`, {replace: true});
    // navigate(`/posts?page=${Number(page)+1}`, {replace: true});
  };

  useEffect(() => {
    if(page) dispatch(getPosts(page));
  
  }, [page]);
  
  

  return (
    <>
    <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={numberOfPages}
        onPageChange={changePage}
        containerClassName={"navigationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"navigationDisabled"}
        activeClassName={"navigationActive"}
      />      
    </>
  );
}

export default PagigNation;

