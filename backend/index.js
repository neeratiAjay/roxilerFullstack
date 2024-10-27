const express = require("express")

const db = require("./db")
const cors = require("cors")

const app = express()


app.use(express.json())
/*
app.use(cors())


const corsOptions = {
  origin: 'http://localhost:3000', // Update this to the correct origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));*/





//GET API  transactions 

app.get("/transactions",(request,response)=>{
   const {page =1, per_page =10,search = ""} = request.query;
   const offSet = (page-1)*per_page
   const quary = `SELECT * FROM product 
   WHERE title LIKE '%${search}%' OR description LIKE '%${search}%' OR price LIKE '%${search}%'
   LIMIT ${per_page}
   OFFSET ${offSet}`; 
   
   db.all(quary,(err,data)=>{
    if(err){
        response.status(500)
        response.send(`Error ${err.message}`)
       
    }else{

        response.send(data)
        
        
    }
   })
   
})

// GET API statistics
app.get("/statistics",(request,response)=>{
    let {month = 5} = request.query
    month = parseInt(month)

    const quary = `SELECT 
   SUM(CASE WHEN sold = 1 THEN price ELSE 0 END) as total_sales,
   COUNT(CASE WHEN sold = 1 THEN 1 END) as sold_items,
   COUNT(CASE WHEN sold = 0 THEN 1 END) as unsold_items
   FROM product 
   WHERE CAST(strftime("%m",dateOfSale) AS INTEGER) = ${month}`

   db.get(quary,(err,data)=>{
    if(err){
        return response.send(`ERROR: ${err.message}`)
    }else{
        response.send({
            total_sales:data.total_sales,
            sold_items:data.sold_items,
            not_sold_items:data.unsold_items
        })
       
    }
   })

   
})
// GET API BAR_CHAT
app.get('/barchart/:month', (request, response) => {
    let {month =5} = request.params
    month = parseInt(month)
  
    // SQL query to calculate the number of items in each price range
    const sql = `
      SELECT 
        COUNT(CASE WHEN price BETWEEN 0 AND 100 THEN 1 END) AS range_0_100,
        COUNT(CASE WHEN price BETWEEN 101 AND 200 THEN 1 END) AS range_101_200,
        COUNT(CASE WHEN price BETWEEN 201 AND 300 THEN 1 END) AS range_201_300,
        COUNT(CASE WHEN price BETWEEN 301 AND 400 THEN 1 END) AS range_301_400,
        COUNT(CASE WHEN price BETWEEN 401 AND 500 THEN 1 END) AS range_401_500,
        COUNT(CASE WHEN price BETWEEN 501 AND 600 THEN 1 END) AS range_501_600,
        COUNT(CASE WHEN price BETWEEN 601 AND 700 THEN 1 END) AS range_601_700,
        COUNT(CASE WHEN price BETWEEN 701 AND 800 THEN 1 END) AS range_701_800,
        COUNT(CASE WHEN price BETWEEN 801 AND 900 THEN 1 END) AS range_801_900,
        COUNT(CASE WHEN price > 900 THEN 1 END) AS range_901_above
      FROM product
      WHERE CAST(strftime("%m",dateOfSale)As INTEGER) = ${month}
    `;
  
    db.get(sql,(err, data) => {
      if (err) {
        return response.send({ error: err.message });
      }
  
      
      response.send({
        range_0_100: data.range_0_100 ,
        range_101_200: data.range_101_200 ,
        range_201_300: data.range_201_300 ,
        range_301_400: data.range_301_400 ,
        range_401_500: data.range_401_500 ,
        range_501_600: data.range_501_600 ,
        range_601_700: data.range_601_700 ,
        range_701_800: data.range_701_800 ,
        range_801_900: data.range_801_900 ,
        range_901_above: data.range_901_above
      });
    });
  });
  
  // GET PIE CHART API 
  app.get("/piechart/:month",(request,response)=>{
    let {month =5} = request.params
     month = parseInt(month)

    const slqQuary =`SELECT  category, COUNT(*) AS number_of_items
    FROM product 
    WHERE CAST(strftime("%m",dateOfSale)AS INTEGER) = ${month} 
    GROUP BY category`

    db.get(slqQuary,(err,data)=>{
        if(err){
            return response.send(`ERROR: ${e.message}`)
        }
        response.send(data)
    })
  })

// GET API COMBINE
app.get("/combine/:month", async(request,response)=>{
    let {month} = request.params
    month = parseInt(month)
   try{
    const statisticsPromise = new Promise((resolve,reject)=>{
        const statisticsSql = `SELECT 
   SUM(CASE WHEN sold = 1 THEN price ELSE 0 END) as total_sales,
   COUNT(CASE WHEN sold = 1 THEN 1 END) as sold_items,
   COUNT(CASE WHEN sold = 0 THEN 1 END) as unsold_items
   FROM product 
   WHERE CAST(strftime("%m",dateOfSale) AS INTEGER) = ${month}`
   db.get(statisticsSql,(err,data)=> err? reject(err):resolve(data))
    })

    const barChatPromise = new Promise((resolve,reject)=>{

        const barChartQuary = `
      SELECT 
        COUNT(CASE WHEN price BETWEEN 0 AND 100 THEN 1 END) AS range_0_100,
        COUNT(CASE WHEN price BETWEEN 101 AND 200 THEN 1 END) AS range_101_200,
        COUNT(CASE WHEN price BETWEEN 201 AND 300 THEN 1 END) AS range_201_300,
        COUNT(CASE WHEN price BETWEEN 301 AND 400 THEN 1 END) AS range_301_400,
        COUNT(CASE WHEN price BETWEEN 401 AND 500 THEN 1 END) AS range_401_500,
        COUNT(CASE WHEN price BETWEEN 501 AND 600 THEN 1 END) AS range_501_600,
        COUNT(CASE WHEN price BETWEEN 601 AND 700 THEN 1 END) AS range_601_700,
        COUNT(CASE WHEN price BETWEEN 701 AND 800 THEN 1 END) AS range_701_800,
        COUNT(CASE WHEN price BETWEEN 801 AND 900 THEN 1 END) AS range_801_900,
        COUNT(CASE WHEN price > 900 THEN 1 END) AS range_901_above
      FROM product
      WHERE CAST(strftime("%m",dateOfSale)As INTEGER) = ${month}
    `;
    db.get(barChartQuary,(err,barChatData)=>err?reject(err):resolve(barChatData))

    })

    const pieChartPromise = new Promise((resolve,reject)=>{
         
        const slqQuary =`SELECT DISTINCT category, COUNT(*) AS number_of_items
    FROM product 
    WHERE CAST(strftime("%m",dateOfSale)AS INTEGER) = ${month} 
    GROUP BY category`

    db.get(slqQuary,(err,pieChartData)=>err? reject(err):resolve(pieChartData))
        
    })

    const [statistics,barChart,pieChart] = await Promise.all([statisticsPromise,barChatPromise,pieChartPromise])
    response.send({statistics,barChart,pieChart})
   }catch(e){
    console.log(`Error: ${e.message}`)
   }
})

  app.listen(4000,()=>{
    console.log("Server Running at http://Localhost:4000")
})