import { useState,useEffect } from "react"
//import axios from "axios"
import { Bar } from 'react-chartjs-2';
import {Chart,LinearScale,CategoryScale,BarElement} from "chart.js"

import "./index.css"

Chart.register(
  LinearScale,CategoryScale,BarElement
)



const Barchart = props =>{

    const {month,monthName} = props 

    const [data,setData] = useState([])

    const values = Object.values(data)
    
    
    const barData = {
        labels: [
          "0-100", "101-200", "201-300", "301-400", "401-500", 
          "501-600", "601-700", "701-800", "801-900", "901+"
        ],
        datasets: [
          {
            label: 'Frequency',
            data: values,
            backgroundColor: 'skyblue',
          },
        ],
      };

      
    
    useEffect(()=>{
    const getApiData = async()=>{
        const response = await fetch(`https://roxiler-backend-t5wg.onrender.com/barchart/${month}`)
        const responseData = await response.json()
       
        setData(responseData)
       

    }
    getApiData()
    },[month])

    return (
        <div className="barchart-container">
         <h1 className="heading">BAr Cahrt Stats-{monthName}<span className="span">(selected month name from dropdown)</span></h1>
         <Bar data={barData}/>
        </div>
    )


}
export default Barchart