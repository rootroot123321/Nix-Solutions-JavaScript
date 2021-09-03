import * as React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    outline?: boolean;
    children?: React.ReactNode;
}

const Button = ({onClick, type, className, outline, children}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type ?? undefined}
            className={classNames('button', className, {
                'button--outline': outline,
            })}>
            {children}
        </button>
    );
};

export default Button;
