import React from 'react';
import { XCircle, CheckCircle, AlertCircle } from 'lucide-react';

const Alert = ({ type, message }) => {
  const icons = {
    error: <XCircle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  };

  const colors = {
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[type]} shadow-lg animate-slideIn`}>
      {icons[type]}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Alert;
