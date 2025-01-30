import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailjsConfig, setEmailjsConfig] = useState(null);

  useEffect(() => {
    // Fetch EmailJS configuration from the backend
    const fetchEmailjsConfig = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;

        if (!apiUrl) throw new Error("API URL is missing!");

        const fullUrl = `${apiUrl}/emailjs-config`;
        console.log("Fetching from:", fullUrl);

        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch EmailJS configuration");
        }
        const config = await response.json();
        setEmailjsConfig(config); // Store the config for use
      } catch (error) {
        console.error("Error fetching EmailJS config:", error);
        setErrorMessage("Failed to load email configuration.");
      }
    };

    fetchEmailjsConfig();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (emailjsConfig) {
      emailjs
        .sendForm(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          e.target, // form is passed as the target of the submit event
          emailjsConfig.publicKey
        )
        .then(
          () => {
            setSuccessMessage("Your message has been sent successfully!");
            setFormData({ name: "", email: "", message: "" });
          },
          (error) => {
            console.log("FAILED...", error.text);
            setErrorMessage(
              "Failed to send the message. Please try again later."
            );
          }
        )
        .finally(() => {
          setIsSending(false);
        });
    } else {
      setErrorMessage("Email configuration is missing.");
      setIsSending(false);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-gray-50 rounded-lg shadow-lg p-8 transition-all duration-500 hover:scale-102">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            Fill out the form below and we will get back to you as soon as
            possible.
          </p>
        </div>

        <form onSubmit={sendEmail}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-600 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-all duration-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="message" className="text-gray-600 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-all duration-300"
              rows="5"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all ease-in-out duration-300"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
