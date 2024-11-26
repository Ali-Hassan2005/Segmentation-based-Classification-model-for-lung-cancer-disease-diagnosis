import { useLocation } from "react-router";
import { FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaSmile } from "react-icons/fa";

function Analysis() {
  const location = useLocation();
  const { result } = location.state || {};

  const diagnose = result.result || [];  

  const renderDiagnosisMessage = () => {
    if (diagnose.includes("Positive")) {
      return (
        <div className="text-red-500 font-bold flex items-center">
          <FaExclamationCircle className="text-3xl mr-2" />
          <div>
            <p>The diagnosis is Positive.</p>
            <p>Immediate medical attention is recommended.</p>
          </div>
        </div>
      );
    } else if (diagnose.includes("Malignant")) {
      return (
        <div className="text-red-600 font-bold flex items-center">
          <FaTimesCircle className="text-3xl mr-2" />
          <div>
            <p>The diagnosis is Malignant.</p>
            <p>Consult an oncologist for further evaluation.</p>
          </div>
        </div>
      );
    } else if (diagnose.includes("Negative")) {
      return (
        <div className="text-green-600 font-bold flex items-center">
          <FaSmile className="text-3xl mr-2" />
          <div>
            <p>Your health is Normal.</p>
            <p>You are in good health. Keep it up!</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-gray-600">
          <p>No diagnosis available.</p>
        </div>
      );
    }
  };

  return (
    <section className="h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Analysis Results
        </h2>
        <div className="flex justify-center items-center w-full">
          <div className="bg-white shadow-md rounded-lg p-6 w-[600px]">
            <h3 className="mt-4 text-xl font-bold">Diagnosis</h3>
            <p className="text-gray-600 mt-2">{renderDiagnosisMessage()}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analysis;
