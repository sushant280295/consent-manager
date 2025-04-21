import React from 'react';
import { ConsentLog, ConsentCategory } from '../types/consent';
import { formatTimestamp } from '../utils/helpers';
import { History, Check, X } from 'lucide-react';

interface ConsentHistoryLogProps {
  logs: ConsentLog[];
  categories: ConsentCategory[];
}

export const ConsentHistoryLog: React.FC<ConsentHistoryLogProps> = ({ logs, categories }) => {
  // Sort logs by timestamp (newest first)
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };
  
  const getActionColor = (action: string) => {
    switch (action) {
      case 'grant':
        return 'text-green-600';
      case 'revoke':
        return 'text-red-600';
      case 'update':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const getActionIcon = (action: string, newState: boolean) => {
    if (action === 'grant' || newState === true) {
      return <Check size={16} className="text-green-600" />;
    } else {
      return <X size={16} className="text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center text-blue-800">
          <History size={18} className="mr-2" />
          Consent History
        </h3>
        <p className="text-sm text-blue-800">
          This log maintains a record of all consent-related activities, as required by the DPDP Act 2023.
        </p>
      </div>
      
      {sortedLogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <History size={36} className="mx-auto mb-3 opacity-50" />
          <p>No consent history available yet</p>
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getCategoryName(log.categoryId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`capitalize ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      {getActionIcon(log.action, log.newState)}
                      <span className="ml-2">
                        {log.newState ? 'Granted' : 'Denied'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <p>
          <strong>Note:</strong> Under the DPDP Act 2023, we are required to maintain records of consent actions. 
          This log is stored locally and helps demonstrate compliance with data protection regulations.
        </p>
      </div>
    </div>
  );
};