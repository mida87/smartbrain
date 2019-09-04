import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic site will detect faces in your pictures'}
            </p>
            <div className='pa4 br3 ma3 w-75 center shadow-5 bg-weave'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}></input>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' onClick={onPictureSubmit}>Detect</button>
            </div>

        </div>
    )
}

export default ImageLinkForm;