import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function UploadSection() {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload an CT before submitting.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("ct-image", selectedFile); // تعديل هنا

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);

      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/analysis", { state: { result: response.data } });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setIsSubmitting(false);
    }
};


  return (
    <section className="h-screen bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Upload Your CT</h2>
        <form
          onSubmit={handleSubmit}
          className="border-4 border-dashed border-gray-300 p-12 rounded-lg"
        >
          <p className="text-gray-600 mb-4">
            Drag and drop your CT files here
          </p>
          <input
            type="file"
            accept="image/*"
            className="mt-4"
            onChange={handleImageChange}
          />
          {previewSrc && (
            <div className="mt-8">
              <p className="text-gray-600 mb-2">Image Preview:</p>
              <img
                src={previewSrc}
                alt="X-ray preview"
                className="w-64 h-64 object-contain mx-auto border rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            className={`mt-8 px-8 py-5 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Checking..." : "Check"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadSection;
