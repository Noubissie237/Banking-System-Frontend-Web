import React from "react";

const CardInfo = ({ title, color, svg, value, unit }) => (
    <div className="col-md-4">
      <div className="card bg-light p-3">
        <h5>{title} | <span className={`text-${color}`}>Total</span></h5>
        <p>
          {svg}
          <span className="mx-3 totalCfa">{value} {unit}</span>
        </p>
      </div>
    </div>
  );
  
  export default CardInfo;
  