import React, { memo } from 'react';
import { MdDone } from 'react-icons/md'
// import { Container } from './styles';

const ItemImage = ({
    handlerSelect,
    src,
    isSelected,
    i
}) => {
    return (
        <div onClick={e => handlerSelect(src)} className={`div${i} img-item`} style={{
            backgroundImage: `url(${src}) `
        }}> {isSelected ? (<div className="is-selected"><MdDone /></div>) : false}
        </div>
    );
}

export default memo(ItemImage)