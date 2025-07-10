import React, { useState } from 'react';
import Home from '../../Home';

export function UploadCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setError('Please select a CSV file');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('http://localhost:5000/api/upload-csv', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Upload successful');
        setFile(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='justify-center items-center flex  ml-40'>
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload CSV File</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center items-center w-full">
                <label htmlFor="file-upload" className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-blue-200 border-dashed cursor-pointer hover:bg-blue-50 transition-colors">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <span className="mt-2 text-sm text-gray-600">
                    {file ? file.name : 'Click to select a CSV file or drag and drop'}
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading || !file}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : 'Upload CSV'}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{message}</p>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Note:</h3>
            <p className="text-sm text-gray-600">
              Please ensure your CSV file follows the required format. The file should contain columns for store ID, item ID, and other relevant data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
