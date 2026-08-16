import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../feature/auth/hook/useAuth';
import MessageInput from '../../feature/user/chat/components/MessageInput';

const NewChat = () => {
    const { user } = useSelector((s) => s.auth);

    // Helper to get time-of-day greeting
    const getGreeting = () => {
        const hours = new Date().getHours();

        if (hours >= 4 && hours < 12) {
            return 'Good Morning';
        } else if (hours >= 12 && hours < 17) {
            return 'Good Afternoon';
        } else if (hours >= 17 && hours < 22) {
            return 'Good Evening';
        } else {
            return 'Good Night';
        }
    };

    const greeting = getGreeting();
    const userName = user?.username ? user.username.toUpperCase() : 'FRIEND';

    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-6">
            <div className="mb-8 flex font-mono flex-col items-center justify-center text-center">
                {/* Main Header with Gradient & Subtle Shadow */}
                <h1 className="bg-gradient-to-r from-pink-400 via-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent drop-shadow-sm md:text-3xl">
                    {greeting}, {userName}!
                </h1>

                {/* Subtitle with soft contrasting text styling */}

                <p className="mt-3 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
                    How can I help you today? Type a message,
                     or Try Battle Mode.
                </p>
            </div>

            <div className="w-full max-w-2xl">
                <MessageInput />
            </div>
        </div>
    );
};

export default NewChat;