

import React from "react";

const StatusBanner = ({ isLoading, isComplete }) => {
  return (
    <div className="w-full text-center my-4">
      {isLoading && (
        <div className="text-blue-600 font-semibold animate-pulse">
          Diarization in progress...
        </div>
      )}
      {isComplete && (
        <div className="text-green-600 font-semibold">
          Diarization complete ✅
        </div>
      )}
    </div>
  );
};

export default StatusBanner;