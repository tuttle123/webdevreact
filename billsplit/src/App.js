import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [totalBill, setTotalBill] = useState('');
  const [numberOfFriends, setNumberOfFriends] = useState(1);
  const [tip, setTip] = useState(0);
  const [tax, setTax] = useState(0);
  const [orders, setOrders] = useState([]);
  const [meals, setMeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch data from TheMealDB API
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeals(data.meals.slice(0, 10)); // Get the first 10 meals
    } catch (error) {
      console.error('Error fetching the meals:', error);
    }
  };

  const calculateTotalWithTipAndTax = () => {
    const bill = parseFloat(totalBill) || 0;
    const tipAmount = bill * (parseFloat(tip) / 100);
    const taxAmount = parseFloat(tax) || 0;
    return bill + tipAmount + taxAmount;
  };

  // Add a selected meal to the orders
  const handleAddMealToOrder = (meal) => {
    const price = Math.floor(Math.random() * 20) + 5; // Random price for each meal
    const newOrder = { item: meal.strMeal, cost: price, person: 0 };
    setOrders([...orders, newOrder]);
  };

  const handleOrderChange = (index, field, value) => {
    const newOrders = [...orders];
    newOrders[index][field] = value;
    setOrders(newOrders);
  };

  const handleRemoveOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  const calculatePerPersonAmount = () => {
    const totals = Array(numberOfFriends).fill(0);

    orders.forEach((order) => {
      const personIndex = parseInt(order.person, 10);
      if (!isNaN(personIndex) && personIndex < numberOfFriends && order.cost) {
        totals[personIndex] += parseFloat(order.cost);
      }
    });

    const totalBillWithExtras = calculateTotalWithTipAndTax();
    const subtotal = orders.reduce((acc, order) => acc + parseFloat(order.cost || 0), 0);

    const finalTotals = totals.map((total) => {
      const proportionalTaxAndTip = (total / subtotal) * (totalBillWithExtras - subtotal);
      return (total + proportionalTaxAndTip).toFixed(2);
    });

    return finalTotals;
  };

  const handleSubmit = () => {
    if (orders.some(order => order.cost <= 0)) {
      setErrorMessage('Please enter valid costs for all orders.');
      return;
    }
    setErrorMessage('');
  };

  return (
    <div className="App">
      <h1>Bill Splitter with Meal Selection</h1>

      <div>
        <label>Total Bill (Before Tip and Tax): $</label>
        <input
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
          placeholder="Enter total bill"
        />
      </div>

      <div>
        <label>Tip (%): </label>
        <input
          type="number"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          placeholder="Enter tip percentage"
        />
      </div>

      <div>
        <label>Tax ($): </label>
        <input
          type="number"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          placeholder="Enter tax amount"
        />
      </div>

      <div>
        <label>Number of Friends: </label>
        <input
          type="number"
          value={numberOfFriends}
          onChange={(e) => setNumberOfFriends(e.target.value)}
          min="1"
        />
      </div>

      <div>
        <h3>Select Meals from TheMealDB API</h3>
        {meals.length > 0 ? (
          <ul>
            {meals.map((meal, index) => (
              <li key={index}>
                {meal.strMeal} - ${Math.floor(Math.random() * 20) + 5} {/* Simulating prices */}
                <button onClick={() => handleAddMealToOrder(meal)}>Add to Order</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading meals...</p>
        )}
      </div>

      <div>
        <h3>Orders</h3>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index}>
              <label>Item {index + 1}: {order.item} </label>
              <label> Cost: ${order.cost} </label>
              <label> Assigned to Friend: </label>
              <select
                value={order.person}
                onChange={(e) => handleOrderChange(index, 'person', e.target.value)}
              >
                {Array.from({ length: numberOfFriends }, (_, i) => (
                  <option key={i} value={i}>
                    Friend {i + 1}
                  </option>
                ))}
              </select>
              <button onClick={() => handleRemoveOrder(index)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No orders added yet.</p>
        )}
      </div>

      <button onClick={handleSubmit}>Calculate</button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default App;
