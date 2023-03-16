import { useState } from 'react'


export default function Counter(props){
    console.log(props)
    const [count, setCount] = useState(props.initialCount  || 0)

    function incerment(incrementor){
        setCount(count+incrementor)
        
    }
    
    return (
        <div>
            <h2>{props.title || 'Counter'}</h2>
            Count: { count }
            <div>
                <button onClick={() => incerment(1)}>Incerment</button>
                {
                    (count > 0) ?
                    <button onClick={() =>incerment(-1)}>Decerment</button>
                    :
                    <></>
                }
                 
                <button onClick={() =>incerment(5)}>Add 5</button> 
            </div>
        </div>
    ) 
}