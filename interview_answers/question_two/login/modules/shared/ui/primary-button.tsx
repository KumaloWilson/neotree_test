"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/class-names-util';


const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                primary: "bg-green-600 text-white hover:bg-green-600 focus:ring-green-600]",
                secondary: "bg-[var(--secondary)] text-white hover:bg-[#b00010] focus:ring-[var(--secondary)]",
                outline: "border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/10",
                ghost: "text-[var(--primary)] hover:bg-[var(--primary)]/10",
            },
            size: {
                sm: "h-9 px-3 py-2",
                md: "h-10 px-4 py-2",
                lg: "h-12 px-6 py-3",
                icon: "h-10 w-10",
            },
            fullWidth: {
                true: "w-full",
                false: "",
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            fullWidth: false,
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
