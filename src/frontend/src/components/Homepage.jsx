import React from 'react';

const Homepage = () => {
  return (
    <main 
      className="flex flex-col items-start justify-center text-left p-10 font-inter h-screen"
      
    >
      <h1 className="text-cyan-800 text-3xl font-bold mb-4">Ello Fullstack Challenge</h1>
      <h1 className="text-cyan-800 text-2xl font-semibold mb-4">David Kipkemoi - Full Stack Engineer.</h1>
      <p className="text-lg text-gray-700">
        Ello is your child’s read-along companion who listens, teaches,<br /> 
        and transforms them into an enthusiastic reader. <br />For Kindergarten 
        to 3rd Grade.
      </p>
    </main>
  );
};

export default Homepage;
