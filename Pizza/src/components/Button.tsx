import * as React from 'react';
import classNames from 'classnames';

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    outline?: boolean;
    children?: React.ReactNode;
}

const Button = ({onClick, className, outline, children}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={classNames('button', className, {
                'button--outline': outline,
            })}>
            {children}
        </button>
    );
};

export default Button;
