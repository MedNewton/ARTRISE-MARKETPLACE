/*eslint-disable*/
import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';


function BidsMethod() {
  const [auctionPrice, setAuctionPrice] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);


  const durationOptions = useMemo(() => [
    {
      value: 'custom',
      label: 'Custom',
    },
    {
      value: '1_hour',
      label: '1 Hour',
    },
    {
      value: '6_hours',
      label: '6 Hours',
    },
    {
      value: '1_day',
      label: '1 Day',
    },
    {
      value: '3_days',
      label: '3 Days',
    },
    {
      value: '7_days',
      label: '7 Days',
    },
    {
      value: '1_Month',
      label: '1 Month',
    },
    {
      value: '3_Months',
      label: '3 Months',
    },
    {
      value: '7_Months',
      label: '7 Months',
    },
  ],[]);

  const handleDurationChange = (selectedOption) => {
    setSelectedDuration(selectedOption.value);
  };

  const handleCustomStartDateChange = (e) => {
    setCustomStartDate(e.target.value);
  };

  const handleCustomEndDateChange = (e) => {
    setCustomEndDate(e.target.value);
  };

  const calculateDuration = () => {
    if (selectedDuration === 'custom' && customStartDate && customEndDate) {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      const diffInMillis = endDate - startDate;

      const durationDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
      const durationHours = Math.floor((diffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const durationMinutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60));

      return `Duration: ${durationDays} days, ${durationHours} hours, ${durationMinutes} minutes`;
    }

    const predefinedDuration = durationOptions.find((option) => option.value === selectedDuration);
    if (predefinedDuration) {
      return `Duration: ${predefinedDuration.label}`;
    }

    return 'Duration: N/A';
  };

  return (
    <>
      <form>
        <div className="mt-4">
          <label htmlFor="duration" className="mb-4">
            <Select
              id="duration"
              className="multi-select"
              options={durationOptions}
              value={durationOptions.find((option) => option.value === selectedDuration)}
              onChange={handleDurationChange}
            />
            Duration:
          </label>
          {selectedDuration === 'custom' && (
            <div className="selected-Duration">
              <label htmlFor="customDurationStartDate" className="mb-4">
                <input
                  id="customDurationStartDate"
                  type="datetime-local"
                  style={{ marginBottom: '0px' }}
                  onChange={handleCustomStartDateChange}
                />
              </label>
              <p> - </p>
              <label htmlFor="customDurationEndDate" className="mb-4">
                <input
                  type="datetime-local"
                  style={{ marginBottom: '0px' }}
                  onChange={handleCustomEndDateChange}
                />
              </label>
            </div>
          )}
          {selectedDuration === 'custom' && customStartDate && customEndDate && (
            <div style={{ padding: '20px 0px' }}>
              <p>{calculateDuration()}</p>
            </div>
          )}
        </div>
        <div className="mt-4 ">
          <label htmlFor="startingPrice" className="mb-4">
            <input
              id="startingPrice"
              className="mb-0"
              type="number"
              placeholder="Enter price for one item (ETH)"
              onChange={(e) => {
                setAuctionPrice(e.target.value);
              }}
            />
            Starting Price
          </label>
        </div>

        <div className="summary-main">
          <h4 className="mb-4">Summary</h4>
          <div className="summary-details">
            <h5 className="subTitleCreate">Duration</h5>
            <h5 className="subTitleCreate">
              {
                selectedDuration === 'custom'
                  ? calculateDuration() : selectedDuration
              }
            </h5>
          </div>
          <div className="summary-details">
            <h5 className="subTitleCreate">Starting Price</h5>
            <h5 className="subTitleCreate">{auctionPrice}</h5>
          </div>
          <div className="summary-details">
            <h5 className="subTitleCreate">ArtRise fees after sale</h5>
            <h5 className="subTitleCreate">15%</h5>
          </div>
        </div>

        <div className="listButton">List this item</div>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

// FixedMethod.propTypes = {
//   mediaUrl: PropTypes.string,
// };
//
// FixedMethod.defaultProps = {
//   mediaUrl: '', // Provide a default value (e.g., an empty string) or null based on your use case.
// };

export default BidsMethod;
