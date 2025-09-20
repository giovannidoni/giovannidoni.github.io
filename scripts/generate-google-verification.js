#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function generateGoogleVerification() {
  try {
    // Get Google verification from environment variables
    const googleVerificationContent = process.env.VITE_GOOGLE_VERIFICATION_CONTENT;
    const googleVerificationFilename = process.env.VITE_GOOGLE_VERIFICATION_FILENAME;

    if (!googleVerificationContent || !googleVerificationFilename) {
      console.log('⚠️  Google verification environment variables not set, skipping verification file generation');
      console.log('   Set VITE_GOOGLE_VERIFICATION_CONTENT and VITE_GOOGLE_VERIFICATION_FILENAME to enable');
      return;
    }

    const publicDir = path.join(process.cwd(), 'public');
    const verificationPath = path.join(publicDir, googleVerificationFilename);

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write Google verification file
    fs.writeFileSync(verificationPath, googleVerificationContent);

    console.log(`✅ Google verification file generated: ${googleVerificationFilename}`);

  } catch (error) {
    console.error('Error generating Google verification file:', error);
    // Don't exit with error - this is optional
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateGoogleVerification();
}

export { generateGoogleVerification };