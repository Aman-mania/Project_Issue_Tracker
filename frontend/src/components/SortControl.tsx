import React from 'react';

interface SortControlProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

const SortControl: React.FC<SortControlProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="sort-control">
      <label>Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value, sortOrder)}
      >
        <option value="createdAt">Creation Date</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
        <option value="priority">Priority</option>
        <option value="updatedAt">Last Updated</option>
      </select>
      
      <button
        className={`sort-direction ${sortOrder === 'asc' ? 'active' : ''}`}
        onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default SortControl;