import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Oops! We've Lost This Page
            </h1>
            <p className="text-xl text-gray-600 mb-2">
                Just like our furry friends sometimes get lost, this page seems to have wandered off!
            </p>
            <p className="text-lg text-gray-500 mb-8">
                Don't worry though - there are plenty of adorable pets waiting to meet you on our other pages.
            </p>
            <img
                src="/not_found.png"
                alt="Lost Pet Illustration"
                className="max-w-md w-full mb-8"
            />
            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                    to="/" 
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Return to Homepage
                </Link>
                <Link 
                    to="/pets" 
                    className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
                >
                    Meet Our Pets
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
