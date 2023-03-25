import React from 'react';
import classes from './Modal.module.scss'

interface ModalProps {
    visible: boolean
    setVisible: (arg0: boolean) => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({visible, setVisible, children}) => {
    return (
        <div>
            {visible
            ? <div className={classes.Modal} onClick={() => setVisible(false)}>
                <div className={classes.Modal_content} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
            : null
            }
        </div>
    );
};

export default Modal;