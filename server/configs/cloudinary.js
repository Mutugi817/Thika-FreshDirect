import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
      try {
            cloudinary.config({
                  cloud_name: CLOUDINARY_CLOUD_NAME,
                  api_key: CLOUDINARY_API_KEY,
                  api_secret: CLOUDINARY_API_SECRET,
            })
      } catch(error) {
            console.log(error);
      }
}

export default connectCloudinary;