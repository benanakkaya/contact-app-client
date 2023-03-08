import React, { useEffect, useState } from 'react'

const ImagePreview = ({ image }) => {

    const [preview, setPreview] = useState(null);


    const readImage = () => {

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            setPreview(reader.result)
        }
    }

    useEffect(() => {
        readImage();
    }, [image])

    return (
        <div>
            <img src={preview} alt="preview" className='w-20 h-20 rounded-full' />
        </div>
    )
}

export default ImagePreview
