import React from 'react';

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6 ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {Icon && <Icon className="size-5 text-pink-700" />}
      </div>
      <input {...props} className="input input-bordered focus:border-pink-700 w-full max-w-xs pl-10" />
    </div>
  );
};

export default Input;
