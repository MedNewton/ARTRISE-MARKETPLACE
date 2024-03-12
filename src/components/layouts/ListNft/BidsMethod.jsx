import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  DetailTitle,
  FixedMethodWrapper,
  Label,
  ListButton,
  SectionHeading,
  SummaryDetailsWrapper,
  SummarySection,
} from './FixedMethod.styles';
import { RadioButtonsContainer } from './listNFT.styles';

function BidsMethod() {
  const [auctionPrice, setAuctionPrice] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [loading] = useState(false);
  const theme = useSelector((state) => state.themeReducer.theme);

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
  ], []);

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
      <FixedMethodWrapper>
        <Label htmlFor="duration">
          <SectionHeading theme={theme}>Duration</SectionHeading>
          <Select
            id="duration"
            className="multi-select"
            options={durationOptions}
            value={durationOptions.find((option) => option.value === selectedDuration)}
            onChange={handleDurationChange}
          />
        </Label>
        {selectedDuration === 'custom' && (
          <RadioButtonsContainer>
            <Label theme={theme} htmlFor="customDurationStartDate">
              {/* <SectionHeading theme={theme}>Starting Date</SectionHeading> */}
              <input
                id="customDurationStartDate"
                type="datetime-local"
                name="customDurationStartDate"
                onChange={handleCustomStartDateChange}
              />
            </Label>

            <p> - </p>
            <Label theme={theme} htmlFor="customDurationEndDate">
              {/* <SectionHeading theme={theme}>Ending Date</SectionHeading> */}
              <input
                id="customDurationEndDate"
                type="datetime-local"
                name="customDurationEndDate"
                onChange={handleCustomEndDateChange}
              />
            </Label>
          </RadioButtonsContainer>
        )}
        {selectedDuration === 'custom' && customStartDate && customEndDate && (
          <p>{calculateDuration()}</p>
        )}
        <Label htmlFor="startingPrice">
          <SectionHeading theme={theme}>Starting Price</SectionHeading>
          <input
            id="startingPrice"
            name="startingPrice"
            placeholder="Enter auction Price for one item (ETH)"
            onChange={(e) => setAuctionPrice(parseFloat(e.target.value))}
          />
        </Label>
        <SummarySection>
          <SectionHeading theme={theme}>Summary</SectionHeading>
          <SummaryDetailsWrapper>
            <DetailTitle theme={theme}>Duration</DetailTitle>
            <DetailTitle theme={theme}>
              {' '}
              {
                selectedDuration === 'custom'
                  ? calculateDuration() : selectedDuration
              }
            </DetailTitle>
          </SummaryDetailsWrapper>

          <SummaryDetailsWrapper>
            <DetailTitle theme={theme}>Starting Price</DetailTitle>
            <DetailTitle theme={theme}>{auctionPrice}</DetailTitle>
          </SummaryDetailsWrapper>

          <SummaryDetailsWrapper>
            <DetailTitle theme={theme}>ArtRise fees after sale</DetailTitle>
            <DetailTitle theme={theme}>15%</DetailTitle>
          </SummaryDetailsWrapper>
        </SummarySection>
        <ListButton
          theme={theme}
          loading={loading}
        >
          List this item
        </ListButton>

      </FixedMethodWrapper>
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
  );
}

export default BidsMethod;
