import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return(
        <Tilt style={{height: '150px', width: '150px', textAlign: 'center'}} className='Tilt br2 shadow-2 ma4 mt0 pa3'>
            <div className='pa3'>
                <img style={{paddingTop: '5px'}} alt='brain' src={brain} />
            </div>
        </Tilt>
    );
}

export default Logo;