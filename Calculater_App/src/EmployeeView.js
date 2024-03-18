import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { DeleteEmployee as DeleteActionEmployee } from './Slices/EmployeeSlice';
const EmployeeView = () => {
  const dispatch = useDispatch();
    const employee =useSelector((state)=>state.employees)
    function DeleteEmployee(index){
        dispatch(DeleteActionEmployee(index))
    }
  return (
    <div>
      <h3>Employee View</h3>
      <ul style={{listStyle:'none',textAlign: 'center'}}>
        {employee.map((employeeData, index) => 
          <li>{employeeData}<button onClick={()=>DeleteEmployee(index)}>Delete</button></li>
        )}
      </ul>
    </div>
  );
};

export default EmployeeView;
