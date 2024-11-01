import { div, li } from "framer-motion/client";
import React from "react";

const BattleLog = ({ log }) => {
  <div>
    <h3>Battle Log</h3>
    <ul>
      {log.map((entry, index) => (
        <li key={index}>{entry}</li>
      ))}
    </ul>
  </div>;
};

export default BattleLog;
