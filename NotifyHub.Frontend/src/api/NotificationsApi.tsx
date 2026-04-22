export interface CreateNotificationPayload {
    recipientId: string;
    actorId: string;
    type: string;
    message: string;
}

const API_BASE_URL = 'http://localhost:5294/api/Notification';

export const NotificationApi = {
    create: async (payload: CreateNotificationPayload): Promise<void> => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en el servidor: ${response.status} - ${errorText}`);
        }
    }
};