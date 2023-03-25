import React from 'react';
import classes from './ClickableImage.module.scss'

interface ClickableImageProps {
    visible: boolean,
    setVisible: (any) => void
    setChildren: (arg0: React.ReactNode) => void
    img: string
}

const ClickableImage: React.FC<ClickableImageProps> = ({setChildren, setVisible, visible, img}) => {
    return (
        <div 
            onClick={() => {
                setChildren(<img src={process.env.REACT_APP_API_URL + img} alt="" width="1600px" height="900px" />) 
                setVisible((prev) => !prev)
            }
            }
            className={classes.Modal}
        >
            <img src={process.env.REACT_APP_API_URL + img} alt="" width="310px" height="180px" />
        </div>
    );
};

export default ClickableImage;