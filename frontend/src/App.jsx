import { useState } from "react";import {
  Printer, Home, Images, Calculator,
  CalendarDays, Phone, Menu
} from "lucide-react";
import "./App.css";

function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(8);
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    address: "",
    date: ""
  });

  const area = Math.max(0, Number(width)) *
               Math.max(0, Number(height));
  const total = area * 400;

  const handleBooking = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: booking.name,
        phone: booking.phone,
        address: booking.address,
        date: booking.date,
        width: Number(width),
        height: Number(height)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Booking failed");
    }

    alert(
      `TRIOLUX Booking Successful!\n` +
      `Booking ID: ${data.booking.id}\n` +
      `Total Price: ₹${Number(data.booking.total_price).toLocaleString("en-IN")}`
    );

    setBooking({
      name: "",
      phone: "",
      address: "",
      date: ""
    });

  } catch (error) {
    alert("Booking failed: " + error.message);
  }
};

  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <Printer size={28} />
          <span>TRIOLUX</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#pricing">Pricing</a>
          <a href="#booking">Book Now</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">PREMIUM WALL PRINTING</span>
          <h1>
            Transform Your Walls
            <span> Into Masterpieces</span>
          </h1>
          <p>
            TRIOLUX Wall Printer brings your imagination
            to life with beautiful, high-quality wall
            printing for homes, offices and businesses.
          </p>
          <a href="#booking" className="btn">
            Book Wall Printing
          </a>
        </div>
      </section>

      <section className="section" id="services">
        <h2>Our Wall Printing Services</h2>
        <p className="subtitle">
          Creative printing solutions for every space
        </p>

        <div className="cards">
          <div className="card">
            <Home size={34} />
            <h3>Home Wall Printing</h3>
            <p>
              Beautiful customized wall designs for
              bedrooms, living rooms and children's rooms.
            </p>
          </div>

          <div className="card">
            <Printer size={34} />
            <h3>Commercial Printing</h3>
            <p>
              Professional wall branding for offices,
              restaurants, showrooms and retail stores.
            </p>
          </div>

          <div className="card">
            <Images size={34} />
            <h3>Custom Wall Art</h3>
            <p>
              Bring your favorite artwork, photos and
              creative designs directly onto your walls.
            </p>
          </div>
        </div>
      </section>

      <section className="section gallery" id="gallery">
        <h2>Our Wall Printing Gallery</h2>
        <p className="subtitle">
          Explore creative wall printing possibilities
        </p>

        <div className="gallery-grid">
          <img src="/images/wall1.jpg" alt="Living room wall art" />
          <img src="/images/wall2.jpg" alt="Custom wall printing" />
          <img src="/images/wall3.jpg" alt="Office wall printing" />
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <Calculator size={36} />
        <h2>Wall Printing Price Calculator</h2>
        <p className="subtitle">
          Transparent pricing at ₹400 per square foot
        </p>

        <div className="calculator">
          <div className="input-row">
            <label>
              Wall Width (feet)
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </label>

            <label>
              Wall Height (feet)
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>

          <div className="result">
            <p>Wall Area: {area.toFixed(2)} sq. ft.</p>
            <p>Price per sq. ft.: ₹400</p>
            <h3>
              Estimated Total: ₹{total.toLocaleString("en-IN")}
            </h3>
          </div>
        </div>
      </section>

      <section className="section" id="booking">
        <h2>Book Your Wall Printing</h2>
        <p className="subtitle">
          Share your details and request a wall printing service
        </p>

        <form className="booking-form" onSubmit={handleBooking}>
          <input
            required
            placeholder="Full Name"
            value={booking.name}
            onChange={(e) =>
              setBooking({ ...booking, name: e.target.value })
            }
          />

          <input
            required
            type="tel"
            placeholder="Mobile Number"
            value={booking.phone}
            onChange={(e) =>
              setBooking({ ...booking, phone: e.target.value })
            }
          />

          <textarea
            required
            placeholder="Wall Printing Address"
            value={booking.address}
            onChange={(e) =>
              setBooking({ ...booking, address: e.target.value })
            }
          />

          <input
            required
            type="date"
            value={booking.date}
            onChange={(e) =>
              setBooking({ ...booking, date: e.target.value })
            }
          />

          <button className="btn" type="submit">
            Submit Booking Request
          </button>
        </form>
      </section>

      <footer>
        <h3>TRIOLUX WALL PRINTER</h3>
        <p>Transforming ordinary walls into extraordinary art.</p>
        <p>Wall Printing Starting at ₹400/sq. ft.</p>
        <p>© 2026 TRIOLUX. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
