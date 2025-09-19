import React from "react";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone: number;
    role: string;
    image?: string;
    countryCode: string;
    isActive: boolean;
    isBlocked: boolean;
  } | null;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ isOpen, onClose, user }) => {


  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          User Details
        </h2>

        {/* User image */}
        {user.image && (
          <div className="flex justify-center mb-4">
            <img
              src={user.image}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        )}

        {/* User fields */}
        <div className="space-y-2 text-gray-700 dark:text-gray-200">
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Phone:</span> {user.countryCode}{user.phone}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
          <p>
            <span className="font-medium">Active:</span>{" "}
            {user.isActive ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Blocked:</span>{" "}
            {user.isBlocked ? "Yes" : "No"}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
