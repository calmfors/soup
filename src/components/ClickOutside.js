import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    background - color: rgba(100, 100, 100, 0.5);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
`

const OverlayContainer = styled.div`
    border: 1px solid black;
    background - color: white;
    position: absolute;
    top: 30px;
    left: 30px;
    width: 200px;
    height: 80px;
    padding: 5px;
`

function ClickOutside(props) {
    const { contents } = props;
    const [open, setOpen] = useState(true);
    if (open) {
        return <Overlay onClick={() => setOpen(false)}>
            <OverlayContainer onClick={(e) => {
                //stop clicks getting to the overlay
                props.seeOrder && e.stopPropagation();
            }}>
                {contents()}
            </OverlayContainer>
        </Overlay>
    }
    return null;
}
export default ClickOutside;