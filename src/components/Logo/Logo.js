import React from 'react';
import Tilt from 'react-tilt';
import logo from './icons8-anonymous-mask-128.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 130, width: 130 }} >
                <div className="Tilt-inner pa3">
                    <img src={logo} alt='face recognition logo'></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;