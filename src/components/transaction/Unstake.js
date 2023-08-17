import React, { useState } from "react";

export function Unstake({ unstake, stakedAmount }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAmountChange = (event) => {
    const enteredAmount = event.target.value;
    setIsButtonDisabled(enteredAmount > stakedAmount);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amount = formData.get("amount");

    if (amount <= stakedAmount) {
      unstake(amount);
    }
  };

  return (
    <div>
      <h4>Unstake</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="0"
            required
            onChange={handleAmountChange}
          />
        </div>
        <div className="form-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="Unstake"
            disabled={isButtonDisabled}
          />
        </div>
      </form>
    </div>
  );
}
