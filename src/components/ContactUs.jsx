import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    category: "General Suggestions",
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "First name is required.";
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const res = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      setLoading(false);
      if (result.ok) {
        toast.success(`${result.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setFormData({
          category: "General Suggestions",
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(`${result.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      toast.error(`Please enter valid email and data`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center  p-6 font-onest"
      id="contactus"
    >
      <h2 className="text-2xl  my-[24px] font-bold self-center w-[65%] text-start max-lg:w-full">
        Contact Us
      </h2>
      <p className="my-[15px] text-[16px] text-gray-600 self-center text-start  w-[65%] max-lg:w-full ">
        We want to hear from you!
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className=" w-[65%] max-lg:w-full relative"
      >
        <div className="mb-[30px] cursor-pointer ">
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
          <label className="block font-medium mb-[8px]" htmlFor="name">
            First Name *
          </label>
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            autoComplete="given-name"
            onChange={handleChange}
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm absolute">{errors.name}</p>
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

        {loading ? (
          <button
            type="submit"
            className="py-[12px] px-[25px]  border border-gray-400 rounded hover:bg-gray-100 font-semibold"
          >
            Loading{" "}
            <img
              src="/assets/loader.gif"
              alt="Loading..."
              className="w-[24px] ml-2 inline-block object-cover"
            />
          </button>
        ) : (
          <button
            type="submit"
            className="py-[12px] px-[25px]  border border-gray-400 rounded hover:bg-gray-100 font-semibold cursor-pointer"
          >
            SEND MESSAGE
          </button>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
