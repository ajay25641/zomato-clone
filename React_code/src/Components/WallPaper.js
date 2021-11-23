import React from 'react'
import '../Styles/home.css';
import axios from "../axios";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const WallPaper = ({ locationsData }) => {

    const [restaurantList, setRestaurantList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (searchText.length === 0) {
            setSuggestions([]);
        }
        else {
            let filteredRestaurant = restaurantList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setSuggestions(filteredRestaurant);
        }

    }, [searchText])

    const handleLocationChange = (e) => {
        const locationId = e.target.value;
        sessionStorage.setItem('locationId', locationId);
        axios({
            url: `/getRestaurantByCity/${locationId}`,
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then(res => {

            setRestaurantList(res.data);

        }).catch(err => console.log(err))
    }
    const selectedText = (res) => {

        history.push(`/details?restaurant=${res._id}`);

    }
 
    return (
      
            <div>
                <img src="./Assets/homepageimg.png" width="100%" height="450" />
                <div>

                    <div className="logo">
                        <p>e!</p>
                    </div>

                    <div className="headings">
                        Find the best restaurants, cafes, bars
                    </div>

                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={(e) => handleLocationChange(e)}>
                            <option key='xyz' value="0" >Select</option>
                            {locationsData.map((item, index) => {
                                return <option key={index + 1} value={item.location_id} >{`${item.name} , ${item.city}`}</option>
                            })}
                        </select>
                        <div>
                            <div id="notebooks">
                                <input id="query" className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                {
                                    suggestions.length > 0
                                        ?
                                        <ul >
                                            {
                                                suggestions.map((item, index) => (<li key={index} onClick={() => selectedText(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                                            }
                                        </ul>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    


    )
}
export default WallPaper;