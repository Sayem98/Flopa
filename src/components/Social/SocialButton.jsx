import React from 'react';
const SocialButton = ({children,title,url}) => {
    return (
        <a target='blank' href={url} className='d-flex gap-2 align-items-center social-button'>
            {
                children
            }
            
            <p className='ttu'>{title}</p>
        </a>
    );
}

export default SocialButton;
