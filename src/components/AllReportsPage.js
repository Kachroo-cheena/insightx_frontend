import React, { useState, useEffect } from 'react';
import { FaBars, FaCheckCircle, FaEllipsisV, FaFilter, FaDownload } from 'react-icons/fa';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useLogin } from '../context/LoginContext';

const AllReportsPage = () => {
  const navigate = useNavigate();
  const { jwtToken } = useLogin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchPatientName, setSearchPatientName] = useState('');
  const [error, setError] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]); // To dynamically set filter options

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://api.insightxai.in/reports', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }

        const data = await response.json();
        const uniqueStatuses = [...new Set(data.reports.map((report) => report.status))].map(
          (status) => ({ value: status, label: status })
        );

        setReportsData(data.reports);
        setStatusOptions(uniqueStatuses); // Set unique statuses for the filter
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (jwtToken) {
      fetchReports();
    }
  }, [jwtToken]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Pagination Logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);
  };

  const filteredReports = reportsData.filter((report) => {
    return (
      (selectedFilter ? report.status === selectedFilter.value : true) &&
      report.patientName.toLowerCase().includes(searchPatientName.toLowerCase())
    );
  });

  const paginatedReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <Drawer
        open={sidebarOpen}
        onClose={toggleSidebar}
        direction="left"
        style={{ background: "#1f2937" }}
        className="p-6 bg-gray-800 text-white w-64"
      >
        <button onClick={toggleSidebar} className="text-xl mb-4">Close Sidebar</button>
        <ul>
          <li className="mb-4 cursor-pointer" onClick={() => navigate('/reports')}>Reports</li>
          <li className="mb-4 cursor-pointer" onClick={() => navigate('/templates')}>Templates</li>
          {/* <li className="mb-4 cursor-pointer">Profile</li> */}
        </ul>
      </Drawer>

      <div className="flex-1 bg-gray-50 min-h-screen p-4 sm:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <button onClick={toggleSidebar} className="text-lg p-2">
              <FaBars />
            </button>
            <h1 className="text-2xl font-semibold">Reports</h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by Patient Name"
              className="border p-2 rounded-lg"
              value={searchPatientName}
              onChange={(e) => setSearchPatientName(e.target.value)}
            />
            <div className="flex items-center">
              {/* <FaFilter className="mr-2 text-gray-600" /> */}
              <Select
                value={selectedFilter}
                onChange={handleFilterChange}
                options={statusOptions} // Dynamic status filter options
                placeholder="Filter by Status"
                className="w-64"
              />
            </div>
          </div>
        </header>

        <section className="bg-white p-6 rounded-lg shadow">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-blue-800 text-white text-left">
                <th className="p-3">Patient ID</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Age/Sex</th>
                <th className="p-3">Location/Center</th>
                <th className="p-3">Report</th>
                <th className="p-3">Status</th>
                <th className="p-3">Doctor Name</th>
                <th className="p-3">Download</th>
                <th className="p-3">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.map((report, index) => (
                <tr key={index} onClick={() => navigate('/patient-details', { state: report._id })} className="cursor-pointer hover:bg-gray-100">
                  <td className="p-3 text-center">{report.id}</td>
                  <td className="p-3 text-center">{report.patientName}</td>
                  <td className="p-3 text-center">{report.age}/{report.gender}</td>
                  <td className="p-3 text-center">{report.location}</td>
                  <td className="p-3 text-center">{report.bodyPart}</td>
                  <td className="p-3 text-center">
                    <span className={`flex items-center justify-center ${report.status === 'Complete' ? 'text-green-600' : 'text-gray-600'}`}>
                      <FaCheckCircle className="mr-2" /> {report.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">{report.doctorName}</td>
                  <td className="p-3 text-center">
                    <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded-lg flex items-center">
                      <FaDownload className="mr-2" /> Download
                    </button>
                  </td>
                  <td className="p-3 text-center">{report.uploadTime}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <p>Page {currentPage} of {totalPages}</p>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllReportsPage;
