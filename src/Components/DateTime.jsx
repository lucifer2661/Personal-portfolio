import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Update the date/time state every second (1000ms)
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  // Format date to match macOS menu bar: "Wed 12 Aug 3:18 AM"
  const formattedDateTime = dateTime.toLocaleString('en-US', {
    weekday: 'short', // Wed
    day: 'numeric',   // 12
    month: 'short',   // Aug
    hour: 'numeric',  // 3
    minute: '2-digit',// 18
    hour12: true,     // AM/PM
  }).replace(',', ''); // Removes comma after weekday if browser adds one

  return (
    <span className="date-time-text">
      {formattedDateTime}
    </span>
  );
};

export default DateTime;