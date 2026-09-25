const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const sharp = require('sharp');

// 1. Parse .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = val;
    }
  });
}

const bucketName = process.env.AWS_BUCKET_NAME || 'mira-cards';
const region = process.env.AWS_REGION || 'eu-north-1';

console.log('AWS config loaded:');
console.log('Region:', region);
console.log('Bucket:', bucketName);
console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? '***' + process.env.AWS_ACCESS_KEY_ID.slice(-4) : 'Not found');

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('AWS Credentials not found in .env.local!');
  process.exit(1);
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const collectionsDir = path.join(__dirname, '../public/collections');

// Helper to get all files recursively
function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, files);
    } else {
      files.push(filePath);
    }
  }
  return files;
}

async function uploadFile(filePath, index, total) {
  const relativePath = path.relative(path.join(collectionsDir, '..'), filePath); // e.g. "collections/new-wedding/1.jpg"
  const ext = path.extname(filePath).toLowerCase();
  
  let key = relativePath;
  let body;
  let contentType = 'application/octet-stream';
  
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    // Convert to webp and resize to a maximum of 1000px on the longest side
    const newKey = relativePath.slice(0, -ext.length) + '.webp';
    try {
      body = await sharp(filePath)
        .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
      key = newKey;
      contentType = 'image/webp';
    } catch (err) {
      console.error(`[${index + 1}/${total}] Failed to convert ${relativePath}:`, err.message);
      return;
    }
  } else if (ext === '.mp4') {
    // Skip video upload as they are already uploaded and don't need resizing
    console.log(`[${index + 1}/${total}] Skipping already uploaded video ${relativePath}`);
    return;
  } else {
    body = fs.readFileSync(filePath);
    if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';
  }

  console.log(`[${index + 1}/${total}] Uploading ${key} (${contentType}, size: ${body.length} bytes)...`);

  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType
      // We omit ACL: 'public-read' as ACLs are not supported by default on this S3 bucket
    }));
    console.log(`[${index + 1}/${total}] Successfully uploaded ${key}`);
  } catch (err) {
    console.error(`[${index + 1}/${total}] Failed to upload ${key}:`, err.message);
  }
}

// Simple concurrency helper
async function pool(concurrency, items, fn) {
  let i = 0;
  const promises = [];
  
  async function worker() {
    while (i < items.length) {
      const index = i++;
      await fn(items[index], index, items.length);
    }
  }
  
  for (let w = 0; w < Math.min(concurrency, items.length); w++) {
    promises.push(worker());
  }
  
  await Promise.all(promises);
}

async function run() {
  if (!fs.existsSync(collectionsDir)) {
    console.error(`Source directory ${collectionsDir} does not exist.`);
    process.exit(1);
  }

  const files = getFiles(collectionsDir);
  console.log(`Found ${files.length} files in public/collections. Starting parallel processing (concurrency = 10)...`);

  const startTime = Date.now();
  await pool(10, files, uploadFile);
  const endTime = Date.now();

  console.log(`All files processed and uploaded in ${((endTime - startTime) / 1000).toFixed(2)}s!`);
}

run().catch(err => {
  console.error('Migration failed:', err);
});
