import React from "react";
import { useTheme } from "../../context/ThemeContext";  // Adjust path as necessary

function FeaturedEvents() {
    const { theme } = useTheme(); 

    const cards = [
        {
            title: "Card Title 1",
            description: "This is a description for card 1.",
            image: "https://via.placeholder.com/300",
        },
        {
            title: "Card Title 2",
            description: "This is a description for card 2.",
            image: "https://via.placeholder.com/300",
        },
        {
            title: "Card Title 3",
            description: "This is a description for card 3.",
            image: "https://via.placeholder.com/300",
        },
    ];

    return (
        <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Our Cards {theme}
                    </h2>
                    <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Here's a collection of some amazing cards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className={`p-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedEvents;
