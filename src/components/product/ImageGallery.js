import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageGallery = props => {
    const validImages = props.images.filter(
        image => image.rel.toLowerCase().indexOf('standard') >= 0
    );
    const [selectedImageRel, setSelectedImageRel] = useState(
        validImages[0].rel
    );

    const onCarouselSelectorItemMouseOver = imageRel => {
        setSelectedImageRel(imageRel);
    };

    return (
        <div>
            <ImageCarousel>
                <img
                    src={
                        validImages.filter(
                            img => img.rel === selectedImageRel
                        )[0].href
                    }
                />
            </ImageCarousel>
            <ImageCarouselSelector>
                {validImages.map(image => {
                    return (
                        <ImageCarouselSelectorItem
                            key={image.rel}
                            className={
                                selectedImageRel === image.rel ? 'selected' : ''
                            }
                            onMouseOver={() =>
                                onCarouselSelectorItemMouseOver(image.rel)
                            }
                        >
                            <img src={image.href} />
                        </ImageCarouselSelectorItem>
                    );
                })}
            </ImageCarouselSelector>
        </div>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.array
};

export default ImageGallery;

// Styles
const ImageCarousel = styled.div`
    width: 100%;
    height: 550px;
    padding: 20px;
    min-width: 500px;
    box-sizing: border-box;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const ImageCarouselSelector = styled(props => {
    return (
        <div {...props}>
            <div className="image-carousel-selector-inner">
                {props.children}
            </div>
        </div>
    );
})`
    text-align: center;

    .image-carousel-selector-inner {
        display: inline-block;

        :after {
            content: '';
            display: block;
            clear: both;
        }
    }
`;

const ImageCarouselSelectorItem = styled.div`
    float: left;
    width: 75px;
    height: 75px;
    padding: 10px;
    margin: 3px;
    border: 1px solid #e0e0e0;

    &.selected {
        margin: 2px;
        border: 2px solid #0046be;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;
