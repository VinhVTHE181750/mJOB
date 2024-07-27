import React, {useState} from 'react';
import '../../assets/css/PriceBar.css';

const FilterPrice = ({ onStartPrice, onEndPrice }) => {
  const [priceStart, setPriceStart] = useState('');
  const [priceEnd, setPriceEnd] = useState('');

  const handlePriceStartChange = (e) => {
    setPriceStart(e.target.value);
    onStartPrice(e.target.value);
  };

  const handlePriceEndChange = (e) => {
    setPriceEnd(e.target.value);
    onEndPrice(e.target.value);
  };

  return (
    <>   
      Salary From:
      <input className="price-bar" type="number" value={priceStart} onChange={handlePriceStartChange} />
      To:
      <input className="price-bar" type="number" value={priceEnd} onChange={handlePriceEndChange} />
    </>
  );
};

export default FilterPrice;
