import React from 'react';
import '../Styles/home.css';
import { useHistory} from 'react-router-dom';

const QuickSearchItems = ({ mealtypeData }) => {
const history = useHistory();
const handleOnClick = (mealtypeId)=>{
 const locationId = sessionStorage.getItem('locationId');
 if(locationId){
    history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`)
 } else {
    history.push(`/filter?mealtype=${mealtypeId}`)
 }

  
}

    return (
        <div
            className="col-sm-12 col-md-6 col-lg-4"
            style={{ width: "100%" }}
        >
            {
                mealtypeData.map((item, index) => {
                    return (
                        <div key={index + 1} className="item" onClick={()=>handleOnClick(item.meal_type)} >
                           <div className="qs_options_sub_block_one">
                                <img
                                    src={item.image}
                                    width='100%'
                                    height='160px'
                                    alt='img not found'
                                    key={index}
                                />
                            </div>
                            <div className="qs_options_sub_block_two">
                                <div>
                                    <div className='Breakfast'>{item.name}</div>
                                    <div className="content">
                                        <p>{item.content}</p>
                                    {    console.log(item.content)}

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }

        </div>
    )
}

export default QuickSearchItems;