import { useState,useEffect } from "react"
//import axios from "axios"
import Statistics from "../Statistics"
import BarChart from "../BarChart"

import "./index.css"


const months = [
    {
        id : 1,
        displayText:"Jan",
        month:"1"
    },
    {
        id : 2,
        displayText:"Fib",
        month:"2"
    },
    {
        id : 3,
        displayText:"Mar",
        month:"3"
    },
    {
        id : 4,
        displayText:"Apr",
        month:"4"
    },
    {
        id : 5,
        displayText:"May",
        month:"5"
    },
    {
        id : 6,
        displayText:"Jun",
        month:"6"
    },
    {
        id : 7,
        displayText:"July",
        month:"7"
    },
    {
        id : 8,
        displayText:"Aug",
        month:"8"
    },
    {
        id : 9,
        displayText:"Sep",
        month:"9"
    },
    {
        id : 10,
        displayText:"Oct",
        month:"10"
    },
    {
        id : 11,
        displayText:"Nav",
        month:"11"
    },
    {
        id : 12,
        displayText:"Dec",
        month:"12"
    },
]

const Transactions = ()=>{
    const [data,setData] = useState([])
    const [searchInput,setSearchInput] = useState("")
    const[month,setMonth] = useState(months[2].month)
    const monthValue = isNaN(month) ? "0" : month
    const[page,setPage] = useState(1) 
    const index = parseInt(month)-1
    const monthName = months[index].displayText
    const pageIncrement = () =>setPage(page+1)
    const pageDecrement = ()=>{
        if (page> 1){
            setPage(page-1)
        }
    }
    
    const changeMonth = event =>setMonth(event.target.value)

    const changeSearchInput =(event)=>{
        
        setSearchInput(event.target.value)
    }

    useEffect(()=>{
    const getFetchData = async ()=>{
        const response = await fetch(`https://roxiler-backend-t5wg.onrender.com/transactions?page=${page}&search=${searchInput}`)
        const data = await response.json()
        setData(data)
        setPage(1)
        
    }
    getFetchData()
    },[page,searchInput,month])
   
    const tableFormat=(obj)=>{
    const {id,category,dateOfSale,description,image,price,sold,title} = obj
    
    const isSold = (parseInt(sold) === 0)? "Unsold":"Sold"

    return(
        <tr className="row" key = {id}>
            <td className="item">{id}</td>
            <td className="item">{title}</td>
            <td className="item">{description}</td>
            <td className="item">{price}</td>
            <td className="item">{category}</td>
            <td className="item">{isSold}</td>
            <td className="item">{image}</td>
            <td className="item">{dateOfSale}</td>
        </tr>
    )

    }

    return (
    <div className="transaction-container">
      <div className="heading-container">
       <h1 className="top-heading">Transaaction Dashboard</h1>
      </div>
      <div className="input-container">
      <input type = "search" placeholder = "Search Transaction" value={searchInput} onChange={changeSearchInput}/>
      <div className="flex-row">
        <p className="select-month">Select month</p>
        <div>
      <select className="select-input" value={month} onChange = {changeMonth}>
      {months.map(eachObj=>(
        <option  key = {eachObj.id} value = {eachObj.month}>{eachObj.displayText}</option>
      ))}
      </select>
      </div>
      </div>
      </div>
      <table className="table-container">
      <thead>
       <tr className="row">
        <th className="item ">ID</th>
        <th className="item">Title</th>
        <th className="item">Description</th>
        <th className="item">Price</th>
        <th className="item">category</th>
        <th className="item">Sold</th>
        <th className="item">Image</th>
        <th className="item">Year</th>
       </tr>
       </thead>
       <tbody>
       {data.map(eachObject=>tableFormat(eachObject))}
       </tbody>
      </table>

      <div className="page-row-container">
      <p>Page No: {page}</p>
      <div className="page-row-container">
      <button type = "button" className="btn" onClick = {pageIncrement}>Next </button>
      <button type = "button" className="btn" onClick = {pageDecrement}>Previous</button>
      </div>
      <p>Per Page:10</p>
      </div>
      <Statistics month = {monthValue} monthName = {monthName}/>
      <BarChart month = {monthValue} monthName = {monthName}/>
    </div>)

}
export default Transactions
/*
 <Statistics month = {monthValue} monthName = {months[month].displayText}/>
      <BarChart month = {monthValue} monthName = {months[month].displayText}/>
*/

 /*
      <div className="input-container">
      <input type = "search" placeholder = "Search Transaction" value={searchInput} onChange={changeSearchInput}/>
      <div className="flex-row">
        <p className="select-month">Select month</p>
        <div>
      <select className="select-input" value={month} onChange = {changeMonth}>
      {months.map(eachObj=>(
        <option  key = {eachObj.id} value = {eachObj.month}>{eachObj.displayText}</option>
      ))}
      </select>
      </div>
      </div>
      </div>
      <table className="table-container">
      <thead>
       <tr className="row">
        <th className="item ">ID</th>
        <th className="item">Title</th>
        <th className="item">Description</th>
        <th className="item">Price</th>
        <th className="item">category</th>
        <th className="item">Sold</th>
        <th className="item">Image</th>
        <th className="item">Year</th>
       </tr>
       </thead>
       <tbody>
       {data.map(eachObject=>tableFormat(eachObject))}
       </tbody>
      </table>

      <div className="page-row-container">
      <p>Page No: {page}</p>
      <div className="page-row-container">
      <button type = "button" className="btn" onClick = {pageIncrement}>Next </button>
      <button type = "button" className="btn" onClick = {pageDecrement}>Previous</button>
      </div>
      <p>Per Page:10</p>
      </div>
      */