import { useState } from "react";

function Greetings() {
    var today = new Date()
    var curHr = today.getHours()

    switch (curHr) {
        case (curHr < 12):
            var greeting = ('Good Morning')
            break;
        case (curHr < 18):
            var greeting = ('Good Afternoon')
            break;
        default:
            var greeting = ('Good Evening')
            break;
    }
    return (
        <>
            <h3>{greeting}</h3>
        </>
    )
}

export default Greetings