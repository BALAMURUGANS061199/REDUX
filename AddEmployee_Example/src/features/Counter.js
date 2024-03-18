import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset } from './counter/CounterSlice'

const Counter = () => {

    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch();

    const [incrementAmount, setincrementAmount] = useState(0)

    const addvalue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setincrementAmount(0);
        dispatch(reset())
    }

    return (
        <section>
            <p className='count'>{count}</p>
            <div>
                <button className='inc' onClick={() => dispatch(increment())}>+</button>
                <button className='dec'onClick={() => dispatch(decrement())}>-</button>
            </div>
            <div>
                <input type='text' className='inp' value={incrementAmount} onChange={(e) => setincrementAmount(e.target.value)} />
            </div>
            <div>
                <button className='amt'onClick={() => dispatch(incrementByAmount(addvalue))}> Add Amount</button>
                <button className='reset' onClick={resetAll}> Reset</button>
            </div>
        </section>
    )
}

export default Counter
