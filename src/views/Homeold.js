import { useState } from 'react'
import Counter from '../components/Counter';



export default function Home() {
    const [counters, setCounters] = useState([
        {
            title: 'Pushup Counter',
            initialCount: 10

        },
        {
            title: 'Pullup Counter',
            initialCount: 10
        },
        {
            title: 'Situp Counter',
            initialCount: 60
        }
    ])


    return (
        <div className="App">
            {
                counters.map((counter) => <Counter title={counter.title} initialCount={counter.initialCount} />)
            }
        </div>
    );
}