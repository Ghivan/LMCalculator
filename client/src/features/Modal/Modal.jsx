import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({children}) => ReactDOM.createPortal(
            React.Children.only(children),
            document.querySelector('#modal')
);

export default Modal;