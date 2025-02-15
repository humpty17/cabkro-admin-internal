import { BiSearch } from "react-icons/bi"

const SearchBox = ({handleSearchChange, searchValue,handleButtonClick}) =>{
   return(
    <div className="input-group " style={{ width: '30%' }}>
      <input
        type="text"
        placeholder="Search.."
        value={searchValue}
        className="form-control"
        style={{ padding: '10px',  boxShadow: "none",
            }}
        onChange={handleSearchChange}
      />
      <button className="btn btn-outline-secondary" type="button" id="button-search">
        <BiSearch onClick={()=>handleButtonClick(searchValue)}></BiSearch>
      </button>
    </div>
    
)
   
}


export default SearchBox