import React, { memo } from 'react';

const Header = ({
    categoria
}) => {
    return (
        <div className="header">
            <small>Selecione todas imagens contendo</small>
            <span>{categoria}</span>
            <small>Se não estiver vendo ônibus, clique em reload</small>
        </div>
    );
}

export default memo(Header)