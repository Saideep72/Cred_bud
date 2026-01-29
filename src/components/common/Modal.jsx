import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, className }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                ref={modalRef}
                className={cn(
                    "relative w-full max-w-lg bg-white rounded-xl shadow-2xl animate-in zoom-in-95 duration-200",
                    className
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Modal;
