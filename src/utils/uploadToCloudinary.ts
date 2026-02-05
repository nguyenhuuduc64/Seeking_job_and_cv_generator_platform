const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'luan_van');
    formData.append('cloud_name', 'dnecovspp');

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dnecovspp/image/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Upload thất bại:', error);
        return null;
    }
};

export default uploadImageToCloudinary;
