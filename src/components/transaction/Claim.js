import React from "react";

export function Claim({ claim }) {
  return (
    <div>
      <h4>Claim</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the unstake callback with the
          // form's data.
          event.preventDefault();
          claim();
        }}
      >
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Claim" />
        </div>
      </form>
    </div>
  );
}
