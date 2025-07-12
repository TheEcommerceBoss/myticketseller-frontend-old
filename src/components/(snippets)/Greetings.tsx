import { useState } from "react";

function Greetings() {
    const today = new Date();
    const curHr = today.getHours();
    let greeting;

    if (curHr < 12) {
        greeting = 'Good Morning';
    } else if (curHr < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    return (
        <>
            <h3>{greeting}</h3>
        </>
    );
}

export default Greetings;
