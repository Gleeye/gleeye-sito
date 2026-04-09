import { NextResponse } from 'next/server';
import { logConsent, ConsentLogEntry } from '@/lib/logger';

// Helper to anonymize IP (GDPR best practice for logs)
function anonymizeIp(ip: string): string {
    if (!ip) return 'unknown';
    // Example for IPv4: 192.168.1.100 -> 192.168.1.0
    if (ip.includes('.')) {
        const parts = ip.split('.');
        if (parts.length === 4) {
            parts[3] = '0';
            return parts.join('.');
        }
    }
    // Make sure not to store raw IPv6 either (basic anonymization just returning the first parts)
    if (ip.includes(':')) {
        const parts = ip.split(':');
        if (parts.length > 3) {
            return parts.slice(0, 3).join(':') + '::0';
        }
    }
    return ip;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { consent_id, preferences, event } = body;

        // Basic validation
        if (!consent_id || !preferences || !event) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Extract Headers (IP and User Agent)
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        // Using simple fallback for localhost testing, '127.0.0.1'
        const rawIp = forwardedFor ? forwardedFor.split(',')[0] : (realIp || '127.0.0.1');
        const anonymizedIp = anonymizeIp(rawIp);

        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Construct the log entry
        const logEntry: ConsentLogEntry = {
            consent_id,
            timestamp: new Date().toISOString(),
            ip_address: anonymizedIp,
            user_agent: userAgent,
            preferences,
            event
        };

        // Log the data locally
        await logConsent(logEntry);

        return NextResponse.json({ success: true, message: 'Consent logged successfully' });
    } catch (error) {
        console.error("Error in consent API route:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
