import React from "react";

export function WaitingForTransactionMessage({ txHash }) {
  const etherscanUrl = `https://sepolia.etherscan.io/tx/${txHash}`;
  return (
    <div className="alert alert-info" role="alert">
      Waiting for transaction{" "}
      <a href={etherscanUrl} target="_blank" rel="noopener noreferrer">
        <strong>{txHash}</strong>
      </a>{" "}
      to be mined
    </div>
  );
}
