'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaCheck } from 'react-icons/fa';

export default function TrusteeSetup() {
  const [trustees, setTrustees] = useState<string[]>(['', '', '']);
  
  const handleChange = (index: number, value: string) => {
    const newTrustees = [...trustees];
    newTrustees[index] = value;
    setTrustees(newTrustees);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6 rounded-lg bg-gray-800 text-white"
    >
      <div className="flex items-center mb-6">
        <FaUserShield className="text-indigo-500 text-2xl mr-3" />
        <h2 className="text-xl font-bold">Setup Recovery Trustees</h2>
      </div>
      
      <p className="mb-6 text-gray-300">
        Enter email addresses of 3 trustees who can help recover your account if needed.
      </p>
      
      <div className="space-y-4">
        {trustees.map((trustee, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-1 border border-gray-600 rounded-lg px-4 py-3">
              <input
                type="email"
                placeholder={`Trustee ${index + 1} email`}
                value={trustee}
                onChange={(e) => handleChange(index, e.target.value)}
                className="bg-transparent w-full outline-none text-white"
              />
            </div>
            {trustee.includes('@') && (
              <FaCheck className="ml-3 text-green-400" />
            )}
          </div>
        ))}
        
        <button 
          className={`w-full py-3 rounded-lg font-medium transition-colors mt-6 ${
            trustees.every(t => t.includes('@')) 
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!trustees.every(t => t.includes('@'))}
        >
          Confirm Trustees
        </button>
      </div>
    </motion.div>
  );
}