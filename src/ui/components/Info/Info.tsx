import Instagram from "../../../assets/icon/Instagram.tsx";

export const Info = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-10">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Where to Find Us</h2>

        <div className="space-y-6 text-secondary">
          <div>
            <p className="font-medium text">Moscow, Tverskaya 15</p>
            <p className="text-sm">Nuard Boutique</p>
            <p className="text-sm mt-1">Mon–Sat: 10:00–20:00</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="font-medium">Saint Petersburg, Nevsky 40</p>
            <p className="text-sm">Art Market Store</p>
            <p className="text-sm mt-1">Tue–Sun: 11:00–19:00</p>
            <a
              href="https://www.instagram.com/nuardceramics/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-4 hover:text-primary transition text-sm"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
        <form className="bg-white/5 backdrop-blur-md p-6 rounded-xl space-y-4 shadow-inner text-secondary">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Your email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-1">
              Message
            </label>
            <textarea
              id="message"
              required
              placeholder="Your message..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-primary hover:bg-accent transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
