import { useEffect } from 'react'
import { createPortal } from 'react-dom'


function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = "Conferma"
}) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [show])

    if (!show) return null

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    {content}
                </div>
                <div className="modal-footer">
                    <button
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Annulla
                    </button>
                    <button
                        className="confirm-button"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal