import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
// this is the css file for the date 
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import List from "../../pages/home/list/List";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";


const Header = ({type}) => {
    const [destination , setDestination] = useState("");
    const [openDate , setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions , setOpenOptions] = useState(false)
  const [options , setOptions] = useState({
    adult:1,
    children:0,
    room:1,
  })

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
//   while clicking on the + and - sigin this function will run and it will take the previous state which was adult:1 , children:0 , room:1
// and it will find name : adult , children , room while clicking on decrece it will do -1 and as for increase +1 ... 
  const handleOption = (name, operation) => {
    setOptions(prev=>{return {
        ...prev, [name]: operation === "i" ? options[name] +1 : options[name] -1,
    };
    });
  };

  const {dispatch} = useContext(SearchContext)

  // payload will be the new satet which we are going to set destination , date , option .... 
  const handleSearch = () =>{
    dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
    navigate ("/hotels", {state:{destination, dates, options}});
  }
  return (
    <div className="header">
      <div className={type === List ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        { type !== "list" &&   
        <> 
        
        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels - unlock saving of 10% or more with a
          free AA Booking account
        </p>
        {!user && <button className="headerBtn">Sign in / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
              onChange={e=>setDestination(e.target.value)}
            />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            {/* here we had set a date option while clicking on it the date option will be selected and we can select date 
            bydefault the value is false as soon as we click on it , it will became true and we can choose date  */}
            <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText">{`${format(
                dates[0].startDate,
                "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className= "date"
              minDate={new Date()}
            />}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult - ${options.children} children - ${options.room} room`} </span>
            {/* here we had set a adult and children option and the default value is false and we can while clicking on it we can make it true ... */}
            {openOptions && <div className="options">

                <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                    <button  disabled={options.adult <=1 } className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                    </div>
                </div>

                <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                    <button disabled={options.children <=0 }  className="optionCounterButton"onClick={()=>handleOption("children", "d")}>-</button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCounterButton"onClick={()=>handleOption("children", "i")}>+</button>
                    </div>
                </div>

                <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                    <button disabled={options.room <=1 }  className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                    </div>
                </div>
            </div>}
          </div> 

          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>}
      </div>
    </div>
  );
};

export default Header;
