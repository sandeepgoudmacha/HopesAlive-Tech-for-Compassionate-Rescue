import { BellIcon } from '@heroicons/react/24/outline';

const Notifications = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center py-8">
          <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600 font-medium">Coming Soon!</p>
          <p className="mt-2 text-gray-500">
            Notifications feature is under development. Soon you&apos;ll be able to:
          </p>
          <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-gray-600">
            <li>• Receive updates on incident status changes</li>
            <li>• Get alerts when volunteers are assigned</li>
            <li>• See important announcements</li>
            <li>• Track case progress notifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;