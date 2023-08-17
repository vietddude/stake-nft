import React, { useState, useEffect } from "react";

export function GetTokenDetails({ accountDetail }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const detail = await accountDetail;
        console.log(detail);
        setToken(detail);
      } catch (error) {
        console.error("Error fetching token details:", error);
        setToken(null);
      }
    };

    fetchTokenDetails();
  }, [accountDetail]);

  return (
    <div>
      <h4>Acount Details</h4>
      {token !== null ? (
        <div>
          <p>Token ID: {token.id}</p>
          <p>Token Name: {token.name}</p>
          <p>Token Amount: {token.amount}</p>
        </div>
      ) : (
        <p>Error fetching token details</p>
      )}
    </div>
  );
}
