import Axios  from 'axios'
import React, { useEffect, useState } from 'react'

export default function Table() {

  
    const [dataTable, setDataTable]  = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    
  async  function gitApiData()
    {
     let {data} =   await Axios.get('https://jsonplaceholder.typicode.com/users')
     setDataTable(data)
    }
   
    useEffect(() => {
        gitApiData();
      }, []);
    
      const handleCheckboxChange = (itemId) => {
        if (selectedRows.includes(itemId)) {
          setSelectedRows(selectedRows.filter((item) => item !== itemId));
        } else {
          setSelectedRows([...selectedRows, itemId]);
        }
      };
    
      const handleDeleteButtonClick = () => {
        setDataTable(dataTable.filter((item) => !selectedRows.includes(item.id)));
        setSelectedRows([]);
      };
    
      const filterData = dataTable.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className='container mt-5'>
     <div className="container text-center mt-4">
  <div className="row">
   
    <div className="col-md-4"><input onChange={
        (e)=>(setSearchQuery(e.target.value))
            }  type="text" className='form-control border border-secondary mb-2'placeholder="Search by Name"  /></div>
    <div className="col-md-4 ms-auto">  {selectedRows.length > 0 ? 
        <> <span>{selectedRows.length }</span> <span>Selected</span>
                <button className='btn btn-outline-danger ms-1' onClick={handleDeleteButtonClick}> <i className="fa-solid fa-trash-can"></i></button>
        </> :''
      }
    </div>
  </div>
  </div>
         <table  className='container table table-borderless '>
        <thead className='thead-dark'>
            <tr>
            <th><input className="form-check-input border-2" type="checkbox"  value="" id="flexCheckDefault"/></th>
            <th scope="col">#</th>
                <th>NAME</th>
                <th>CATCHPHRASE</th>
                <th>WEBSITE</th>
                <th>RATE</th>
                <th>BALANCE</th>
                <th>DEPOSIT</th>
              
            </tr>
        </thead>
        <tbody>
            {
                filterData.map((item ,i) =>(
                    <tr key={i}> 
                    <th><input   value=""  onChange={() => handleCheckboxChange(item.id)}
                  checked={selectedRows.includes(item.id)} className="form-check-input border-2" type="checkbox" /></th>
                    <th scope="row">{i+1}</th>
                    <td>{item.name}
                    <br />
                  <p className=' opacity-50'> {item.address.zipcode}</p></td>
                    <td>{item.company.catchPhrase}</td>
                    <td>{item.website} </td>
                    {
                        item.address.geo.lng >= 0 ?   <td><p className=' text-success'>{item.address.geo.lng}<br /> <p className=' text-dark'>CAD</p> </p>
                        </td> :
                        <td><p className=' text-danger'>{item.address.geo.lng}<br /> <p className=' text-dark'>CAD</p></p></td>
                    }
                  {
                        item.address.geo.lat >= 0 ?   <td><p className=' text-success'>{item.address.geo.lat}<br /><p className='text-dark'>CAD</p></p></td> :
                        <td><p className=' text-danger'>{item.address.geo.lat} <br/> <p className=' text-dark'>CAD</p></p></td>
                    }
                    <td>$500.00<br/> <p className=' text-dark'>CAD</p></td>
                 
                </tr>
                ))
            }
          
        </tbody>
    </table>
    
    
    
    
  
    
    </div>
  )
}
