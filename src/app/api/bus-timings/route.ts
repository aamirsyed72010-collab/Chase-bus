import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const busTimingsFilePath = path.join(process.cwd(), 'src/data/busTimings.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(busTimingsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading bus timings file:', error);
    return NextResponse.json({ message: 'Error reading bus timings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const updatedData = await req.json();
    await fs.writeFile(busTimingsFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
    return NextResponse.json({ message: 'Bus timings updated successfully', data: updatedData });
  } catch (error) {
    console.error('Error writing bus timings file:', error);
    return NextResponse.json({ message: 'Error updating bus timings' }, { status: 500 });
  }
}

// TODO: For a production environment, consider using a database (e.g., Firebase Firestore)
// instead of directly writing to a JSON file on the filesystem.
// This approach is used here for demonstration purposes given the existing data structure.
