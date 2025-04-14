import React from 'react';
import { IssueStatus } from '../types';

interface StatusFilterProps {
  currentStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="status-filter">
      <h3>Filter by Status</h3>
      <div className="filter-options">
        <button
          className={currentStatus === null ? 'active' : ''}
          onClick={() => onStatusChange(null)}
        >
          All
        </button>
        {Object.values(IssueStatus).map((status) => (
          <button
            key={status}
            className={currentStatus === status ? 'active' : ''}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;