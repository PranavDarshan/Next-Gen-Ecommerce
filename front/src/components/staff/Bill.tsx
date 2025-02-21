import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface BillProps {
  customerId: string;
  cart: { id: string; name: string; price: number; quantity: number }[];
  totalAmount: number;
  onClose: () => void;
}

const Bill: React.FC<BillProps> = ({ customerId, cart, totalAmount, onClose }) => {
  const billRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!billRef.current) return;

    const canvas = await html2canvas(billRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, (canvas.height * 190) / canvas.width);
    pdf.save(`bill_${customerId}.pdf`);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96" ref={billRef}>
        <h2 className="text-xl font-bold text-center mb-4">Transaction Bill</h2>
        <p><strong>Customer ID:</strong> {customerId}</p>
        <hr className="my-2" />

        <div className="space-y-2">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹ {item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-2" />
        <p className="text-right font-bold">Total: ₹ {totalAmount.toFixed(2)}</p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
