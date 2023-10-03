import React from 'react';
import { IDialogContext } from '../context/DialogContext';

function GlobalDialog({
  isOpen,
  text,
  openDialog,
  closeDialog,
}: IDialogContext) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button onClick={closeDialog} className="close-button">
          Close
        </button>
        {text}
        {/* {children} */}
      </div>
    </div>
  );
}

export default GlobalDialog;
