import React from "react";
import "../Styles/home.css";
import WallPaper from "./WallPaper";
import QuickSearch from "./QuickSearch";
import axios from "../axios";
import { useEffect , useState } from "react";


const Home = () => {
const [locations , setLocations] = useState([]);
const [mealType , setMealTypeData] = useState([]);
useEffect (() => {
    sessionStorage.clear();
    axios({
        url:"/locations",
        method:'GET',
        headers: {'Content-type':'application/json'}
    }).then(res=>{
        setLocations(res.data);
       
    }).catch(err=>console.log(err))
    axios({
        url:'/mealtypes',
        method:'GET',
        headers: {'Content-type':'application/json'}
    }).then(res=>{
        console.log(res)
        setMealTypeData(res.data);
       
    }).catch(err=>console.log(err))
},[])
    return (
        <div>
      
            <WallPaper locationsData = {locations} />
            <QuickSearch mealtypeData = {mealType} />

        </div>
    );
};
export default Home;
