import React, { memo } from 'react';
import { MdCached } from 'react-icons/md'

// import { Container } from './styles';

const Buttons = ({
    handlerClick,
    reload,
    load
}) => {
    return (
        <div className="actions">
            <button className="button-secondary" onClick={e => reload()}><MdCached /></button>
            <button className="button-primary" onClick={e => handlerClick()}>{load ? <div className="loader"></div>
                : 'Verificar'}</button>
        </div>
    );
}

export default memo(Buttons)