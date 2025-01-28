const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });





cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Multer storage configuration for user images
const userImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_images',
    resource_type: 'image',
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      if (['jpeg', 'jpg', 'png'].includes(ext)) {
        return ext;
      }
      return 'png';
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const uploadUserImage = multer({
  storage: userImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB file size limit
});


const audioStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'audio_files',
    resource_type: 'auto',  // Cloudinary auto-detects audio
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      if (['mp3', 'mp4', 'm4a'].includes(ext)) {
        return ext;
      }
      return 'mp3';  // Default to 'mp3' if format not recognized
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
  },
});

const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB file size limit
  // fileFilter: (req, file, cb) => {
  //   const validMimeTypes = ['audio/mpeg', 'audio/mp4', 'audio/x-m4a'];
  //   const validExtensions = ['.mp3', '.mp4', '.m4a'];

  //   const ext = path.extname(file.originalname).toLowerCase();
  //   if (validMimeTypes.includes(file.mimetype) && validExtensions.includes(ext)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error('Unsupported audio format. Only mp3, mp4, and m4a are allowed.'));
  //   }
  // }
});

const VideoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'video_files',         // Folder to store videos in Cloudinary
    resource_type: 'video',         // Specify the resource type as 'video'
    format: async (req, file) => 'mp4', // Convert videos to MP4 format for better compatibility
    allowed_formats: ['mov', 'avi', 'mp4', 'mkv'], // Allow common raw video formats
    public_id: (req, file) => {
      // Generate a unique filename using the original name or custom logic
      const timestamp = Date.now();
      const originalName = file.originalname.split('.')[0]; // Remove extension
      return `${originalName}_${timestamp}`;
    },
  },
})

const uploadVideo=multer({
  storage:VideoStorage,
  limits: { fileSize: 200 * 1024 * 1024 }
})

module.exports = {
  uploadUserImage,
  uploadAudio,
  uploadVideo
};
