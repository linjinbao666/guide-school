import React from 'react';
import './Dialog.css'; // 引入对话框的自定义CSS样式

const Dialog = ({ content, onClose }) => {
    const renderDialogContent = (content) => {
        if (Array.isArray(content)) {
            return content.map((item, index) => {
                if (typeof item === 'string') {
                    if (item.endsWith('.jpg') || item.endsWith('.png')) {
                        return <img key={index} src={item} alt="Image" />;
                    } else if (item.endsWith('.mp4')) {
                        return (
                            <video key={index} src={item} controls>
                                Your browser does not support the video tag.
                            </video>
                        );
                    }
                }
                return null;
            });
        } else if (typeof content === 'string') {
            return <span>{content}</span>;
        }
        return null;
    };


    return (
        <div className="dialog-container">
            <div className="dialog-content">{renderDialogContent(content)}</div>
            <button className="dialog-close" onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default Dialog;
