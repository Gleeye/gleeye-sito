import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: { filename: string } | Promise<{ filename: string }> }
) {
    // Support for both Next 14 string params and Next 15+ Promise params
    const resolvedParams = await Promise.resolve(params);
    const filename = resolvedParams.filename;

    const loghiDir = path.join(process.cwd(), 'upload/loghi clienti');
    const filePath = path.join(loghiDir, filename);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(loghiDir) || !fs.existsSync(filePath)) {
        return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    let contentType = 'application/octet-stream';
    if (filename.endsWith('.svg')) contentType = 'image/svg+xml';
    else if (filename.endsWith('.png')) contentType = 'image/png';
    else if (filename.endsWith('.webp')) contentType = 'image/webp';
    else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) contentType = 'image/jpeg';

    return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
