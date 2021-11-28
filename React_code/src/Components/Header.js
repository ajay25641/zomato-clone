import React from 'react'
import '../Styles/home.css';
import { useHistory } from 'react-router';
import { GoogleLogin } from 'react-google-login';
import Modal from 'react-modal';
import { useState } from 'react';



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

 export const Header = () => {
    const history = useHistory();
    const [isLoginModalOpen, setLoginModalState] = useState(false);
    const [userDetail, setUserDetail] = useState({
        isLoggedIn: false,
        name: '',
        email: '',
    })


    const handleNavigate = () => {
        history.push('/');
    }
    const handleLogin = () => {
        setLoginModalState(true);
    }
    const responseGoogle = (res) => {
        setLoginModalState(false);
        if (res.error) {
          console.log(res.error);
        }
        else {
            setUserDetail({
                isLoggedIn: true,
                name: res.profileObj.name,
                email: res.profileObj.email,
            })
        }
    }
    const handleLogOut = () => {
        setUserDetail({
            isLoggedIn:false,
            name:'',
            email:'',
        })
        alert('You have logged out successfully');

    }

    return (
        <div>
            <div className="header">
                <div className="header_logo" onClick={handleNavigate} >
                    <b>e!</b>
                </div>
                <div style={{ float: "right", marginTop: "15px" }}>
                    {
                        userDetail.isLoggedIn ?

                            <div>
                                <div className="account">{userDetail.name}</div>
                                <div className="login" onClick={handleLogOut} >Log Out</div>

                            </div>

                            :
                            <div>
                                <div className="login" onClick={handleLogin} >Login</div>
                                <div className="account">Create an account</div>
                            </div>

                    }

                </div>
            </div>
            <Modal
                isOpen={isLoginModalOpen}
                style={customStyles}
            >
                <div>
                    <GoogleLogin
                        clientId="806545419625-o24vtiqs51evht7gsqe5obpik9408f47.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

            </Modal>
        </div>
    )
}


