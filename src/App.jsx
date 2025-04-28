import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [form, setForm] = useState('usd');
  const [to, setTo] = useState('inr');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch currency data only when form (from currency) or to currency changes
  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${form}.json`)
      .then((res) => res.json())
      .then((res) => {        
        setData(res[form]);
      });
  }, [form]); // Dependency on 'form', i.e., when 'form' changes, fetch again

  // Update amount and convertedAmount when data or form changes
  useEffect(() => {
    if (data[form] && amount === 0) {
      setAmount(data[form]); // Set initial amount from fetched data if amount is 0
    }
  }, [data, form]);

  // Convert amount to the target currency
  useEffect(() => {
    if (data[to] && amount !== 0) {
      setConvertedAmount(amount * data[to]);
    }
  }, [amount, data, to]); // Re-run whenever amount, data, or target currency changes

  // Currency options for select dropdowns
  const currencyOptions = Object.keys(data);

  const convert = () => {
    if (data[to]) {
      setConvertedAmount(amount * data[to]);
    }
  };

  const fromChange = (event) => {
    setForm(event.target.value);
  };

  const toChange = (event) => {
    setTo(event.target.value);
  };

  const swap = () => {
    setForm(to);
    setTo(form);
  };

  const onAmountChange = (value) => {
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setAmount(numericValue);
    }
  };

  return (
    <>
      <h2>Currency Converter</h2>
      <p>
        Check live rates, set rate alerts, receive notifications, and more.
      </p>
      <div className='currency-convert-box'>
        <form className='currency-boxes'>
          <div className='from-currency-box'>
            <p>Amount</p>
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
                <input
                  type='text'
                  name='from'
                  value={amount}
                  onChange={(e) => onAmountChange(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='exchange-currency'>
            <button type='button' onClick={swap}>
              Swap Currencies
            </button>
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
                <input type='text' name='to' value={convertedAmount} readOnly />
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
  );
}

export default App;
