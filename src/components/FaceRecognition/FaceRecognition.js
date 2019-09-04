import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imageUrl }) => {
    
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto'></img>
                {
                    boxes.map((box, i) => {
                        const { top, right, bottom, left } = box;
                        return <div className='bounding-box' key={i} style={{top, right, left, bottom}}></div>
                    })
                }
                
            </div>
        </div>
    )
}

export default FaceRecognition;