import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = ({ theme }) => {
  const isDark = theme === "dark";
  const [activeType, setActiveType] = useState("General inquiry");
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const bg = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const text = isDark ? "text-white" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-500";
  const inputCls = `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all ${
    isDark
      ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
  }`;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      message: formData.message,
      inquiry_type: activeType,
    };

    try {
      await emailjs.send(
        "service_bweom95",
        "template_eecn7ze",
        templateParams,
        "LPtnNkcjxbu5gPrft",
      );
      setStatus("success");
      setFormData({ first_name: "", last_name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      className={`px-4 sm:px-8 py-10 lg:py-16 min-h-screen transition-colors duration-300 ${bg}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-xs font-bold tracking-[4px] uppercase text-red-500 mb-3">
            Customer Care
          </p>
          <h1 className={`text-3xl lg:text-5xl font-bold mb-4 ${text}`}>
            We're Here to Help
          </h1>
          <p
            className={`text-base ${subtext} max-w-2xl mx-auto leading-relaxed`}
          >
            Whether it's a question about our services, a request for technical
            assistance, or suggestions for improvement, our team is eager to
            hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map Placeholder */}
          <div
            className={`rounded-2xl h-64 sm:h-80 lg:h-[510px] flex flex-col items-center justify-center gap-3 border ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <span className="text-5xl">🗺️</span>
            <p className={`text-sm font-medium ${subtext}`}>Map coming soon</p>
          </div>

          {/* Form */}
          <div
            className={`rounded-2xl border p-6 sm:p-8 ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <p className={`font-semibold text-sm mb-4 ${subtext}`}>
              Select inquiry type
            </p>

            {/* Inquiry type buttons */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {["General inquiry", "Product Support"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    activeType === type
                      ? "bg-red-500 text-white border-red-500"
                      : isDark
                        ? "border-white/10 text-gray-400 hover:border-red-400 hover:text-red-400"
                        : "border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <span className="text-5xl">✅</span>
                <h3 className={`text-lg font-bold ${text}`}>Message Sent!</h3>
                <p className={`text-sm ${subtext}`}>
                  Thanks for reaching out. We'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-red-500 hover:text-red-600 font-semibold transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className={`block text-xs font-semibold mb-1.5 ${text}`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-xs font-semibold mb-1.5 ${text}`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${text}`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    required
                    className={inputCls}
                  />
                </div>

                <div className="mb-6">
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${text}`}
                  >
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-xs mb-4 text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-md shadow-red-500/20"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
