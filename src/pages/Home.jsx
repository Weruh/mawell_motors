import { Link } from "react-router-dom";
import heroImage from "../assets/homeimage2.png";

function Home() {
  return (
    <main className="w-full font-sans">

      {/* Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-content {
          animation: slideUp 1.2s ease-out forwards;
        }

        .hero-button {
          transition: all 0.25s ease;
        }

        .hero-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative flex min-h-[600px] h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden">

        {/* Background Image */}
        <img
          src={heroImage}
          alt="Mawel Motors vehicles"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/50" />

        {/* Center Container */}
        <div className="absolute left-1/2 top-1/2 w-[90%] max-w-[900px] -translate-x-1/2 -translate-y-1/2 text-center">

          {/* Animated Content */}
          <div className="hero-content p-10 opacity-0 text-white">

            {/* Small Heading */}
            <p className="mb-[18px] text-[15px] font-semibold uppercase tracking-[3px] text-[#C1E8FF] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Welcome to Mawel Motors
            </p>

            {/* Main Heading */}
            <h1 className="m-0 text-[clamp(48px,7vw,88px)] font-extrabold leading-none tracking-[-3px] text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
              Find Your
              <br />
              <span className="text-[#C1E8FF]">
                Dream Car
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-[25px] max-w-[570px] text-[18px] leading-[1.6] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Find quality cars at fair prices.
              <br />
              Choose the car that is right for you.
            </p>

            {/* Button */}
            <Link
              to="/dealership"
              className="hero-button mt-[30px] inline-flex items-center justify-center rounded-[7px] bg-[#C1E8FF] px-[30px] py-[14px] text-[16px] font-bold text-gray-900 no-underline shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
            >
              View Cars
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;