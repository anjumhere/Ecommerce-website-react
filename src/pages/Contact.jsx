import React from "react";

const Contact = () => {
  return (
    <section className="px-8 py-8 lg:py-16 bg-white">
      <div className="container mx-auto text-center">
        <h5 className="text-base lg:text-2xl text-gray-500 mb-4 font-medium">
          Customer Care
        </h5>
        <h1 className="text-3xl lg:text-5xl text-gray-900 mb-4 font-bold">
          We're Here to Help
        </h1>
        <p className="text-lg text-gray-500 mb-10 lg:mb-20 mx-auto max-w-3xl">
          Whether it's a question about our services, a request for technical
          assistance, or suggestions for improvement, our team is eager to hear
          from you.
        </p>

        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          {/* Image Placeholder */}
          <div className="bg-gray-100 rounded-xl h-[400px] lg:h-[510px] flex items-center justify-center">
            <div className="text-gray-400">Map Image Here</div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 lg:max-w-sm mx-auto w-full">
            <p className="text-left font-semibold text-gray-600 text-sm">
              Select Options for Business Engagement
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                General inquiry
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Product Support
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Your Email
              </label>
              <input
                type="email"
                placeholder="name@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Your Message
              </label>
              <textarea
                rows={6}
                placeholder="Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
