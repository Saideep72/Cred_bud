import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-blue-700 shadow-sm",
                destructive: "bg-danger text-white hover:bg-red-600 shadow-sm",
                outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700",
                secondary: "bg-secondary text-white hover:bg-emerald-600 shadow-sm",
                ghost: "hover:bg-gray-100 hover:text-gray-900",
                link: "underline-offset-4 hover:underline text-primary",
            },
            size: {
                default: "h-12 py-3 px-6",
                sm: "h-9 px-3 rounded-md",
                lg: "h-14 px-8 rounded-md text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";

Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
    size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
    isLoading: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool,
};

export { Button, buttonVariants };
