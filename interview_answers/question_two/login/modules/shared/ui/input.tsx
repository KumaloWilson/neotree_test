"use client";

import React from 'react';
import { cn } from '../utils/class-names-util';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, rightIcon, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        className={cn(
                            " text-black w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors",
                            "focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]",
                            icon && "pl-10",
                            rightIcon && "pr-10",
                            error && "border-[var(--secondary)] focus:ring-[var(--secondary)] focus:border-[var(--secondary)]",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-[var(--secondary)] text-sm">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
