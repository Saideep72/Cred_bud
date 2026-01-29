import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ fullScreen = false, text = "Loading..." }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-gray-600 font-medium animate-pulse">{text}</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
