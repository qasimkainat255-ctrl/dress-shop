import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-[#fffaf7] text-[#3b2927]">

      {/* HEADER */}
      <section className="bg-[#f7eae6] px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#a66b6b]">
          Our Story
        </p>

        <h1 className="mt-4 font-serif text-5xl md:text-7xl">
          About Dress Shop
        </h1>

        <p className="mx-auto mt-6 max-w-2xl leading-7 text-[#765e5a]">
          Where timeless fashion meets modern elegance.
        </p>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 lg:px-10">

        <div className="overflow-hidden rounded-[30px_30px_150px_150px]">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
            alt="Fashion"
            className="h-[600px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#a66b6b]">
            Who We Are
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Fashion that makes you feel beautiful.
          </h2>

          <p className="mt-6 leading-8 text-[#765e5a]">
            Dress Shop was created with one simple idea — every woman
            deserves to feel confident, beautiful and comfortable in what
            she wears.
          </p>

          <p className="mt-5 leading-8 text-[#765e5a]">
            From elegant evening dresses to effortless everyday looks,
            we carefully select pieces that combine quality, comfort and
            timeless style.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-[#3b2927] px-8 py-4 font-semibold text-white transition hover:bg-[#a66b6b]"
          >
            Explore Our Collection
          </Link>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#f7efeb] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#a66b6b]">
              What Matters To Us
            </p>

            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Our Values
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Quality",
                text: "Beautiful pieces selected with attention to fabric, details and finishing.",
              },
              {
                title: "Elegance",
                text: "Styles that feel modern today while remaining timeless tomorrow.",
              },
              {
                title: "You",
                text: "Your confidence and happiness will always be at the heart of our brand.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-10 text-center shadow-sm"
              >
                <h3 className="font-serif text-3xl">
                  {item.title}
                </h3>

                <p className="mt-5 leading-7 text-[#765e5a]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="font-serif text-4xl md:text-5xl">
          Ready to find your next favorite dress?
        </h2>

        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-[#3b2927] px-10 py-4 font-semibold text-white hover:bg-[#a66b6b]"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}