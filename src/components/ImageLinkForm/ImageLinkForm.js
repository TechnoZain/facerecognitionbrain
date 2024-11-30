import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div className='image'>
            <p className='f3 white'>
                {'This Magic Brain will detect faces in your picutres. Give it a try.'}
            </p>
            <div>
                <div className='form pa4 br3 shadow-5 center'>
                    <input className='f4 pa2 w-70' type='text' onChange={onInputChange} />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;