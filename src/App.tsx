// App.tsx

import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import Forest from './header-image.jpg';
const Sections : string[] = ["Home", "About", "Services", "Contact"];
const App: React.FC = () => {
  return (
    <div> 
    <div>
      <header>
      </header>
      <body>
      <div className="py-5 px-5 h-14">
        <nav>
        { Sections.map( section => (
            <a href={section} className='hover:font-bold p-4'> {section} </a>
          )
        )
        }
        </nav>  
    </div>
      <div className='p-96 landing-page text-center grid grid-col-3'>
        <div className='col-span-1'></div>
        <div>
        <p className=' p-6 text-7xl'> Henry Maher </p>
        </div>
        
      </div>
      <div className="about-container grid grid-cols-2 ">
        <div>
          <p>This is the left side of the about me section.</p>
        </div>
        <div>
          <br></br>
          <h1>this is filler text</h1>
          <div className='flex sub-cols-subgrid gap-4'>
          <h1> foo</h1>
          <h1> foo</h1>
          <h1> foo</h1>
          <h1> foo</h1>
          </div>
        </div>
      </div>
    <h6>projects</h6>
    <div>
    <div className="grid grid-cols-3">
    <div className="container ">
        <p>
          this a real time flood map of the UK
        </p>
    </div>
    <div className=" container col-span-2">
    <MapComponent/>
    </div>
    </div>
    </div>
    <footer></footer>
    </body>
    </div>
    </div>
  );
};

export default App;