**MERN Stack Coding Challenge **

Backend Task 

Data Source 
THIRD PARTY API URL : https://s3.amazonaws.com/roxiler.com/product_transaction.json REQUEST METHOD : GET 
RESPONSE FORMAT : JSON 


GET 
Create API to initialize the database. fetch the JSON from the third party API and initialize the database with seed data. You are free to define your own efficient table / collection structure 
Instruction 
All the APIs below should take month ( expected value is any month between January to December) as an input and should be matched against the field dateOfSale regardless of the year. 
GET 
Create an API to list the all transactions 
- API should support search and pagination on product transactions - Based on the value of search parameters, it should match search text on product title/description/price and based on matching result it should return the product transactions 
- If search parameter is empty then based on applied pagination it should return all the records of that page number 
- Default pagination values will be like page = 1, per page = 10 
GET 
Create an API for statistics 
- Total sale amount of selected month 
- Total number of sold items of selected month 
- Total number of not sold items of selected month
GET 
Create an API for bar chart ( the response should contain price range and the number of items in that range for the selected month regardless of the year ) - 0 - 100 
- 101 - 200 
- 201-300 
- 301-400 
- 401-500 
- 501 - 600 
- 601-700 
- 701-800 
- 801-900 
- 901-above 
GET 
Create an API for pie chart Find unique categories and number of items from that category for the selected month regardless of the year. 
For example : 
- X category : 20 (items) 
- Y category : 5 (items) 
- Z category : 3 (items) 
GET 
Create an API which fetches the data from all the 3 APIs mentioned above, combines the response and sends a final response of the combined JSON


Frontend Task 

By using above created apis, create the following table and charts on single page. Follow the given mockups and you can implement your own design to change the look and feel 
Transctions Table 

- Here use your transactions listing api to list transactions in the table - Select month dropdown should display Jan to Dec months as an options - By default March month should be selected 
- Table should list the transactions of the selected month irrespective of the year using API 
- Search transaction box should take an input and if search text is matching with anyone of these title/description/price then those transactions of the selected month should come in the list using API 
- If user clear’s the search box then initial list of transactions should be displayed for the selected month using API 
- On click of Next it should load the next page data from API - On click of Previous it should load the previous page data from API
Transctions Statistics (Use your created API to fetch the data) 
- Here display total amount of sale, total sold items, and total not sold item in the box for the selected month from the drop down (present above table) using API 
Transactions Bar Char (Use your created API to fetch the data) 
- Chart should display the price range and the number of items in that range for the selected month irrespective of the year using API 
- Month selected from dropdown (above the table) should be applied here


I am created products.bd sqlite3 database file  and in index.js  file i am get jason data from given api url 
I created table in products.bd database and and insert into table fetched the given url.
in db.js file connected to products.db database to sqlite 3 and export this db module 

index.js file is the main file installed express js and import express js in index.js file and imported db from db.js file 
and listen requests on port 4000 and I am writed above apis using sqlite3 to send response data 


Project Structure
Backend: Node.js with Express and MongoDB
Frontend: React with Axios for API calls and Chart.js for data visualization
Backend Task
Data Source
Third Party API URL: Product Transactions JSON
Request Method: GET
Response Format: JSON
API Endpoints
Initialize Database

Description: Fetches JSON data from the third-party API and populates the MongoDB database with seed data.
Method: GET /api/initialize
Database Structure: Custom MongoDB collections and fields for efficient data handling.
Transaction Listing API

Description: Lists all transactions with optional search and pagination.
Method: GET /api/transactions
Parameters:
month (required): Month filter (e.g., "January" to "December").
search (optional): Text to search in product title, description, or price.
page (optional): Page number, default is 1.
perPage (optional): Records per page, default is 10.
Statistics API

Description: Provides statistics for a selected month.
Method: GET /api/statistics
Parameters:
month (required): Month filter.
Response:
totalSaleAmount: Total sale amount for the month.
totalSoldItems: Total number of items sold in the month.
totalNotSoldItems: Total number of items not sold in the month.
Bar Chart Data API

Description: Returns item count within specified price ranges for a selected month.
Method: GET /api/bar-chart
Parameters:
month (required): Month filter.
Response Format: JSON array of price ranges (e.g., 0-100, 101-200, etc.) and item counts within each range.
Pie Chart Data API

Description: Fetches unique categories and item counts for each category in the selected month.
Method: GET /api/pie-chart
Parameters:
month (required): Month filter.
Response Format: JSON array with category names and item counts.
Combined Data API

Description: Combines data from the above three APIs into a single response.
Method: GET /api/combined-data
Parameters:
month (required): Month filter.
Instructions
All APIs accept the month as a parameter (e.g., January, February) and ignore the year while filtering by dateOfSale.

Frontend Task
Using the created APIs, the frontend displays a single page with the following sections:

Transactions Table

Displays transaction listings based on the selected month.
Features:
Dropdown menu to select the month (default: March).
Search box to filter transactions by title, description, or price.
Pagination buttons (Next, Previous) for paginated transactions.
Transactions Statistics

Shows the total sale amount, total sold items, and total not sold items for the selected month.
Data is fetched using the Statistics API.
Transactions Bar Chart

Visualizes item counts across price ranges for the selected month.
Data is fetched using the Bar Chart Data API.
Transactions Pie Chart

Displays categories and the number of items in each category for the selected month.
Data is fetched using the Pie Chart Data API.
Installation & Setup
Backend:

Install dependencies:
bash
Copy code
cd backend
npm install
Start the backend server:
bash
Copy code
npm run start
Frontend:

Install dependencies:
bash
Copy code
cd frontend
npm install
Start the frontend application:
bash
Copy code
npm start
Usage
Initialize Database: First, use the /api/initialize endpoint to fetch and populate data.
Accessing APIs: Use the above API endpoints to interact with data based on the selected month.
UI Controls:
Dropdown: Select a month to filter results.
Search: Filter transactions by title, description, or price.
Pagination: Navigate through paginated transactions.
Example API Requests
Initialize Database:

http
Copy code
GET /api/initialize
Fetch Transactions with Search and Pagination:

http
Copy code
GET /api/transactions?month=March&search=laptop&page=1&perPage=10
Get Monthly Statistics:

http
Copy code
GET /api/statistics?month=March
Get Bar Chart Data:

http
Copy code
GET /api/bar-chart?month=March
Get Pie Chart Data:

http
Copy code
GET /api/pie-chart?month=March
Dependencies
Backend:
Express
Axios (for third-party API requests)
sqlite3 database
Frontend:
Axios (for API calls)
React Chart.js (for bar and pie chart rendering)
#   r o x i l e r P r o j e c t  
 