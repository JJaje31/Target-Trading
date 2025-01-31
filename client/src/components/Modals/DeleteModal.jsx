import React from "react";
import axios from 'axios'
import { useParams } from "react-router";
const backendUrl = import.meta.env.VITE_API_ULR;

const DeleteStockModal = ({id,stocks, setStocks}) => {
const {userId} = useParams()

const closeModal = () => {
  document.getElementById('delete').close()

}
  const handleDelete = async() => {
    try{
   
      const response = await axios.delete(`${backendUrl}/api/stockdelete/${id}`
      ,
      {
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${userId}`,
        },
    }
      )
      if(response.status === 200){
      document.getElementById('delete').close();
      setStocks(stocks.filter( items => items._id !== id))
      }
      
    }catch(err){
console.log(err)
    }

  };
  
  return (
    <dialog id="delete" className="modal modal-middle">
      <div className="modal-box bg-gray-800 text-white">
        <h3 className="font-bold text-center text-lg text-red-600">
          Confirm Deletion
        </h3>
        <p className="py-4">
          Are you sure you want to delete this stock? This action cannot be
          undone.
        </p>
        <div className="modal-action">
          <button
            className="btn text-white bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className="btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteStockModal;