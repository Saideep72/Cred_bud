import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';
import PropTypes from 'prop-types';

const Loader = ({ className, size = "default" }) => {
    return (
        <div className="flex justify-center items-center p-4">
            <Loader2
                className={cn(
                    "animate-spin text-primary",
                    size === "sm" ? "w-4 h-4" :
                        size === "lg" ? "w-12 h-12" : "w-8 h-8",
                    className
                )}
            />
        </div>
    );
};

Loader.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'sm', 'lg'])
};

export default Loader;
