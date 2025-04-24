import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [form, setForm] = useState("usd")
  const [to, setTo] = useState("inr")
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  
  useEffect(()=>{
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${form}.json`)
        .then((res) => res.json())
        .then((res) => {
          console.log("got it response");
          setData(res[form])
        })
        
  },[])

  useEffect(() => {
    if (data[form] && amount === 0) {
      setAmount(data[form]);
    }
    convert()
  }, [data, form]);
  
  
  useEffect(()=>{
    setConvertedAmount( data[to] );
  });

  const currencyOptions = Object.keys(data);

  const convert = () =>{    
    setConvertedAmount( amount * data[to] )    
  }

  const fromChange = (event) =>{
    setForm(event.target.value);    
    convert()
  }

  const toChange = (event) =>{
    setTo(event.target.value)
    convert()
  }
  const swap = () =>{
    setForm(to)
    setTo(form)
  }

  const onAmountChange = (value) => {
    setAmount(value)
  }

  return (
    <>
      <h2>Currency Converter</h2>
      <p> 
        Check live rates, set rate alerts, 
        receive notifications and more. 
      </p>
      <div className='currency-convert-box'>
        <form className='currency-boxes'>
          <div className='from-currency-box'>
            <p>Amout</p>
            <div className='input-boxes'>
              <div className='select-box'>
                <select name='from-currency' onChange={fromChange} value={form}>
                {currencyOptions.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
                </select>
              </div>
              <div className='input-box'>
                <input type='text' name='from' value={amount} onChange={(e)=>{ onAmountChange(Number(e.target.value)) } }/>
              </div>
            </div>
          </div>
          <div className='exchange-currency'>
            <button type="submit" onClick={(e)=>{ e.preventDefault(); swap() }}>currency change</button>
          </div>
          <div className='to-currency-box'>
            <div className='input-boxes'>
              <div className='select-box'>
                <select name='to-currency' onChange={toChange} value={to}>
                {currencyOptions.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
                </select>
              </div>
              <div className='input-box'>
                <input type='text' name='from' value={convertedAmount} disabled/>
              </div>
            </div>
          </div>
          <div className='indicate-currency'>
            <p>
              Indicative Exchange Rate
              <span>1 SGD</span> = <span>0.7367 USD</span>
            </p>
          </div>
        </form>        
      </div>
    </>
  )
}

export default App
