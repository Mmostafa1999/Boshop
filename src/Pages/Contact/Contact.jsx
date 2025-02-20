import MainButton from "../../Shared/MainButton";

export default function Contact() {
  return (
    <section className=" container mt-20  mx-auto py-12 px-4 sm:px-6 lg:px-8   ">
      <div className="bg-white text-[#2d3a4b]  flex flex-col lg:grid lg:grid-cols-3 ">
        {/* Form Section */}
        <div className="lg:col-span-2 p-6 lg:p-12">
          <h2 className="text-2xl  mb-6">Keep in Touch With Us</h2>
          <form className="space-y-6">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Phone and Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Enter your phone"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-600">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Enter subject"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Write your message"></textarea>
            </div>

            <MainButton btnContent="Send Email" />
          </form>
        </div>

        {/* Address Section */}
        <div className="border-2 p-10 md:mt-20 mx-auto border-red-500 text-xs lg:p-10 md:w-3/4 w-full flex flex-col leading-6 flex-nowrap h-fit">
          <h3 className="text-lg font-semibold mb-4">Our Address</h3>
          <div className="space-y-4">
            <p className="flex items-center text-gray-700">
              <span className=" mr-4">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              Street No. 12, Newyork 12, MD - 123, USA.
            </p>
            <p className="flex items-center text-gray-700">
              <span className=" mr-4">
                <i className="fa-solid fa-phone"></i>
              </span>
              1.800.123.456789
            </p>
            <p className="flex items-center text-gray-700">
              <span className="material-icons  mr-4">
                <i className="fa-solid fa-envelope"></i>
              </span>
              info@ecoshop.com
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              erat turpis, pellentesque non leo eget.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
