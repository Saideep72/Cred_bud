import React from 'react';
import { cn } from '../../utils/helpers';
import PropTypes from 'prop-types';

const Select = React.forwardRef(({ className, label, error, options, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <select
                className={cn(
                    "flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-danger focus-visible:ring-danger",
                    className
                )}
                ref={ref}
                {...props}
            >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <span className="text-sm text-danger mt-1">{error}</span>
            )}
        </div>
    );
});

Select.displayName = "Select";

Select.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Select;
