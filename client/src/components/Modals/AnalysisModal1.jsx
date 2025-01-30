import React, { useState } from "react";
import axios from "axios";

const AnalysisModal1 = ({id,loading,data,analysisFunction,stock,setDisplayText}) => {

  const modalClose = () => {
    setDisplayText('')
document.getElementById('analysis').close()
  }


  return (
    <dialog  id="analysis" className="modal modal-middle">
      <div className="modal-box bg-gray-800 text-white">
        <h3 className="font-bold text-center text-lg">The Analyst, Powered by AI</h3>

        <div className="py-4">
     
       
            <div className="text-left">
              <p className="mt-2">{data}</p>
            </div>
            {data === '' ? (
  <div className="text-center">
     {loading && <p className="text-green-600">Loading analysis, please wait...</p>}
    <button
      className="text-center btn btn-primary text-white mt-4"
      onClick={analysisFunction}
    >
      Fetch AI Analysis
    </button>
  </div>
) : null}
            
          
          
        </div>

        <div className="modal-action">
          <button className="btn" onClick={modalClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AnalysisModal1;