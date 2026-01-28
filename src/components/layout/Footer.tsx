import { Link } from "react-router-dom";
import { CreditCard, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">CredBud</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Empowering underbanked communities with AI-powered credit
              decisions. Fair, transparent, and accessible loans for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Apply for Loan", path: "/apply" },
                { name: "Bank Statistics", path: "/statistics" },
                { name: "Dashboard", path: "/dashboard" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                "How It Works",
                "FAQs",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <span className="text-background/70 hover:text-background transition-colors text-sm cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Mail className="w-4 h-4" />
                support@CredBud.com
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Phone className="w-4 h-4" />
                1-800-CREDIT-AI
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2024 CredBud. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-background/50 text-sm cursor-pointer hover:text-background/70">
              Privacy
            </span>
            <span className="text-background/50 text-sm cursor-pointer hover:text-background/70">
              Terms
            </span>
            <span className="text-background/50 text-sm cursor-pointer hover:text-background/70">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
