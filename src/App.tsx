// App.tsx

import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import Forest from './header-image.jpg';

const App: React.FC = () => {
  return (
    <div> 
    <link rel="stylesheet" href="./App.css"/>
    <div>
      <header>

        {/* <div className='image-container'> */}
        {/* <img className='header-image'src='data:image/jpeg;base64,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'/>
        </div> */}
 
      </header>
      <body>
      <div className="grid grid-cols-4">
        <div className='col-span-2'>
        <h1 > Gaea Solutions</h1>
        </div>
        <div className='justify-end'>
        <nav >
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
        </nav>  
      </div>
        </div>
      <div className='image-container max-h-80'>
      <div className="max-h-full">
        <img  src={Forest}></img>
        <h1 className="text-3xl font-bold text-overlay">
      Hello world!
    </h1>
    </div>

      </div>
      <div className="about-container grid grid-cols-2">
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
    <MapComponent/>
    <footer></footer>
    </body>
    </div>
    </div>
  );
};

export default App;