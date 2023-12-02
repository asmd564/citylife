import {useState} from 'react';

export const Test = () => {
    const [value, setValue] = useState([]);
    

    const handleClick = () => {
        setValue([...value, 1])
        
       
    }
    console.log(value);


    return (
        <>
        <ul>
            {value.map(item => (
                <li>hello</li>
            ))}
        </ul>
        <button onClick={handleClick}>click</button>
        </>

    )
}