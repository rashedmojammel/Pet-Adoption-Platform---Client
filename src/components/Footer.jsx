import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Top band */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-4">
            <h2
              className="text-4xl font-bold text-white mb-4 tracking-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              PetNest
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              A loving place for pets and pet parents. Discover trusted care,
              adoption, grooming, and everything your furry friends need.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {["🐾", "📷", "💬"].map((icon) => (
                <button
                  key={icon}
                  className="w-9 h-9 border border-gray-700 text-gray-400 hover:text-white hover:border-cyan-500 text-sm flex items-center justify-center transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                "Home",
                "Adopt Pets",
                "Pet Care",
                "Shop",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms & Conditions",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-white text-xs tracking-[0.2em] uppercase font-semibold mb-5">
              Newsletter
            </h3>

            <p className="text-sm mb-4 leading-relaxed">
              Get pet care tips, adoption updates, and special offers delivered
              to your inbox.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-gray-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />

              <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-3 text-lg transition-colors flex-shrink-0">
                ↗
              </button>
            </div>

            <div className="mt-6 text-sm space-y-1.5">
              <p className="text-gray-500">+880 1234 567 890</p>
              <p className="text-gray-500">support@petnest.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-gray-600">
          © 2026 PetNest. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;