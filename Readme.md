# Real-time Crypto Data App

Step 1 : Clone the github repository
git clone https://github.com/dhruv-chaurasia/crypto_app

Step 2 : Open the cloned repository in an IDE, open a terminal

# Run following commands

cd mini_website

npm install -g npm@latest (Minimum npm version - 9, Minimum Node version - 18.18.2)

npm install

cd backend
node index.js

# Open a new terminal

# Run the following commands

cd frontend
npm install
npm start

Make sure the backend and frontend are running.

# API Used for Crypto Data -

LiveCoinWatch

# API endpoint -

https://api.livecoinwatch.com/coins/single

# API Key -

"0bd22b7b-c8ce-432f-83cc-686218565acd"
(If the API hit limit reaches, will have to use new API Key)

# Request Body Format -

{
"currency": "INR",
"code": "BTC",
"meta": true
}
