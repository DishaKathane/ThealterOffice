# ThealterOffice

# Step to start the project follow the below steps
* Go inside the Directory ThealterOffice 
* npm i
* pm2 start server.js -then-> pm2 logs server.js  OR nodemon server.js


# steps To Follows for swagger UI
Go Throught the Below  URL in Chrome after start the project 
* http://localhost:5000/TheAlterOffice/


# Create dotenv file and insert the below details in it

MONGO_URI='mongodb://127.0.0.1:27017/thealteroffice'
REDIS_URL='redis://localhost:6379'
GOOGLE_CLIENT_ID='test123s'
JWT_SECRET='test123'
PORT=5000

# project Instruction

Task Details:
1. User Authentication:

<!-- Note :  there I'm getting an error (to create client Id google api wants the domain to get create create the toekn or client Id) while creating the client Id using Google Console api so the I in the task i used the JWT for authentication  -->

Implement user registration and login endpoints to allow users to create accounts and authenticate themselves using Google Sign-In only, enhancing user experience.
2. Create Short URL API:

Endpoint: /api/shorten
Method: POST
Description: Create a new short URL to facilitate easy sharing of long URLs, which can often be cumbersome and difficult to manage. This API will generate a concise link that redirects to the original URL, making it ideal for social media, emails, and other communication channels.
Request Body:
longUrl (string): The original URL to be shortened.
customAlias (string, optional): A custom alias for the short URL (if not provided, generate a unique one).
topic (string, optional): A category under which the short URL is grouped (e.g., acquisition, activation, retention).
Response:
shortUrl (string): The generated short URL.
createdAt (datetime): The timestamp indicating when the short URL was created.
Rate Limiting: Implement rate limiting to restrict the number of short URLs a user can create within a specified time frame.
3. Redirect Short URL API:

Endpoint: /api/shorten/{alias}
Method: GET
Description: Redirect to the original URL based on the short URL alias, enabling seamless access to the long URL while tracking user engagement.
Response: Redirect the user to the original long URL.
Analytics Tracking: Log each redirect event, including timestamp, user agent, IP address, and geolocation data for analytics. Collection of these data for each visit is important since it is dependant on analytics apis.
4. Get URL Analytics API:

Endpoint: /api/analytics/{alias}
Method: GET
Description: Retrieve detailed analytics for a specific short URL, providing insights into its performance, including total clicks and unique audience interactions.
Response:
totalClicks (number): Total number of times the short URL has been accessed.
uniqueClicks (number): Number of unique users who accessed the short URL.
clicksByDate (array): An array of objects containing date(consider recent 7 days) and click count.
osType (array): An array of objects containing:
osName (string): The name of the operating system (e.g., Windows, macOS, Linux, iOS, Android).
uniqueClicks (number): Number of unique clicks for that OS.
uniqueUsers (number): Number of unique users for that OS.
deviceType (array): An array of objects containing:
deviceName (string): The type of device used (e.g., mobile, desktop).
uniqueClicks (number): Number of unique clicks for that device type.
uniqueUsers (number): Number of unique users for that device type.
5. Get Topic-Based Analytics API:

Endpoint: /api/analytics/topic/{topic}
Method: GET
Description: Retrieve analytics for all short URLs grouped under a specific topic, allowing users to assess the performance of their links based on categories.
Response:
totalClicks (number): Total number of clicks across all URLs in the specified topic.
uniqueClicks (number): Number of unique users who accessed URLs in the specified topic.
clicksByDate (array): An array of objects containing date and total click counts for all URLs under topic.
urls (array): An array of URLs under the specified topic, each containing:
shortUrl (string): The generated short URL.
totalClicks (number): Total number of clicks for the short URL.
uniqueClicks (number): Number of unique users who accessed the short URL.
6. Get Overall Analytics API:

Endpoint: /api/analytics/overall
Method: GET
Description: Retrieve overall analytics for all short URLs created by the authenticated user, providing a comprehensive view of their link performance.
Response:
totalUrls (number): Total number of short URLs created by the user.
totalClicks (number): Total number of clicks across all URLs created by the user.
uniqueClicks (number): Total number of unique users who accessed any of the user's short URLs.
clicksByDate (array): An array of objects containing date and total click counts for all URLs.
osType (array): An array of objects containing:
osName (string): The name of the operating system (e.g., Windows, macOS, Linux, iOS, Android).
uniqueClicks (number): Number of unique clicks for that OS.
uniqueUsers (number): Number of unique users for that OS.
deviceType (array): An array of objects containing:
deviceName (string): The type of device used (e.g., mobile, desktop).
uniqueClicks (number): Number of unique clicks for that device type.
uniqueUsers (number): Number of unique users for that device type.
7. Caching:

Implement caching using Redis to store both short and long URLs, improving the performance of the API by reducing database load. Cache data wherever necessary, such as when retrieving URL analytics or redirecting short URLs, to ensure quick access and response times.