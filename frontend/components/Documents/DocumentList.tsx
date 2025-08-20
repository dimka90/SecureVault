import { FaFile, FaTrash, FaDownload, FaLink } from 'react-icons/fa';

const documents = [
  { id: '1', name: 'Passport.pdf', date: '2023-08-15', cid: 'QmXyz...' },
  { id: '2', name: 'Contract.docx', date: '2023-08-10', cid: 'QmAbc...' },
];

export default function DocumentList() {
  return (
    <div 
      className="max-w-6xl mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <h2 className="text-xl font-bold mb-6">Your Documents</h2>
      
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <FaFile className="text-indigo-400 mr-3 text-xl" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-400">{doc.date}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                title="View CID"
              >
                <FaLink />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                title="Download"
              >
                <FaDownload />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}