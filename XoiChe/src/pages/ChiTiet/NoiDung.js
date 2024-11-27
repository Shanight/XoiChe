import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hinh1 from '../../img/IMG_2753.jpeg';
import hinh2 from '../../img/gai-7.jpg';

const NoiDung = () => {
    const [images, setImages] = useState(
        [
            {
                "url": hinh1,
                "alt": "Image 1",
                "title": "Beautiful Image 1"
            },
            {
                "url": hinh2,
                "alt": "Image 2",
                "title": "Amazing Image 2"
            }

        ]
    );

    useEffect(() => {
        fetch('../../../../src/img')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const toggleFullscreen = (image) => {
        setIsFullscreen(!isFullscreen);
        setCurrentImage(image);
    };

    const [fullscreenImage, setFullscreenImage] = useState(null);

    const openFullscreen = (image) => {
        setFullscreenImage(image);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <Slider {...settings} className="slider-container">
                            {images.map((image, index) => (
                                <div key={index} className="image-container">
                                    <img
                                        src={image.url}
                                        alt={image.alt}
                                        className={`anhhien ${isFullscreen && currentImage === image ? 'fullscreen' : ''}`}
                                        onClick={() => openFullscreen(image)}
                                    />
                                </div>
                            ))}
                        </Slider>

                    </div>
                    <div className='col-6'>
                            <h3>Trọn bộ mâm cúng sẽ có:</h3>
                            <hr></hr>
                            <li className='ListStyle'>hă</li>
                            <li className='ListStyle'>ewrwe</li>
                            <li className='ListStyle'>12312qwe</li>
                    </div>
                </div>
            </div>



            {/* Phóng to ảnh */}
            {fullscreenImage && (
                <div className="fullscreen-overlay" onClick={closeFullscreen}>
                    <img src={fullscreenImage.url} alt={fullscreenImage.alt} className="fullscreen-image" />
                </div>
            )}
        </div>
    );
};

export default NoiDung;