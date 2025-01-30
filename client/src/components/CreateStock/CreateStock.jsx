import React, { useState,useEffect } from 'react';
import {useParams} from 'react-router'
import axios from 'axios'
import AnalysisModal from '../Modals/AnalysisModal1';


const CreateStock = ({setLoggedIn}) => {
    const [stockName, setStockName] = useState('');
    const [shares,setShares] = useState('')
    const [investmentFeedback, setInvestmentFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState('')
    const[textColor,setTextColor] = useState('')
    const {userId} = useParams()
   
   

    useEffect(() => {
setLoggedIn(true)
    },[])

    const setText = (message) => {
     message === 'Stock saved successfully.'
      ? setTextColor('text-green-600')
      :setTextColor('text-red-600')
    }

    const modalOpen = () => {
      if(stockName === ''){
        setMessage("Please enter a stock you'd like our AI to search!!")
        setText(message)
      } else{
      document.getElementById("analysis").showModal()
      }
    }


    const handleStockNameChange = (e) => {
      setStockName(e.target.value);
    };

    const handleShareChange = (e) => {
      setShares(e.target.value)
    }

    const handleAdd = async (stockName, shares) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/addstock',
          { stock: stockName, shares: shares }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userId}`, 
            },
          }
        );
        setText(response.data.message);
        setMessage(response.data.message);
      } catch (err) {
        console.log(err.response.status)
          if (err.response.status === 401) {
            setMessage('Session expired, please log back in!!');
            setText(message)
            setTimeout(() => {
              setMessage('');
              document.location.href = '/SignIn';
            }, 5000);
          } 
          if(err.response.status === 400){
            setMessage('This stock already exsists in My Stocks!!')
            setText(message)
           
          }
          if(err.response.status === 500){
            setMessage('The number of shares must be input!!');
            setText(message)
          }
      }
      setShares('')
      setStockName('')
    };

    setTimeout(() => {
      setMessage('')
    },5000)
  
  
    const handleInvestmentAnalysis = async () => {
      setLoading(true);
      try {
        let analysisResult;
         analysisResult = await fetchStockAnalysis(stockName);
        setInvestmentFeedback(analysisResult);
        setStockName('')
      } catch (error) {
        setInvestmentFeedback('Unable to fetch investment analysis.');
      } finally {
        setLoading(false);
      }
    };

    const fetchStockAnalysis = async (stock) => {
      try{
      const response = await fetch("http://localhost:5000/api/adviser",
      {
        method:"Post",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${userId}`, 
        },
        body: JSON.stringify({question:stock})
      }
      );
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json();
        return result.text

    }catch(error){
      console.error('Error fetching stock analysis:', error);
    }

}
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white mt-[200px] p-8 rounded-xl shadow-lg w-full sm:w-96 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Stock Investment Analysis</h2>
          
          <div className="space-y-4">
            <div>
              <p className={textColor}>{message}</p>
              <label htmlFor="stockName" className="block text-gray-600 text-sm font-medium">Powered By AI</label>
              <input
              placeholder='Stock Name'
                id="stockName"
                value={stockName}
                onChange={handleStockNameChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-4">
          <div>
              <label htmlFor="shares" className="block text-gray-600 text-sm font-medium">Powered By AI</label>
              <input
    type="number"
    id="shares"
    value={shares}
    onChange={handleShareChange}
    min="1"
    step="1"
    placeholder="Enter number of shares"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
            </div>
          </div>
          <button
            onClick={() => handleAdd(stockName,shares)}
            className="w-full py-3 px-4 bg-gray-800  hover:bg-gray-900 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >Add Stocks</button>
          <button
            onClick={modalOpen}
            className="w-full py-3 px-4 bg-gray-800  hover:bg-gray-900 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >Get Stock Analysis
          </button>
  <AnalysisModal loading={loading} setDisplayText={setInvestmentFeedback} data={investmentFeedback} stock={stockName} analysisFunction={handleInvestmentAnalysis}/>
        </div>
      </div> 
    );
  };
  

export default CreateStock;