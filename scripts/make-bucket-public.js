const { S3Client, PutPublicAccessBlockCommand, PutBucketPolicyCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');

// Parse .env.local
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

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

async function run() {
  console.log(`Configuring S3 Bucket "${bucketName}" for public read access...`);

  // 1. Disable Block Public Access for Policies
  try {
    console.log("Disabling Block Public Access...");
    await s3Client.send(new PutPublicAccessBlockCommand({
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false
      }
    }));
    console.log("Successfully disabled Block Public Access.");
  } catch (err) {
    console.error("Failed to disable Block Public Access:", err.message);
  }

  // 2. Set Public Read Bucket Policy for /collections prefix
  try {
    console.log("Applying public read bucket policy for collections/*...");
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: `arn:aws:s3:::${bucketName}/collections/*`
        }
      ]
    };

    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(policy)
    }));
    console.log("Successfully applied public read bucket policy!");
  } catch (err) {
    console.error("Failed to apply bucket policy:", err.message);
  }
}

run().catch(err => console.error("Error:", err));
