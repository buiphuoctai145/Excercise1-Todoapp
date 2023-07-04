import React from "react";

interface CancelButtonProps {
  onClose: () => void;
}

export const CancelButton = ({ onClose }: CancelButtonProps) => {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};
