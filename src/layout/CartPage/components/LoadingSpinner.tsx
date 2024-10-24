import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <i className="text-4xl pi pi-spinner pi-spin" />
    </div>
  );
};

export default LoadingSpinner;