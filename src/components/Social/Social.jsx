import React from 'react';
import SocialButton from './SocialButton';
import { BsMedium, BsTelegram } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { SiGitbook } from 'react-icons/si';


const Social = () => {
    return (
        <div className='d-flex flex-column justify-content-md-center flex-md-row align-items-start align-items-md-center justify-content-start gap-3 mt-5'>
            <SocialButton url={'https://t.me/BigFloppaPortal'} title={'Telegram'}>
                <BsTelegram className='font-20' />
            </SocialButton>
            <SocialButton url={'https://twitter.com/floppa_eth'} title={'Twitter'}>
                <AiFillTwitterCircle className='font-20'/>
            </SocialButton>
            <SocialButton url={'https://medium.com/@BigFloppa'} title={'Medium'}>
                <BsMedium className='font-20'/>
            </SocialButton>
            <SocialButton url={'https://domain.com'} title={'GitBook'}>
                <SiGitbook className='font-20'/>
            </SocialButton>
        </div>
    );
}

export default Social;
