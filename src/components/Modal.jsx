// Importazione degli hook necessari da React
import { useEffect } from 'react'
// Importazione della funzione per creare portali React
import { createPortal } from 'react-dom'

// Componente Modal che accetta props per la sua configurazione
function Modal({
    title,      // Titolo del modal
    content,    // Contenuto del modal
    show,       // Flag per mostrare/nascondere il modal
    onClose,    // Funzione per chiudere il modal
    onConfirm,  // Funzione per confermare l'azione
    confirmText = "Conferma" // Testo del pulsante di conferma (default: "Conferma")
}) {
    // Effect per gestire lo scroll del body quando il modal è aperto
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden' // Disabilita lo scroll quando il modal è aperto
        }
        return () => {
            document.body.style.overflow = 'unset'  // Ripristina lo scroll quando il modal viene chiuso
        }
    }, [show])

    // Se show è false, non renderizza nulla
    if (!show) return null

    // Crea un portale per rendere il modal fuori dalla gerarchia DOM normale
    return createPortal(
        // Overlay del modal con gestione del click
        <div className="modal-overlay" onClick={(e) => {
            e.stopPropagation() // Previene la propagazione del click
        }}>
            <div className="modal-content">
                {/* Header del modal */}
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        × {/* Simbolo X per chiudere */}
                    </button>
                </div>
                {/* Corpo del modal */}
                <div className="modal-body">
                    {content}
                </div>
                {/* Footer del modal con pulsanti */}
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
        document.body // Il modal viene renderizzato direttamente nel body del documento
    )
}

export default Modal