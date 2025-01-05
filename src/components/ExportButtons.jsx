import React from 'react';

const ExportButtons = ({ data }) => {
  const handleExportPDF = () => {
    // Logic for exporting to PDF
    console.log('Exporting PDF');
  };

  const handleExportCSV = () => {
    // Logic for exporting to CSV
    console.log('Exporting CSV');
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleExportPDF}
        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all shadow-sm"
      >
        Export PDF
      </button>
      <button
        onClick={handleExportCSV}
        className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-all shadow-sm"
      >
        Export CSV
      </button>
    </div>
  );
};

export default ExportButtons;
