import { useState } from 'react';
import './YesNo.css';

function YesNo(){
    const [YesNoAnswer,setYesNo] = useState(null);

    const fetchYesNo = async () => {
        try{
            const response = await fetch("https://yesno.wtf/api");
            const data = await response.json();
            setYesNo(data);
        }
        catch(error){
            console.error(error);
            setYesNo(error);
        }
    };
    return(
        <div className='yes-no-container'>
            <h1 className='yes-no-title'>Yes No Stuff</h1>
            <p className='yes-no-subtitle'>Ask Away</p>
            <div className='yes-no-input-section'>
                <button className='yes-no-button' onClick={fetchYesNo}>Yes/No
                </button>
            </div>
            {YesNoAnswer && (
                <div className='yes-no-image-container'>
                    <h2 className='yes-no-answer'>{YesNoAnswer.answer}</h2>
                    <p className='yes-no-answer'>{YesNoAnswer.forced}</p>
                    <img src={YesNoAnswer.image} alt="Random Image" className='dog-image'/>
                </div>
            )}
            <div className='yes-no-footer'>
                <p>Powered by indecision</p>
            </div>
        </div>
    );
}
export default YesNo;