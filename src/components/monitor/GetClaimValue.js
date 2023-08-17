import React, { useState, useEffect } from "react";

export function GetClaimValue({ stakeData, otherData }) {
  const [claimValue, setClaimValue] = useState(0);
  const [stakingDuration, setStakingDuration] = useState(stakeData[1] || 0);

  let stakingDurationValue = stakeData[1] || 0; // Extract the value

  useEffect(() => {
    const interval = setInterval(() => {
      setStakingDuration((prevDuration) => Number(prevDuration) + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stakingDurationValue]);

  useEffect(() => {
    const fetchClaimValue = async () => {
      try {
        if (!stakeData || !otherData) {
          return 0;
        }

        const stakedNFTs = stakeData[0];
        const rewardRate = otherData?.rewardRate;
        const tokenValue = otherData?.tokenValue;
        const totalPoolSize = otherData?.totalPoolSize;

        let duration = 0;
        if (stakeData[1] !== 0)
          duration = stakingDuration;

        const result =
          stakedNFTs === "0" ||
          stakingDuration === 0 || // Use the current stakingDuration value
          rewardRate === "0" ||
          tokenValue === "0" ||
          totalPoolSize === "0"
            ? 0
            : (Number(stakedNFTs) *
                10000 *
                Number(duration) *
                Number(tokenValue)) /
              (Number(totalPoolSize) * 10 ** 18);
        return result;
      } catch (error) {
        console.error("Error calculating claim value:", error);
        return 0;
      }
    };

    fetchClaimValue().then((result) => {
      setClaimValue(result);
    });
  }, [stakeData, otherData, stakingDuration]);

  return (
    <div>
      <h4>Claim value</h4>
      <p>Claim Value: {claimValue.toFixed(15)}</p>
    </div>
  );
}
