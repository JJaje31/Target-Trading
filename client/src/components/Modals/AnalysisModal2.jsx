import {useState} from 'react';
import {useParams} from 'react-router';
import axios from 'axios'
const backendUrl = import.meta.env.VITE_API_ULR;

const AnalysisModal2 = ({id,stocks}) => {
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState('')
   const {userId} = useParams()

    const modalClose = () => {
  document.getElementById('analysis').close()
  setData('')
    }
   
    const myStockAnalysis = async() => {
      try{
        setLoading(true)
        let currentStock = stocks.filter((items) => items._id === id)
        const response = await axios.post(`${backendUrl}/api/user/adviser`,
       currentStock[0],
        {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userId}`
            },
        }
        
        )
        if(response.status === 200){
          setData(response.data.text)
          setLoading(false)
        } else {
          setData(response.message)
          setLoading(false)
        }
      }catch(err){
        console.log(err)
      }
        

    }

  
  
    return (
      <dialog  id="analysis" className="modal modal-middle">
        <div className="modal-box bg-gray-800 text-white">
          <h3 className="font-bold text-center text-lg">The Analyst, Powered by AI</h3>
  
          <div className="py-4">
       
         
              <div className="text-left">
                <p className="mt-2">{data}</p>
              </div>
              
    <div className="text-center">
        {loading&& 
       <p className="text-green-600">Loading analysis, please wait...</p>
        }
         {data === '' ? (
          <div>
      <button
        className="text-center btn btn-primary text-white mt-4"
        onClick={myStockAnalysis}
      >
        Fetch AI Analysis
      </button>
      </div>
         ):( null
      )}
    </div>

              
            
            
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
  
  export default AnalysisModal2