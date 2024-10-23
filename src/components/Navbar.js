import { Menu } from '@headlessui/react';
import { FaBell, FaChevronDown, FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useSelectedID } from '../context/SelectedIDContext';  // Import the custom hook
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const { selectedID } = useSelectedID();  // Get the selected ID from context
  const navigate = useNavigate();

  // Dynamically set page heading based on the route
  const getPageHeading = () => {
    switch (location.pathname) {
      case '/dashboard':
        return '';
      case '/reports':
        return '';
      case '/settings':
        return '';
      default:
        return '';  // Default page heading
    }
  };

  return (
    <nav className="bg-white shadow-lg py-4 px-6 flex justify-between items-center z-30">
      {/* Left Section: Logo */}
      <div className="flex items-center cursor-pointer" onClick={()=>{
        navigate("/reports")
      }}>
        <img src="/images/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <span className="font-bold text-xl text-gray-800">InsightX</span>
        <span className="mx-4">{getPageHeading()}</span>
        {selectedID && (
          <span className="text-gray-500 ml-4">ID: {selectedID}</span>  
        )}
      </div>

      {/* Right Section: Icons and Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        {/* <FaBell className="h-6 w-6 text-gray-600 cursor-pointer" /> */}

        {/* Profile Dropdown */}
        <Menu as="div" className="relative inline-block text-left z-30">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700">
              <FaUserCircle className="h-6 w-6 text-gray-600" />
              <FaChevronDown className="ml-2 -mr-1 h-5 w-5 text-gray-500" />
            </Menu.Button>
          </div>

          {/* Dropdown Menu */}
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/login"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Logout
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}
