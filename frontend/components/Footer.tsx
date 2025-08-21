import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";



export default function Footer() {
  return (
    <footer className="text-gray-900 bg-indigo-100">
      <div className=" px-6 py-12">
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-0 mx-10 md:justify-between md:items-start">
          <div>
            <Link href="/" className="text-[26px] hover:bg-gradient-to-r bg-gradient-to-tr from-red-600 via-indigo-200 to-indigo-500 text-transparent bg-clip-text font-bold hover:text-transparent transition-colors">
                SecureVault
            </Link>            
            <p className="text-sm w-80">
              Assign trusted friends or family as recovery contacts, so your
              assets are safe no matter what happens.
            </p>
          </div>

          <div>
            <h3 className=" text-gray-900/30 font-semibold mb-3">Learn more</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-indigo-400 text-base">Home</Link></li>
              <li><Link href="/signup" className="hover:text-indigo-400 text-base">Sign up</Link></li>
              <li><Link href="/signin" className="hover:text-indigo-400 text-base">Sign in</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 text-base">Contact</Link></li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h3 className="text-gray-900/30 font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-400 text-base">Docs</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 text-base">Features</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 text-base">Community</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 text-base">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900/30 font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-indigo-400 text-2xl">
                <FaSquareXTwitter />
              </Link>
              <Link href="#" className="hover:text-indigo-400 text-2xl">
                <FaYoutube />
              </Link>
              <Link href="#" className="hover:text-indigo-400 text-2xl">
                <FaSquareGithub />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-indigo-800 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} SecureVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
