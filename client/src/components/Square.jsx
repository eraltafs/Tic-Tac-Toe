import React from "react";

// placing X or O to board
function Square({chooseSquare, val}) {
  return(
    <div className="square" onClick={chooseSquare}>
        {val}
    </div>
  );
  
}

export default Square;