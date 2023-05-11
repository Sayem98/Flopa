import React from 'react';
import { images } from '../../assets/images/images';

const CommingSoon = () => {
    return (
        <div className='coming-soon position-relative'>
        <img className='position-absolute wave-to-down' src={images.wave_down} alt="wave_down" />
        <img className='position-absolute wave-down' src={images.wave_down_white} alt="wave_down_white" />

        <img className='position-absolute wave-pink' src={images.wave_pink} alt="wave_down_white" />
        <img className='position-absolute wave-white' src={images.wave_white} alt="wave_down" />
        <img className='position-absolute tree' src={images.tree} alt="tree" />


        <img className='man-up-horse' src={images.horse} alt="horse" />
            <button>Coming Soon</button>
        </div>
    );
}

export default CommingSoon;
