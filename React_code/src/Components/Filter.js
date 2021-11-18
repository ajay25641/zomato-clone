import React from 'react'
import '../Styles/filter.css';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
const Filter = () => {
    const qs = useLocation().search;
    const history = useHistory();
    const { mealtype, location } = queryString.parse(qs);

    const [filterObj, setfilterObj] = useState({
        mealtype_id: parseInt(mealtype),
        location: location ? parseInt(location) :null,
        cuisine: [],
        sort: null,
        page: null,
        lcost: null,
        hcost: null,

    })
    const [locationData, setLocations] = useState([]);
    const [restaurant, setRestaurantData] = useState([]);
    const [pageCount, setPageCount] = useState([]);
    const handleOnChange = (e) => {

        if (e.target.name === 'cuisine') {
            let value = parseInt(e.target.value);
            let index = filterObj.cuisine.indexOf(value);
            if (index >= 0) {
                filterObj.cuisine.splice(index, 1);

            } else {
                filterObj.cuisine.push(value);
            }
            setfilterObj({
                ...filterObj,
                [e.target.name]:filterObj.cuisine,
            })
        }
        else {
            setfilterObj({
                ...filterObj,
                [e.target.name]: e.target.value,
            }
            )
        }
    }
    const handleOnPriceChange = (lcost, hcost) => {
        setfilterObj({
            ...filterObj,
            lcost: lcost,
            hcost: hcost,

        }
        )
    }
    const handleOnItemClick = (resId) => {
        history.push(`/details?restaurant=${resId}`);
    }
    useEffect(() => {

        axios({
            url: 'http://localhost:2109/locations',
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then(res => {
            setLocations(res.data);

        }).catch(err => console.log(err))
        axios({
            url: 'http://localhost:2109/filter',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            data: filterObj,

        }).then((res) => {
            console.log(res)
            setRestaurantData(res.data.restaurants);
            setPageCount(res.data.pages);
        }

        ).catch(err => console.log(err))
        history.push(`/filter?mealtype=${mealtype}&location=${filterObj.location}`)

    }, [filterObj])
    return (
        <div>
            <div className="header">
                <div className="header_logo">
                    <b>e!</b>
                </div>

                <div style={{ float: 'right', marginTop: '15px' }}>
                    <div className="login">Login</div>
                    <div className="account">Create an account</div>
                </div>

            </div>

            <div>
                <div id="myId" className="heading">Breakfast Places in Mumbai</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                data-target="#filter"></span>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                <select onChange={(e) => handleOnChange(e)} name='location' >
                                    <option key='xyz' value='0'>All</option>
                                    {locationData.map((item, index) => {
                                        return <option key={index + 1} value={item.location_id} >{`${item.name} , ${item.city}`}</option>
                                    })}
                                </select>

                                <div className="Cuisine">Cuisine</div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={(e) => handleOnChange(e)} value={1} />
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={(e) => handleOnChange(e)} value={2} />
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={(e) => handleOnChange(e)} value={3} />
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={(e) => handleOnChange(e)} value={4} />
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={(e) => handleOnChange(e)} value={5} />
                                    <span className="checkbox-items">Street Food</span>
                                </div>
                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleOnPriceChange(1, 500)} />
                                    <span className="checkbox-items">Less than &#8377; 500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleOnPriceChange(500, 1000)} />
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleOnPriceChange(1000, 1500)} />
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleOnPriceChange(1500, 2000)} />
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleOnPriceChange(2000, 50000)} />
                                    <span className="checkbox-items">&#8377; 2000 +</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => handleOnPriceChange(null, null)} />
                                    <span className="checkbox-items">All</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" onChange={(e) => handleOnChange(e)} value={1} />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" onChange={(e) => handleOnChange(e)} value={-1} />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">


                            {restaurant && restaurant.length > 0 ?
                                restaurant.map((item, index) => {
                                    return (
                                        <div className="Item" key={index + 1} onClick={() => { handleOnItemClick(item._id) }} >
                                            <div>
                                                <div className="small-item vertical">
                                                    <img className="img" src={item.image} />
                                                </div>
                                                <div className="big-item">
                                                    <div className="rest-name">{item.name}</div>
                                                    <div className="rest-location">{item.locality}</div>
                                                    <div className="rest-address">{item.city}</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div>
                                                <div className="margin-left">
                                                    <div className="Bakery">CUISINES : {item.cuisine.map((cuisine) => `${cuisine.name}, `)} </div>
                                                    <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })



                                : <div className="no-records">No Records Found !!!</div>

                            }
                            {
                                restaurant && restaurant.length > 0 ?
                                    <div className="pagination">
                                        <span className="page-num">&laquo;</span>
                                        {pageCount && pageCount.length > 0 ?
                                            pageCount.map((page, index) => {
                                                return <button className="page-num" key={index} onClick={(e) => handleOnChange(e)} name='page' value={page}>{page}</button>
                                            })
                                            : null}


                                        <span className="page-num">&raquo;</span>
                                    </div>
                                    : null
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filter;