import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    category: "General Suggestions",
    firstName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          category: "General Suggestions",
          firstName: "",
          email: "",
          message: "",
        });
      }, 3000);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center  p-6 font-onest" id="contactus">
      <h2 className="text-2xl  my-[24px] font-bold self-center w-[65%] text-start max-lg:w-full">Contact Us</h2>
      <p className="my-[15px] text-[16px] text-gray-600 self-center text-start  w-[65%] max-lg:w-full " >We want to hear from you!</p>

      <form onSubmit={handleSubmit} noValidate className=" w-[65%] max-lg:w-full relative">
        <div className="mb-[30px] ">
          <label className="block font-medium mb-[8px]" htmlFor="category">
            Category *
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full  bg-gray-100 border border-gray-300 rounded px-3 py-2"
          >
            <option>General Suggestions</option>
            <option>General Improvements</option>
            <option>Product Suggestions</option>
          </select>
        </div>

        <div className="mb-[30px]">
          <label className="block font-medium mb-[8px]" htmlFor="firstName">
            First Name *
          </label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            value={formData.firstName}
            autoComplete="given-name"
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm absolute">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-[30px]">
          <label className="block font-medium mb-[8px]" htmlFor="email">
            Email *
          </label>
          <input
            name="email"
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm absolute">{errors.email}</p>
          )}
        </div>

        <div className="mb-[30px]">
          <label className="block font-medium mb-[8px]" htmlFor="message">
            Message *
          </label>
          <textarea
            name="message"
            autoComplete="off"
            id="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
          />
          {errors.message && (
            <p className="text-red-500 text-sm absolute">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="py-[12px] px-[25px]  border border-gray-400 rounded hover:bg-gray-100 font-semibold"
        >
          SEND MESSAGE
        </button>
   <div className="relative w-full h-[40px]">
{success && (
          <p className="absolute text-green-600 top-4 font-medium">
            Thank you! Your message has been sent successfully.
          </p>
        )}
        </div>
        
      </form>
    </div>
  );
};

export default ContactUs;
