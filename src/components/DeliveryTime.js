import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  color: ${props => props.disabled ? "#777" : "#fff"};
  margin: 7px 10px 7px 0;
`;
const Asap = styled.p`
  color: ${props => props.disabled ? "#777" : "#fff"};
  padding:0 0 15px 0;
  margin:0 0 10px 0;
  border-bottom: 1px solid #fff;
`
const Select = styled.select`
width: 90px; 
padding: 2px;
color: ${props => props.closed ? "#f00" : "#000"};
max-height: 200px;
`
function DeliveryTime(props) {
    const [closed, setClosed] = useState(false)
    const [timeArray, setTimeArray] = useState(getTimeArray)
    const [time, setTime] = useState("")

    useEffect(() => {
        if (!time) {
            setTime(timeArray[0])
            props.handleTime(timeArray[0])
        }
    }, [time, timeArray, props])

    function roundTimeQuarterHour(time) {
        var timeToReturn = new Date(time);

        timeToReturn.setMilliseconds(Math.round(timeToReturn.getMilliseconds() / 1000) * 1000);
        timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
        timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
        return timeToReturn;
    }
    function getTimeArray() {
        var currentDate = new Date();
        let startTime = new Date(currentDate.getTime() + 30 * 60 * 1000)
        let roundedStartTime = roundTimeQuarterHour(startTime)

        let tempTimeArray = []
        const timeString = new Date().toISOString().slice(0, 10)
        const timeStamp = Math.round(new Date(`${timeString} 21: 15`).getTime());
        const amountOf15Minutes = (timeStamp - roundedStartTime.getTime()) / 1000 / 60 / 15

        if (amountOf15Minutes > 1 && amountOf15Minutes < 56) {

            let timeArray = [roundedStartTime.toString().slice(16, 21)]
            for (let i = 1; i < amountOf15Minutes; i++) {
                let time = roundedStartTime.getTime() + (i * 15 * 60 * 1000)
                time = new Date(time)
                if (time.toString().slice(16, 18) > 9)
                    tempTimeArray.push(time.toString().slice(16, 21))
            }
        }
        else {
            tempTimeArray = ["Closed"]
            setClosed(true);
        }
        return tempTimeArray
    }
    function handleSelect(e) {
        props.handleTime(e.target.value)
    }

    return (
        <div>
            <div>
                <Label disabled={props.disabled} htmlFor="deliverytime">Delivery time</Label>
                <Select onChange={handleSelect} closed={closed} disabled={props.disabled} id="deliverytime" size="1">
                    {timeArray.map((time, i) =>
                        <option key={i} value={time}>{time} </option>
                    )}
                </Select>
            </div>
            <div>
                <Asap disabled={props.disabled}>{timeArray[0] === "Closed" ? "Sorry we are closed, orders open 7:00–20:30, delivery starts at 10:00."
                    : `Earliest delivery time is ${timeArray[0]} ±5 min.`}</Asap>
            </div>
        </div>
    );
}

export default DeliveryTime;
