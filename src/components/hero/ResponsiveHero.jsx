import React from 'react';
import { images } from '../../assets/images/images';
import HeroContent from './HeroContent';

const ResponsiveHero = () => {
    return (
        <div>
            <div className="position-relative title">
            <img src={images.title} alt="title" className='title' />

            </div>

            <div className="d-flex flex-column-reverse mt-lg-35 flex-lg-row gap-2 justify-content-between position-relative">
                <div className="position-relative w-50 floppa_money_wrap">
                    <img className='w-100 w-sm-75' src={images.floppa_money} alt="floppa_money" />
                </div>
                <div className="position-relative ">
                <img src={images.spring} className='spring-top position-absolute' alt="spring" />
                <HeroContent/>
                <img src={images.spring} className='spring-bottom position-absolute' alt="spring" />
                </div>
            </div>
        </div>
    );
}

export default ResponsiveHero