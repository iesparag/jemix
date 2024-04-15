import React, { useState, useEffect } from "react";
import '../styles/loader.scss'
// interface LoaderProps {
//   isLoading: boolean;
// }

// const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const Loader=()=>{
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 3000)
  // }, [])
  
  return (
    <div className="loader"
      // style={{display: `${
      //   isLoading ? "block" : "hidden"
      // }`}}
    >
      <p className="">
        loading
      </p>
    </div>
  );
};

export default Loader;
