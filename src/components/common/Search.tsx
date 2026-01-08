import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchProps {
  onSearchJob: (value: string) => void;
  onSearchLocation: (value: string) => void;
  placeholderJob?: string;
  placeholderLocation?: string;
  className?: string;
}

const Search = ({ onSearchJob, onSearchLocation }: SearchProps) => {
  const [jobTerm, setJobTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  // Debounce cho cả hai giá trị
  const debouncedJob = useDebounce(jobTerm, 500);
  const debouncedLocation = useDebounce(locationTerm, 500);

  useEffect(() => {
    onSearchJob(debouncedJob);
  }, [debouncedJob, onSearchJob]);

  useEffect(() => {
    onSearchLocation(debouncedLocation);
  }, [debouncedLocation, onSearchLocation]);

  return (
    <div className="flex items-center w-full bg-white rounded-full overflow-hidden">
      
      {/* 1. Phần nhập Tên công việc */}
      <div className="flex-[1.5] flex items-center px-6">
        <input
          type="text"
          value={jobTerm}
          onChange={(e) => setJobTerm(e.target.value)}
          placeholder="Tìm việc ngay"
          className="w-full py-3 outline-none text-gray-700 placeholder-gray-400 font-medium"
        />
      </div>

      {/* 2. Thanh phân cách dọc */}
      <div className="w-[1.5px] h-8 bg-gray-300"></div>

      {/* 3. Phần nhập Địa điểm */}
      <div className="flex-1 flex items-center px-6 relative">
        <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 mr-3" />
        <input
          type="text"
          value={locationTerm}
          onChange={(e) => setLocationTerm(e.target.value)}
          placeholder="Địa điểm"
          className="w-full py-3 outline-none text-gray-700 placeholder-gray-400 font-medium"
        />
        {/* Biểu tượng kính lúp tìm kiếm ở cuối cùng */}
        <FontAwesomeIcon 
            icon={faSearch} 
            className="text-gray-500 ml-2 cursor-pointer hover:text-blue-600 transition-colors" 
        />
      </div>

    </div>
  );
};

export default Search;