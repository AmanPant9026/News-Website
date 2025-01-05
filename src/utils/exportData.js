import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

/**
 * Exports the provided data as a PDF file.
 * @param {Object[]} data - The data to export.
 */
export const exportToPDF = (data) => {
  const doc = new jsPDF();
  data.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.title}`, 10, 10 + index * 10);
  });
  doc.save('news-report.pdf');
};

/**
 * Exports the provided data as a CSV file.
 * @param {Object[]} data - The data to export.
 */
export const exportToCSV = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'news-report.csv');
};

/**
 * Exports the provided data to Excel format.
 * @param {Object[]} data - The data to export.
 */
export const exportToExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'news-report.xlsx');
};
