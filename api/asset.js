import { readFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const platform = req.headers['platform'];
  const fileName = req.query.file;

  if (!platform || !['pc', 'android'].includes(platform)) {
    return res.status(400).send('Missing or invalid platform header');
  }

  if (!fileName) {
    return res.status(400).send('Missing file name');
  }

  try {
    const filePath = path.join(process.cwd(), 'public', platform, fileName);
    const fileBuffer = await readFile(filePath);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(fileBuffer);
  } catch (err) {
    res.status(404).send('File not found');
  }
}
