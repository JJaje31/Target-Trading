import React from 'react';
import {useState,useEffect} from 'react'
import { useParams } from 'react-router';
import AnalysisModal from '../Modals/AnalysisModal2'
import AddModal from '../Modals/AddModal'
import DeleteModal from '../Modals/DeleteModal'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_API_ULR;

const StockList = ({setLoggedIn}) => {
  const {userId} = useParams()
  const [message,setMessage] = useState('')
  const [updated, setUpdated] = useState(false)
  const [stocks,setStocks] = useState([])
  const [id,setId] = useState('')

    useEffect(() => {
        setLoggedIn(true)


    const userStocks = async() =>{
      try{
          const response = await axios.post(`${backendUrl}/api/userstocks`,
          {userId},
          {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userId}`,
            },
        }
        )
        setStocks(response.data.stocks)
         
        
      }catch(err){
          console.log(err)
          if(err.response.status === 401){
            setMessage('Session expired please log back in!!')
            setTimeout(() => {
              setMessage('')
               document.location.href = '/SignIn'
            },5000)
          }

      }
  
  }
    userStocks()
    setUpdated(false)
   
    },[updated])




const analysis = (e) => {
  setId(e.target.dataset.id)
  document.getElementById("analysis").showModal();
}

const add = (e) => {
  setId(e.target.dataset.id)
  document.getElementById("add").showModal();
}

const deleteStock = (e) => {
  setId(e.target.dataset.id)
document.getElementById("delete").showModal();
}


    

      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-10/12 space-y-6">
            <div className="border-b-2 pb-4">
              <h1 className="text-center font-semibold text-2xl">Current Stocks</h1>
              <p className='text-center text-red-600'>{message}</p>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4 mb-4 font-semibold text-gray-700">
                <div className="text-left">Stock</div>
                <div className="text-left">Shares</div>
              </div>
              { stocks.map((items) => (
                <div
                  key={items._id}
                  className="grid grid-cols-2 gap-4 items-center py-2 border-b"
                >
                  <div className='flex justify-start items-center'>
                    <span className=' w-16'>{items.stock}</span>
                    <div>
                    <button
                    onClick={analysis}
                     data-id={items._id}
                      className="px-2 ml-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Analysis
                    </button>
                    </div>
                    </div>
                    
                  <div className="flex items-center">
                    <span className="mr-4">{items.shares}</span>
                    <button
                    onClick={add}
                      data-id={items._id}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Add
                    </button>
                   
                    <button
                    onClick={deleteStock}
                      data-id={items._id}
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <AnalysisModal stocks={stocks} id={id}/>
            <AddModal setUpdated={setUpdated} id={id}/>
            <DeleteModal stocks={stocks} setStocks={setStocks} id={id}/>


          </div>
        </div>
      );
 
}

export default StockList;