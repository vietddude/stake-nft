import React, { useState, useEffect } from "react";

export function GetStakedAmount({ initialStakedAmount }) {
  const [stakedAmount, setStakedAmount] = useState(null);
  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const detail = await initialStakedAmount;
        setStakedAmount(detail);
      } catch (error) {
        console.error("Error fetching stakedAmount details:", error);
        setStakedAmount(null);
      }
    };

    fetchTokenDetails();
  }, [initialStakedAmount]);

  return (
    <div>
      {/* <h4>Staked Amount</h4> */}
      {stakedAmount !== null ? (
        <div>
          <p>Staked amount: {stakedAmount}</p>
        </div>
      ) : (
        <p>Error fetching stakedAmount details</p>
      )}
    </div>
  );
}
