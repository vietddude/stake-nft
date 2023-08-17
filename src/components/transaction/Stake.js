import React from "react";

export function Stake({ stake }) {
  return (
    <div>
      <h4>Stake</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const amount = formData.get("amount");

          if (amount) {
            stake(amount);
          }
        }}
      >
        <div className="form-group">
          <label>Amount</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="0"
            required
          />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Stake" />
        </div>
      </form>
    </div>
  );
}
