import React, { useState } from 'react';
import { Calendar, Clock8, Search } from 'lucide-react';
import SearchBox from '../../assets/(landing)/searchBox.png';
import SearchBar from '../../assets/(landing)/searchBar.png';
const EventCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(18);

    const renderCalendarDays = () => {
        const days = Array.from({ length: 35 }, (_, i) => i + 1);
        return days.map(day => (
            <div
                key={day}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
          ${day === selectedDate ? 'bg-orange-500 text-white' : ''}
          ${[4, 5, 22, 23, 24].includes(day) ? 'bg-blue-900 text-white' : ''}
          ${[3, 8, 9, 10, 15, 16, 17].includes(day) ? 'bg-blue-600' : ''}
          ${![3, 4, 5, 8, 9, 10, 15, 16, 17, 18, 22, 23, 24].includes(day) ? 'text-gray-300' : ''}
        `}
                onClick={() => setSelectedDate(day)}
            >
                {day <= 31 ? day : ''}
            </div>
        ));
    };

    return (
        <div className="bg-white p-8 font-sans">

            <div className="flex flex-col items-center md:flex-row md:space-x-8">
                <div className="w-full md:w-1/2">
                    <div className="my-10 text-center md:text-start">
                        <h2 className="text-3xl font-bold text-[#1a237e] relative inline-block">
                            HOW IT WORKS
                            <span className="absolute bottom-0 right-0 w-[5rem] h-[.1rem] bg-orange-500 "></span>
                            <span className="absolute bottom-1 right-0 w-[5rem] h-[.1rem] bg-orange-500 "></span>
                        </h2>
                    </div>
                    <ul className="space-y-5 mb-8 gap-5 text-xl">
                        <li className="flex text-gray-600 items-center">
                            <span className="text-orange-500 mr-2">◉</span> Browse: Explore the latest events near you.
                        </li>
                        <li className="flex text-gray-600 items-center">
                            <span className="text-orange-500 mr-2">◉</span> Choose: Select your event and ticket type.
                        </li>
                        <li className="flex text-gray-600 items-center">
                            <span className="text-orange-500 mr-2">◉</span> Purchase: Easy checkout with secure payment options.
                        </li>
                        <li className="flex text-gray-600 items-center">
                            <span className="text-orange-500 mr-2">◉</span> Enjoy: Show up and have the time of your life!
                        </li>
                    </ul>
                </div>
                <div className="w-full flex my-5 md:my-0 flex-col items-center md:w-1/2">
                    <img src={SearchBar} className='w-[100%]' />
                    <img src={SearchBox} className='w-[100%]' />

                </div>
            </div>
            <div className="flex flex-col md:flex-row ">


                <div className="flex flex-col items-center w-full md:w-1/2">
                    <div className="my-10 text-center md:text-start">
                        <h2 className="text-2xl font-bold px-5 text-[#1a237e] relative inline-block">
                            FOLLOW UP WITH OUR SPECIAL TICKETSELLER CALENDAR
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex shadow-xl  p-5 rounded-2xl items-center">
                            <Calendar className="mr-5 text-[#040171] w-[5rem]" />
                            <p className='text-black'>Follow the event by selecting the appropriate date using the calendar feature.</p>
                        </div>
                        <div className="flex shadow-xl p-5 rounded-2xl items-center">
                            <Clock8 className="mr-5 text-[#040171] w-[5rem]" />

                            <p className='text-black'>We will remind you when the event will be held 7 days before the day.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCalendar;