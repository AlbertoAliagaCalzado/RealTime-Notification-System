import React, { useState } from 'react';

export const NotificationSender: React.FC = () => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('Mention');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);

        const payload = {
            recipientId: "11111111-1111-1111-1111-111111111111",
            actorId: "22222222-2222-2222-2222-222222222222",
            type: type,
            message: message
        };

        try {
            const response = await fetch('http://localhost:5294/api/Notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setMessage('');
            } else {
                console.error("Error del servidor:", await response.text());
                alert("Hubo un error al enviar la notificación.");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("No se pudo conectar con la API.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enviar nueva notificación</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de evento</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Mention">Mención</option>
                        <option value="Like">Me Gusta</option>
                        <option value="Follow">Nuevo Seguidor</option>
                        <option value="Comment">Comentario</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ej: Te ha mencionado en un comentario..."
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className={`w-full text-white font-medium py-2 px-4 rounded-md transition-colors ${isSubmitting || !message.trim()
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isSubmitting ? 'Enviando...' : 'Disparar Notificación'}
                </button>
            </form>
        </div>
    );
};