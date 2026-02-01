import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Error = (props: Props) => {
  console.log("Error props : ", props);
  return <div>Error</div>;
};

export default Error;
