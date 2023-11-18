import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css'
function Dashboard({ userToken }) {
  const [restaurantData, setRestaurantData] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(null);
  const [customAmount, setCustomAmount] = useState(0);
  const [regularAmounts, setRegularAmounts] = useState({
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://stg.dhunjam.in/account/admin/4',
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setRestaurantData(response.data.data);
        setChargeCustomers(response.data.data.charge_customers);
        setCustomAmount(response.data.data.amount.category_6);
        setRegularAmounts({
          category_7: response.data.data.amount.category_7,
          category_8: response.data.data.amount.category_8,
          category_9: response.data.data.amount.category_9,
          category_10: response.data.data.amount.category_10,
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [userToken]);

  const handleRadioChange = (value) => {
    setChargeCustomers(value);
    setSaveButtonEnabled(false);
  };

  const handleInputChange = (value) => {
    setCustomAmount(value);
    setSaveButtonEnabled(value > 99);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://stg.dhunjam.in/account/admin/${restaurantData.id}`,
        {
          amount: {
            category_6: customAmount,
            category_7: regularAmounts.category_7,
            category_8: regularAmounts.category_8,
            category_9: regularAmounts.category_9,
            category_10: regularAmounts.category_10,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Handle response if needed
      setSaveButtonEnabled(false);
    } catch (error) {
      console.error('Failed to update prices:', error);
    }
  };

  return (
    <div id='dashboard'>
      {restaurantData ? (
        <div>
          <h2>{restaurantData.name}</h2>
        

          {/* Radio buttons */}
          <div>
            <label>
              <input
                type="radio"
                value="true"
                checked={chargeCustomers === true}
                onChange={() => handleRadioChange(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="false"
                checked={chargeCustomers === false}
                onChange={() => handleRadioChange(false)}
              />
              No
            </label>
          </div>

          {/* Input field */}
          {chargeCustomers && (
            <div>
              <label>Custom Song Request Amount:</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
          )}

          {/* Regular song request amounts */}
          <div>
            <p>Regular Song Request Amounts (from high to low):</p>
            <p>Category 7: {regularAmounts.category_7}</p>
            <p>Category 8: {regularAmounts.category_8}</p>
            <p>Category 9: {regularAmounts.category_9}</p>
            <p>Category 10: {regularAmounts.category_10}</p>
          </div>

          {chargeCustomers && (
            <div>
              <p>Bar Form:</p>
              <div className="bar-container">
                <div className="bar" style={{ width: `${customAmount}px` }}></div>
                category_7 <div className="bar" style={{ width: `${regularAmounts.category_7}px` }}></div>
                category_8 <div className="bar" style={{ width: `${regularAmounts.category_8}px` }}></div>
                category_9 <div className="bar" style={{ width: `${regularAmounts.category_9}px` }}></div>
                category_10 <div className="bar" style={{ width: `${regularAmounts.category_10}px` }}></div>
              </div>
            </div>
          )}
          {/* Save button */}
          {chargeCustomers && (
            <div>
              <button
                onClick={handleSave}
                disabled={!saveButtonEnabled}
              >
                Save
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
