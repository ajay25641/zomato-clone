import React from 'react'
import '../Styles/details.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from '../axios';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid brown',
    },
};

const Details = () => {
    const qs = useLocation().search;
    const { restaurant } = queryString.parse(qs);
    const [restaurantData, setRestaurantData] = useState({});
    const [menuItems, setMenuItems] = useState([]);
    const [subTotal, setTotal] = useState(0);
    const [modalState, setModalState] = useState({
        itemModalIsOpen: false,
        galleryModalIsOpen: false,
        isPaymentFormOpen: false,
    });
    const [userDetail , setUserDetail] = useState({
        name:'',
        email:'',
        contact_number:'',
        address:'',
    })
    useEffect(() => {
        axios({
            url: `/getRestaurantById/${restaurant}`,
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then(res => {
            setRestaurantData(res.data);

        }).catch(err => console.log(err))
    }, [restaurant])

    const handleOrderPlace = () => {
      
      

        axios({
            url: `/menuitems/${restaurant}`,
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then(res => {
            setMenuItems(res.data);
            setModalState({
                ...modalState,
                itemModalIsOpen: true
            })
        }).catch(err => console.log(err))
    }
    const handleModalState = (e) => {

     if(e.target.name === 'isPaymentFormOpen'){
      setModalState({
        itemModalIsOpen: false,
        [e.target.name]:e.target.value,
      })
     } else {
        setModalState({
          [e.target.name]: e.target.value,
        })
    }
    }
    const handleItemQty = (index, operationType) => {
        let total = 0;
        let items = [...menuItems];
        let item = items[index];
        if (operationType === 'add') {
            item.qty += 1;
        } else {
            item.qty -= 1;
        }
        items[index] = item;
        items.map((value) => {
            total += value.qty * value.price;
        })
        console.log(total)
        setTotal(total);
    }
    const handleInputChange =(e)=>{
        setUserDetail({
            ...userDetail,
            [e.target.name]:e.target.value,
        })
      }
     const isDate = (val) =>{
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

 const isObj = (val) => {
        return typeof val === 'object'
    }

   const stringifyValue = (val) => {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

  const buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    const post = (details) => {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

   const getData = (data) => {
        return fetch(`https://zomato-express.herokuapp.com/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

  const Payments = () => {
        const paymentObj = {
            amount: subTotal,
            email:userDetail.email,
        };

        getData(paymentObj).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            post(information)
        })
    }
    return (
        <div>
        
            <div>
                <img src={restaurantData.image} alt="No Image, Sorry for the Inconvinience" width="100%" height="350px" />

                <button className="button" onClick={(e) => { handleModalState(e) }} name='galleryModalIsOpen' value={true} >Click to see Image Gallery</button>
            </div>
            <div className="heading">{restaurantData.name}</div>
            <button className="btn-order" onClick={handleOrderPlace} >Place Online Order</button>

            <div className="tabs">
                <div className="tab">
                    <input type="radio" id="tab-1" name="tab-group-1" checked />
                    <label for="tab-1">Overview</label>

                    <div className="content1">
                        <div className="about">About this place</div>
                        <div className="head">Cuisine</div>
                        <div className="value">{restaurantData && restaurantData.cuisine && restaurantData.cuisine.map((item) => `${item.name}, `)}</div>
                        <div className="head">Average Cost</div>
                        <div className="value">&#8377;{restaurantData.min_price} for two people(Approx)</div>
                    </div>
                </div>

                <div className="tab">
                    <input type="radio" id="tab-2" name="tab-group-1" />
                    <label for="tab-2">Contact</label>
                    <div className="content1">
                        <div className="head">Phone Number</div>
                        <div className="value">{restaurantData.contact_number}</div>
                        <div className="head">{restaurantData.name}</div>
                        <div className="value">{`${restaurantData.locality}, ${restaurantData.city}`}</div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalState.itemModalIsOpen}
                style={customStyles}

            >
                <div>
                    <div className='far fa-times-circle' style={{ float: 'right', }} onClick={(e) =>{ 
                        handleModalState(e);
                        setTotal(0);
                    }} name='itemModalIsOpen' value={false} ></div>
                    <div>
                        <h3 className="restaurant-name">{restaurantData.name}</h3>
                        <h3 className="item-total">SubTotal : {subTotal}</h3>
                        <button className="btn btn-danger order-button" onClick={(e) => {
                            if(subTotal == 0){
                                alert('Please select at least one item');
                            }else
                            handleModalState(e);

                        }} name='isPaymentFormOpen' value={true}>Pay Now</button>
                    </div>
                    <div>
                        {
                            menuItems.map((item, index) => {
                                return (
                                    <div key={index + 1} style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', }}>
                                        <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                                            <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                    <span className="card-body">
                                                        <h5 className="item-name">{item.name}</h5>
                                                        <h5 className="item-price">&#8377;{item.price}</h5>
                                                        <p className="item-descp">{item.description}</p>
                                                    </span>
                                                </div>
                                                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                    <img className="card-img-center title-img" src={`../${item.image}`} style={{
                                                        height: '75px',
                                                        width: '75px',
                                                        borderRadius: '20px',
                                                        marginTop: '30px',
                                                        marginLeft: '35px'
                                                    }} />
                                                    {item.qty == 0 ?
                                                        <div>
                                                            <button className="add-button" onClick={() => handleItemQty(index, 'add')} >Add</button>
                                                        </div> :
                                                        <div className="add-number">
                                                            <button onClick={() => handleItemQty(index, 'subtract')} >-</button>
                                                            <span style={{ backgroundColor: 'white' }}>{item.qty}</span>
                                                            <button onClick={() => handleItemQty(index, 'add')}>+</button>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalState.galleryModalIsOpen}
                style={customStyles}

            >
                <div>
                    <div className='far fa-times-circle' style={{ float: 'right', }} onClick={(e) => handleModalState(e)} name='galleryModalIsOpen' value={false} ></div>

                    <div>
                        <Carousel showThumbs={false} showIndicators={false}>

                            {restaurantData && restaurantData.thumb &&
                                restaurantData.thumb.map((item) => {
                                    return (
                                        <div>
                                            <img src={`${item}`} />

                                        </div>
                                    )
                                })
                            }


                        </Carousel>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalState.isPaymentFormOpen}
                style={customStyles}
            >
                <div>
                    <div style={{ float: 'right' }} className="fas fa-times" onClick={(e) =>{ 
                        handleModalState(e);
                        setTotal(0);
                        setUserDetail({
                            name:'',
                            email:'',
                            contact_number:'',
                            address:'',
                        
                        })
                    }}
                         name='isPaymentFormOpen' value={false} ></div>
                    <h3>{restaurantData.name}</h3>
                    <div>
                        <label className="form-label">Name</label>
                        <input style={{ width: '350px' }} className="form-control" type="text" placeholder="Enter Your Name"  name='name' onChange={(e)=>handleInputChange(e)} value={userDetail.name} />
                    </div>
                    <div>
                        <label className="form-label">Email</label>
                        <input style={{ width: '350px' }} className="form-control" type="text" placeholder="Enter Your Email"  name='email' onChange={(e)=>handleInputChange(e)} value={userDetail.email} />
                    </div>
                    <div>
                        <label className="form-label">Contact Number</label>
                        <input style={{ width: '350px' }} className="form-control" type="tel" placeholder="Enter Your Number"  name='contact_number' onChange={(e)=>handleInputChange(e)} value={userDetail.contact_number} />
                    </div>
                    <div>
                        <label className="form-label">Address</label>
                        <textarea className="form-control" placeholder="Enter Your Address"  name='address' onChange={(e)=>handleInputChange(e)} value={userDetail.address} />
                    </div>
                    <button className="btn btn-danger" style={{ float: 'right', marginTop: '5px' }} onClick={()=>Payments()} >Proceed</button>
                </div>
            </Modal>

        </div>


    )
}

export default Details;