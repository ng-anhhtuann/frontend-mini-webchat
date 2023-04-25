import React from "react";
import "../styles/global.css"

const LoadingDots = ({ color = "#000" }) => {
return (
<span className="loading">
<span style={{ backgroundColor: color }} />
<span style={{ backgroundColor: color }} />
<span style={{ backgroundColor: color }} />
</span>
);
};

export default LoadingDots;