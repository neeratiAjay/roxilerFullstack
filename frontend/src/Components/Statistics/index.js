
import { useState,useEffect } from "react"
import axios from "axios"

import "./index.css"

const Statistics = props =>{

    const{month,monthName} = props 
   

    const [data,setData] = useState([])
    useEffect(()=>{
        const getData = async()=>{
            const response = await axios.get(`http://localhost:4000/statistics?month=${month}`)
            const {data} = await response
            const {not_sold_items,sold_items,total_sales} = data 
            const notSoldItems = not_sold_items
            const soldItems = sold_items
            const totalItems = total_sales
            setData({notSoldItems,soldItems,totalItems})
        }
        getData()

    },[month])
 const {totalItems,soldItems,notSoldItems} = data 
 const totalSalesString = isNaN(totalItems)?"0":totalItems
 const totalSales = Math.round(totalSalesString).toString()
    return (
        <div className="statistics-container">
            <h1 className="heading">Statistics- {monthName} <span className="span">(Selected month name from dropdown)</span></h1>
         <ul className="content-container">
          <li className="flex-row-container">
            <p className="statistics-text">Total Sales </p>
            <p className="statistics-text">{totalSales}</p>
            </li>
            <li className="flex-row-container">
            <p className="statistics-text">Total sold items </p>
            <p className="statistics-text">{soldItems}</p>
            </li>
            <li className="flex-row-container">
            <p className="statistics-text">Total not sold items </p>
            <p className="statistics-text">{notSoldItems}</p>
            </li>
         </ul>
        </div>
    )

}
export default Statistics