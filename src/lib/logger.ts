import fs from 'fs';
import path from 'path';

export interface ConsentLogEntry {
    consent_id: string;
    timestamp: string;
    ip_address: string;
    user_agent: string;
    preferences: {
        necessary: string;
        analytics: string;
        marketing: string;
    };
    event: "initial_consent" | "update_consent";
}

const LOG_FILE_PATH = path.join(process.cwd(), 'data', 'consent_logs.json');

export async function logConsent(entry: ConsentLogEntry) {
    try {
        // Check if data directory exists, create if not
        const dataDir = path.dirname(LOG_FILE_PATH);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Read existing logs if the file exists
        let logs: ConsentLogEntry[] = [];
        if (fs.existsSync(LOG_FILE_PATH)) {
            const fileData = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
            if (fileData) {
                try {
                    logs = JSON.parse(fileData);
                } catch (e) {
                    // If file is corrupted, we start fresh but we might want to log this error in a real prod app
                    console.error("Corrupted logs file reset.", e);
                }
            }
        }

        // Append new entry
        logs.push(entry);

        // Save back to file
        fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2), 'utf-8');

    } catch (error) {
        console.error("Failed to write consent log:", error);
        // In a production environment with a real DB, you'd want alerting here if logging fails
    }
}
