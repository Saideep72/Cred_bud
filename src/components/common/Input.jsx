import React from 'react';
import { cn } from '../../utils/helpers';
import PropTypes from 'prop-types';

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-danger focus-visible:ring-danger",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <span className="text-sm text-danger mt-1">{error}</span>
            )}
        </div>
    );
});

Input.displayName = "Input";

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
};

export default Input;
