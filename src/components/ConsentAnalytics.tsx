import React from 'react';
import { useConsent } from '../hooks/useConsent';
import { PieChart, BarChart, ChevronRight } from 'lucide-react';

export const ConsentAnalytics: React.FC = () => {
  const { categories, preferences, consentLogs } = useConsent();
  
  // Calculate consent metrics
  const totalCategories = categories.length;
  const acceptedCategories = preferences.filter(pref => pref.granted).length;
  const acceptanceRate = totalCategories > 0 ? (acceptedCategories / totalCategories) * 100 : 0;
  
  // Calculate category-specific acceptance rates
  const categoryStats = categories.map(category => {
    const isAccepted = preferences.find(p => p.categoryId === category.id)?.granted || false;
    return {
      id: category.id,
      name: category.name,
      accepted: isAccepted
    };
  });
  
  // Count logs by action type
  const actionCounts = {
    grant: consentLogs.filter(log => log.action === 'grant').length,
    revoke: consentLogs.filter(log => log.action === 'revoke').length,
    update: consentLogs.filter(log => log.action === 'update').length
  };
  
  // Get recent activity
  const recentActivity = [...consentLogs]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);
    
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <PieChart size={18} className="mr-2 text-blue-600" />
              Consent Overview
            </h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Acceptance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{acceptanceRate.toFixed(1)}%</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Categories Accepted</p>
                <p className="text-lg font-medium text-gray-900">{acceptedCategories} of {totalCategories}</p>
              </div>
            </div>
            
            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center relative">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray={`${acceptanceRate}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold text-blue-600">{acceptanceRate.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <BarChart size={18} className="mr-2 text-blue-600" />
              Consent Actions
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-xs text-green-800 mb-1">Granted</p>
                <p className="text-xl font-bold text-green-700">{actionCounts.grant}</p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-md">
                <p className="text-xs text-red-800 mb-1">Revoked</p>
                <p className="text-xl font-bold text-red-700">{actionCounts.revoke}</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-xs text-blue-800 mb-1">Updated</p>
                <p className="text-xl font-bold text-blue-700">{actionCounts.update}</p>
              </div>
            </div>
            
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full">
              <div className="h-full bg-green-500" style={{ width: `${actionCounts.grant / (actionCounts.grant + actionCounts.revoke + actionCounts.update) * 100}%`, float: 'left' }}></div>
              <div className="h-full bg-red-500" style={{ width: `${actionCounts.revoke / (actionCounts.grant + actionCounts.revoke + actionCounts.update) * 100}%`, float: 'left' }}></div>
              <div className="h-full bg-blue-500" style={{ width: `${actionCounts.update / (actionCounts.grant + actionCounts.revoke + actionCounts.update) * 100}%`, float: 'left' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categoryStats.map(stat => (
          <div key={stat.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">{stat.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.accepted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.accepted ? 'Accepted' : 'Rejected'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Consent Activity</h3>
        
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {getCategoryName(activity.categoryId)} - <span className={`${
                      activity.action === 'grant' 
                        ? 'text-green-600' 
                        : activity.action === 'revoke'
                          ? 'text-red-600'
                          : 'text-blue-600'
                    }`}>
                      {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm py-4 text-center">No recent activity</p>
        )}
      </div>
    </div>
  );
};