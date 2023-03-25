import React from 'react';
import { Link } from 'react-router-dom';
import classes from './BannerImage.module.scss'

interface BannerImageProps {
    link?: string,
    src: string,
    disabled?: boolean
}

const BannerImage: React.FC<BannerImageProps> = ({link="/", src, disabled}) => {


    return (
        <div className={classes.BannerImage}>
            {disabled 
            ?   <img src={src} alt=""/>
            :   <Link to={link}>   
                    <img src={src} alt=""/>
                </Link>
            }
        </div>
    );
};

export default BannerImage;