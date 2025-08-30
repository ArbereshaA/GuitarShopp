import location from "../assets/location.png";
import Instagram from "../assets/Instagram.png";
import Facebook from "../assets/Facebook.png";
import Twitter from "../assets/Twitter.png";
import sms from "../assets/sms.png";
import Butterfly from "../assets/Butterfly.png";
export default function Footer() {
  return (
    <footer className="w-screen bg-gray-100 text-gray-800 py-10 m-0 pr-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
        <div className="px-4 md:px-8">
          <div className="flex items-center mb-4">
            <img src={Butterfly} className="mr-2"></img>
            <span className="text-xl font-semibold">VibeStrings</span>
          </div>
          <span className="text-sm flex items-center mb-2 ">
            <img src={sms} className="mr-2"></img> Enquiry@VibeStrings.com
          </span>
          <span className="text-sm flex items-center mb-2 ">
            <img src={location} className="mr-2"></img> San Francisco
          </span>
        </div>

        <div className="px-4 md:px-8 text-gray-800">
          <h4 className="font-bold mb-2">PAGES</h4>
          <ul className="space-y-1 text-sm ">
            <li className="text-gray-800">
              <a href="#" className="text-gray-400">
                Store
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400">
                Collections
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div className="px-4 md:px-8">
          <h4 className="font-bold mb-2">PRODUCT</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="text-gray-400">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400">
                Copyright
              </a>
            </li>
          </ul>
        </div>

        <div className="px-4 md:px-8">
          <h4 className="font-bold mb-2">FOLLOW US</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Facebook">
              <img src={Facebook} className="mr-2"></img>
            </a>
            <a href="#" aria-label="Twitter">
              <img src={Twitter} className="mr-2"></img>
            </a>
            <a href="#" aria-label="Instagram">
              <img src={Instagram} className="mr-2"></img>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        © 2022 Copyright VibeStrings
      </div>
    </footer>
  );
}
