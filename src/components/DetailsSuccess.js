import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV, FaChevronLeft, FaBars, FaList } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './Loading.css';
import templatesData from './templates.json'; // Import dummy templates
import { useLogin } from '../context/LoginContext'; // Import Login context

// Convert an image URL to a File object (necessary for API)
const urlToFile = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  return file;
};

// Component for displaying X-Ray images and model prediction
const XRayFiles = ({ xrayFiles }) => {
  const [predictions, setPredictions] = useState({});
  const [loadingPredictions, setLoadingPredictions] = useState({});
  const { jwtToken } = useLogin(); // Get JWT token from Login context

  // Function to handle prediction API call
  const handlePrediction = async (imageUrl, index) => {
    const file = await urlToFile(imageUrl);

    const formData = new FormData();
    formData.append('image', file);

    setLoadingPredictions((prev) => ({ ...prev, [index]: true }));
    
    try {
      const response = await fetch('https://xray-backend-196i.onrender.com/predict', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Add JWT token in Authorization header
        },
        body: formData,
      });

      const data = await response.json();
      
      // Update the predictions for this specific image
      setPredictions((prev) => ({
        ...prev,
        [index]: {
          class_name: data.class_name.split(" ").slice(1,),
          confidence_score: parseFloat(data.confidence_score).toFixed(3) * 100,
        },
      }));
    } catch (error) {
      console.error('Error uploading the image', error);
      setPredictions((prev) => ({
        ...prev,
        [index]: {
          class_name: 'Error in prediction',
          confidence_score: 0,
        },
      }));
    } finally {
      setLoadingPredictions((prev) => ({ ...prev, [index]: false }));
    }
  };

  useEffect(() => {
    // Automatically make predictions for each X-ray file
    xrayFiles.forEach((file, index) => {
      if (file.imageUrl) {
        handlePrediction(file.imageUrl, index); // Trigger prediction
      }
    });
  }, [xrayFiles]);

  return (
    <section className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">X-Ray File Upload</h2>
      <div className="grid grid-cols-3 gap-6">
        {xrayFiles.map((file, index) => (
          <div key={index} className="text-center">
            {file.imageUrl ? (
              <img src={file.imageUrl} alt="X-Ray" className="w-full h-48 object-cover mb-4" />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-4">
                <FaList className="text-3xl text-gray-400" />
              </div>
            )}
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">View File</button>
            <input type="text" placeholder="Side of X-ray" className="mt-2 w-full p-2 border rounded-lg" />
            
            {/* Model Prediction Section */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-blue-700">Model Prediction:</h4>
              {loadingPredictions[index] ? (
                <p className="text-gray-600">Loading...</p>
              ) : (
                predictions[index] && (
                  <>
                    <p><strong>Class Name:</strong> {predictions[index].class_name}</p>
                    <p><strong>Confidence Score:</strong> {predictions[index].confidence_score}%</p>
                  </>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PatientHistory = ({ history }) => (
  <section className="bg-white p-6 rounded-lg shadow mb-6">
    <h2 className="text-xl font-bold mb-4">Patient's History</h2>
    <input type="text" value={history} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100 mb-6" />
  </section>
);

const PatientDetails = ({ patientData }) => (
  <section className="bg-white p-6 rounded-lg shadow mb-6">
    <h2 className="text-xl font-bold mb-4">Patient Details</h2>
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block font-semibold">Reference Patient ID</label>
        <input type="text" value={patientData.referencePatientId} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
      </div>
      <div>
        <label className="block font-semibold">Patient Name</label>
        <input type="text" value={patientData.patientName} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
      </div>
      <div>
        <label className="block font-semibold">First Name <span className="text-red-600">*</span></label>
        <input type="text" value={patientData.firstName} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
      </div>
      <div>
        <label className="block font-semibold">Gender</label>
        <input type="text" value={patientData.gender} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
      </div>
      <div>
        <label className="block font-semibold">Age</label>
        <input type="text" value={patientData.age} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
      </div>
      <div>
        <label className="block font-semibold">Upload Time</label>
        <input type="text" value={patientData.uploadTime} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        <p className="text-sm text-gray-500 mt-1">{patientData.timezone}</p>
      </div>
      <div>
        <label className="block font-semibold">Location</label>
        <input type="text" value={patientData.location} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
      </div>
      <div>
        <label className="block font-semibold">Body Part</label>
        <input type="text" value={patientData.bodyPart} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        <div className="flex items-center mt-2">
          <input type="checkbox" checked={patientData.isChest} readOnly className="mr-2" />
          <span>Is Chest</span>
        </div>
      </div>
    </div>
  </section>
);

const PendingFeedback = ({ status, feedback, isEditable }) => (
  (status === 'Pending' || isEditable) && (
    <section className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold">Transaction Status <span className="text-red-600">*</span></label>
          <select value={status} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100">
            <option>Need More Info</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Doctor's Feedback <span className="text-red-600">*</span></label>
          <textarea value={feedback} readOnly={!isEditable} className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
        </div>
      </div>
    </section>
  )
);

const ReportTemplate = ({ reportTemplate, findings, impression, isEditable, setSelectedTemplate, selectedTemplate }) => (
  <section className="bg-white p-6 rounded-lg shadow mb-6">
    <h3 className="font-semibold mb-2">Report Template</h3>
    
    {isEditable ? (
      <select
        value={selectedTemplate?.heading || ''}
        onChange={(e) => {
          const selected = templatesData.find(t => t.heading === e.target.value);
          setSelectedTemplate(selected);
        }}
        className="mt-1 w-full p-2 border rounded-lg bg-gray-100"
      >
        <option value="">Select a template</option>
        {templatesData.map((template, index) => (
          <option key={index} value={template.heading}>
            {template.heading}
          </option>
        ))}
      </select>
    ) : (
      <input type="text" value={reportTemplate} readOnly className="mt-1 w-full p-2 border rounded-lg bg-gray-100" />
    )}

    <div className="p-4 bg-gray-100 rounded-lg">
      <h4 className="font-bold">Findings:</h4>
      {isEditable && selectedTemplate
        ? selectedTemplate.findings.map((finding, index) => <p key={index}>{finding}</p>)
        : findings.map((finding, index) => <p key={index}>{finding}</p>)}

      <h4 className="font-bold mt-4">Impression:</h4>
      {isEditable && selectedTemplate ? <p>{selectedTemplate.impression}</p> : <p>{impression}</p>}
    </div>
  </section>
);

const PatientDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reportId = location.state; // Get report ID from location.state
  const { jwtToken } = useLogin(); // Get JWT token from Login context
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false); // Editable state
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Selected template from dropdown
  const [patientData, setPatientData] = useState(null); // State to hold fetched report data

  // Fetch report data by ID
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(`https://34.234.93.29/report/${reportId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Add JWT token in Authorization header
          },
        });
        const data = await response.json();
        setPatientData(data.report); // Set fetched report data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    if (reportId) {
      fetchReportData(); // Fetch report data when reportId is available
    }
  }, [reportId, jwtToken]);

  // PUT request to update report data
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://34.234.93.29/report/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`, // Add JWT token in Authorization header
        },
        body: JSON.stringify(patientData), // Send updated report data
      });

      if (response.ok) {
        setLoading(false);
        window.location.reload(); // Refresh page after saving
      } else {
        console.error('Failed to update report');
      }
    } catch (error) {
      console.error('Error updating report:', error);
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Drawer
        open={sidebarOpen}
        onClose={toggleSidebar}
        direction="left"
        className="p-6 bg-gray-800 text-white w-64"
      >
        <button onClick={toggleSidebar} className="text-xl mb-4">Close Sidebar</button>
        <ul>
          <li className="mb-4 cursor-pointer" onClick={() => navigate('/reports')}>Reports</li>
          <li className="mb-4 cursor-pointer" onClick={() => navigate('/templates')}>Templates</li>
        </ul>
      </Drawer>

      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-lg p-2 mr-3 md:hidden"><FaBars /></button>
            <button onClick={() => navigate('/reports')} className="text-lg p-2 mr-3"><FaChevronLeft /></button>
            <h1 className="text-2xl font-semibold">{patientData.id}</h1>
            <span className={`ml-4 ${patientData.status === 'Complete' ? 'text-green-600' : 'text-blue-600'} flex items-center`}>
              <FaCheckCircle className="mr-2" /> {patientData.status}
            </span>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => navigate('/reports')} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">Go to Reports List</button>
            {patientData.status === 'Complete' && !isEditingTemplate ? (
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => setIsEditingTemplate(true)}>
                Submit For Revision
              </button>
            ) : (
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleSave}>
                Save
              </button>
            )}
            <button className="text-gray-700 p-2"><FaEllipsisV /></button>
          </div>
        </header>

        <PatientDetails patientData={patientData} />
        <PatientHistory history={patientData.history} />
        <XRayFiles xrayFiles={patientData.xrayFiles} /> {/* Display X-Ray images */}

        <ReportTemplate
          reportTemplate={patientData.reportTemplate}
          findings={patientData.findings}
          impression={patientData.impression}
          isEditable={isEditingTemplate}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />

        {patientData.status === 'Pending' && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <p className="text-red-600 font-semibold">
              Doctor has <span className="font-bold">asked for more information for this XRay</span>. Please add necessary details and submit it back to the doctor.
            </p>
          </div>
        )}
        <PendingFeedback status={patientData.status} feedback={patientData.doctor_feedback} isEditable={isEditingTemplate} />
      </div>
    </div>
  );
};

export default PatientDetailsPage;
