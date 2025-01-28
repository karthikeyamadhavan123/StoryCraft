const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directories exist
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      let folder = 'uploads/'; // Default folder

      // Check file type and set appropriate folder
      switch (file.fieldname) {
        case 'image':
          folder = 'uploads/user_images/';
          break;
        // case 'audio':
        //   folder = 'uploads/audio_files/';
        //   break;
        default:
          folder = 'uploads/misc/';
      }

      ensureDirectoryExistence(folder);
      cb(null, folder);
    } catch (error) {
      console.error(`Error setting destination: ${error.message}`);
      cb(new Error('Failed to set upload destination'), null);
    }
  },
  filename: (req, file, cb) => {
    try {
      // Create a unique filename with original extension
      cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    } catch (error) {
      console.error(`Error setting filename: ${error}`);
      cb(new Error('Failed to set filename'), null);
    }
  }
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  // Define allowed MIME types
  const allowedImageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const allowedAudioMimeTypes = [
    'audio/mpeg',  // MP3
    'audio/wav',   // WAV
    'audio/x-wav', // Alternative WAV
    'audio/x-m4a', // M4A
    'audio/mp4'    // M4A (sometimes detected as mp4 audio)
  ];

  // Check MIME type and field name
  if (file.fieldname.includes('image') && allowedImageMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept image
  } else if (file.fieldname === 'audio' && allowedAudioMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept audio
  } else {
    cb(new Error('Invalid file type! Only JPEG, PNG, GIF images and MP3, WAV, M4A audio files are allowed.'), false);
  }
};

// Set different file size limits for audio and images
const fileSizeLimit = (req, file) => {
  if (file.fieldname === 'audio') {
    return 20 * 1024 * 1024; // 20MB limit for audio
  }
  return 5 * 1024 * 1024; // 5MB limit for images
};

// Initialize multer with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: fileSizeLimit
  }
});

// Export different upload configurations
module.exports = {
  upload
};
