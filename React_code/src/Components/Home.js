import React from "react";
import "../Styles/home.css";
import WallPaper from "./WallPaper";
import QuickSearch from "./QuickSearch";
import axios from "axios";
import { useEffect , useState } from "react";
const Home = () => {
const [locations , setLocations] = useState([]);
const [mealType , setMealTypeData] = useState([]);
useEffect (() => {
    sessionStorage.clear();
    axios({
        url:'http://localhost:2109/locations',
        method:'GET',
        headers: {'Content-type':'application/json'}
    }).then(res=>{
        setLocations(res.data);
       
    }).catch(err=>console.log(err))
    axios({
        url:'http://localhost:2109/mealtypes',
        method:'GET',
        headers: {'Content-type':'application/json'}
    }).then(res=>{
        console.log(res)
        setMealTypeData(res.data);
       
    }).catch(err=>console.log(err))
},[])
    return (
        <div>
            <div className="header">
                <div className="header_logo">
                    <b>e!</b>
                </div>
                <div style={{ float: "right", marginTop: "15px" }}>
                    <div className="login">Login</div>
                    <div className="account">Create an account</div>
                </div>
            </div>
            <WallPaper locationsData = {locations} />
            <QuickSearch mealtypeData = {mealType} />

        </div>
    );
};
export default Home;
