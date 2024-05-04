import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const ImageUploader: React.FC = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [backgroundRemovedImage, setBackgroundRemovedImage] = useState<string | null>(null);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image_file', file);
      try {
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
          headers: {
            'X-Api-Key': API_KEY,
            'Content-Type': 'image/jpeg', 
          },
          responseType: 'blob'
        });

        const imageURL = URL.createObjectURL(response.data);
        setBackgroundRemovedImage(imageURL);
        console.log('Background Removed:', response.data.type);

      } catch (error) {
        console.error('Error removing background:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {backgroundRemovedImage && <img src={backgroundRemovedImage} alt="BG Removed Image" />}
    </div>
  );
};

export default ImageUploader;