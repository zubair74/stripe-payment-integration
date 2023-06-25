import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Stripe from 'react-stripe-checkout'

function App() {


  const handleToken = (totalAmount, token) => {
    try{
        axios.post("http://localhost:5000/api/stripe/pay", {
            token: token.id,
            amount: totalAmount
        })
    }
    catch(error){
        console.log(error);
    }
}

const tokenHandler = (token) => {
    handleToken(100, token)
}
  return (
    <div>
            <Stripe 
                stripeKey = "add publisher key here"
                token = {tokenHandler}
            />
    </div>
  );
}

export default App;
