import React from "react";
import './Circle.css';

export default function Box(props) {
    return (
        <div className="container">
            <div className={`circle ${props.color}`}></div>
        </div>
    )
}