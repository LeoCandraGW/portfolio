import React from "react";

const HpBar = ({ currentHp, maxHp }) => {
  // Calculate the HP percentage
  const hpPercentage = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

  return (
    <div>
      <div className="hp-bar-container">
        <div
          className="hp-bar-fill"
          style={{
            width: `${hpPercentage}%`,
          }}
        ></div>
      </div>
      <p>Hp: {currentHp} / {maxHp}</p>
    </div>
  );
};

export default HpBar;
