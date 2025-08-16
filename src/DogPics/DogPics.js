import { useState } from 'react';
import './DogPics.css';

function DogPics(){
    const [dogImage,setDogImage] = useState(null);

    const fetchDogPics = async () => {
        try{
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            setDogImage(data);
        }
        catch(error){
            console.error(error);
            setDogImage(error);
        }
    };
    return(
        <div className='dog-pics-container'>
            <h1 className='dog-pics-title'>🐶 All Dogs Here To Love You 🐶</h1>
            <p className='dog-pics-subtitle'>Any dog can make you happy</p>
            <div className='dog-pics-input-section'>
                <button className='dog-pics-button' onClick={fetchDogPics}>Show me a dog!
</button>
            </div>
            {dogImage && (
                <div className='dog-image-container'>
                    <img src={dogImage.message} alt="Random Dog" className='dog-image'/>
                </div>
            )}
            <div className='dog-pics-footer'>
                <p>Powered by love for dogs</p>
            </div>
        </div>
    );
}
export default DogPics;