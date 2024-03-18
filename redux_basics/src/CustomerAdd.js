import React from 'react'
import { useState } from 'react';
import CustomerView from './CustomerView';
import { addCustomer as addCustomerAction } from './Slices/CustomerSlice';
import { UseDispatch, useDispatch } from 'react-redux';
const CustomerAdd = () => {
    const [input, setinput] = useState('')
    // const [customers, setcustomers] = useState([])
const dispatch = useDispatch();
    function addCustomer() {
        if (input) {
            // setcustomers((previousState) => [...previousState, input])
            dispatch(addCustomerAction(input))
            setinput('')
            // console.log(customers)
        }
    }

    return (
<>        <div>
            <h3>Add new Customer </h3>
            <input type='text' value={input}onChange={(e) => setinput(e.target.value)} />
            <button onClick={addCustomer}>Add</button>
        </div>
        {/* <CustomerView customers={customers}/> */}
        </>

    )
}

export default CustomerAdd
