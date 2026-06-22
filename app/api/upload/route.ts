import { NextResponse } from 'next/server';
import { zgStorage } from '@/lib/0g/storage';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import os from 'os';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert Web File to Node Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a temporary file path
    const tempDir = os.tmpdir();
    const tempFilePath = join(tempDir, `upload-${Date.now()}-${file.name}`);

    // Write file locally so 0G SDK can read it
    await writeFile(tempFilePath, buffer);

    try {
      // Execute 0G upload
      const result = await zgStorage.uploadFile(tempFilePath);
      
      // Cleanup temporary file
      await unlink(tempFilePath).catch(console.error);

      return NextResponse.json({
        success: true,
        rootHash: result.rootHash,
        txHash: result.txHash,
        timestamp: result.timestamp,
        sizeBytes: file.size,
        name: file.name
      });
    } catch (uploadError: any) {
      // Ensure cleanup even on error
      await unlink(tempFilePath).catch(console.error);
      throw uploadError;
    }

  } catch (error: any) {
    console.error("[Upload API Error]", error);
    return NextResponse.json(
      { error: error.message || 'Internal server error during upload' },
      { status: 500 }
    );
  }
}
