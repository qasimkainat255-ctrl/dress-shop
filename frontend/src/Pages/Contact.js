import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been received.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#fffaf7] text-[#3b2927]">

      {/* HEADER */}
      <section className="bg-[#f7eae6] px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#a66b6b]">
          Get In Touch
        </p>

        <h1 className="mt-4 font-serif text-5xl md:text-7xl">
          Contact Us
        </h1>

        <p className="mx-auto mt-6 max-w-xl leading-7 text-[#765e5a]">
          Have a question about an order, size or product?
          We'd love to hear from you.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">

        {/* INFO */}
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#a66b6b]">
            Let's Talk
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            We are here for you.
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-[#765e5a]">
            Whether you need help choosing the perfect dress or have
            a question about your order, our team is always happy to help.
          </p>

          <div className="mt-10 space-y-7">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#a66b6b]">
                Email
              </p>
              <p className="mt-1 font-medium">
                hello@dressshop.com
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#a66b6b]">
                Phone
              </p>
              <p className="mt-1 font-medium">
                +92 300 1234567
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#a66b6b]">
                Opening Hours
              </p>
              <p className="mt-1 font-medium">
                Monday — Saturday
              </p>
              <p className="text-[#765e5a]">
                10:00 AM — 8:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="rounded-3xl bg-white p-7 shadow-xl md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none transition focus:border-[#a66b6b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none focus:border-[#a66b6b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none focus:border-[#a66b6b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="6"
                required
                className="w-full resize-none rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none focus:border-[#a66b6b]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#3b2927] py-4 font-semibold text-white transition hover:bg-[#a66b6b]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}