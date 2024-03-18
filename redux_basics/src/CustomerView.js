import React from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { deleteCustomer } from './Slices/CustomerSlice';
import { UseDispatch } from 'react-redux';
const CustomerView = () => {
const customers=useSelector((state)=>state.customers)
const dispatch =useDispatch();
function deletehandler(index){
    dispatch(deleteCustomer(index))
}
  return (    
    <div>
      <h3>Customer List</h3>
      <ul style={{ listStyle: 'none' }}>
        {customers.map((customer, index) => 
          <li>{customer}<button onClick={()=>deletehandler(index)}>Delete</button></li>
        )}
      </ul>
    </div>
  );
};

export default CustomerView;
