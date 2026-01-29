import React from 'react';
import { cn } from '../../utils/helpers';
import PropTypes from 'prop-types';

const Card = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("rounded-xl border bg-white text-card-foreground shadow-sm", className)}
            {...props}
        >
            {children}
        </div>
    );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-gray-500", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

Card.propTypes = { className: PropTypes.string, children: PropTypes.node };
CardHeader.propTypes = { className: PropTypes.string };
CardTitle.propTypes = { className: PropTypes.string };
CardDescription.propTypes = { className: PropTypes.string };
CardContent.propTypes = { className: PropTypes.string };
CardFooter.propTypes = { className: PropTypes.string };

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
