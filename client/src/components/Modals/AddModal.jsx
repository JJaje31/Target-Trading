import React, { useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";

const AddSharesModal = ({id,setUpdated}) => {
  const [shares,setShares] = useState('')
const {userId} = useParams()


  const handleAddShares = async() => {
  const response = await axios.put(`http://localhost:5000/api/updateshares/${id}`,
  {shares},
  {
    headers:{
      'Content-Type':'application/json',
      Authorization: `Bearer ${userId}`
    },
  }

  )
  if(response.status === 200){
    setUpdated(true)
    document.getElementById('add').close()
    setShares('')
  }
  };

  return (
    <dialog id="add" className="modal modal-middle" >
      <div className="modal-box bg-gray-800 text-white">
        <h3 className="font-bold text-center text-lg">Add More Shares</h3>
        <p className="py-4">Enter the number of shares you want to add:</p>
        <div className="py-2 text-black">
          <input
            type="number"
            value={shares}
            min="1"
            step="1"
            onChange={(e) => setShares(e.target.value)}
            placeholder="Number of shares"
            className="input input-bordered w-full"
          />
        </div>
        <div className="modal-action">
          <button
            className="btn text-white bg-green-500 hover:bg-green-600"
            onClick={handleAddShares}
          >
            Add
          </button>
          <button className="btn" onClick={() => document.getElementById('add').close()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddSharesModal;