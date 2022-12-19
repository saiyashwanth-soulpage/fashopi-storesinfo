// Skip to content
// DEV Community 👩‍💻👨‍💻
// Search...

// Log in
// Create account

// 10
// Like
// 0
// Jump to Comments
// 8
// Save

// Cover image for Building a Modal Using ReactJS and TailwindCSS
// Ayush Agarwal
// Ayush Agarwal
// Posted on Feb 7 • Originally published at hashnode.com

// Building a Modal Using ReactJS and TailwindCSS
// #
// react
// #
// javascript
// #
// webdev
// Hello people, as developers, we frequently come across tasks to create forms. The general first thought that comes to our mind is to create a button or link that takes us to the form when clicked. But this way is too old school and makes an extra effort for the user to navigate. Curious to know another method. Yes, that is what "Modals" are.

// Instead of routing to a new page or tab, the form appears right on the same page. Still not clear, let's understand it with a snapshot of the final page we will be building today.

// Modal In Action -
// Frame 1.png

// When the button is clicked, we can observe the form comes right there instead of going to a new page.

// Now let's get into building this simple modal. I hope you ignore the CSS.

// Pre Requirements-
// Basic knowledge of HTML, CSS and ReactJS (specifically useState).
// Experience in using Tailwind CSS in ReactJS projects.
// Setup
// Setting Up ReactJS project
// Create a project directory. Let's say "modal."
// Open the terminal.
// Navigate to the modal directory and run the below command.
// npx create-react-app .
// Delete every file in src folder except for "App.js", "index.css", "index.js".
// Clear out App.js
// Bonus-1 - If you wish to avoid the above hassle, clone my ReactJS project boiler and do: "npm i".

// GitHub logo ayushhagarwal / ReactJS_Project_Boiler
// ReactJS_Project_Boiler
// Setting Up Tailwind CSS
// I have used Tailwind CSS official docs to write the steps on installing it into your ReactJS project. So you can refer directly to the site too.

// Here's how you can install Tailwind CSS -

// In the root directory of your project folder, run the below commands:
// npm install -D tailwinds postcss autoprefixer
// npx tailwindcss init
// Add the paths to all of your template files in your tailwind.config.js file. This is what the file looks like after adding them.
// module.exports = {
//       content: [ 
//       "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// } 
// Add the @tailwind directives for each of Tailwind's layers into the ./src/index.css file.
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
// That's it. Now the project is ready with both TailwindCSS and ReactJs. We can start coding our Modal.

// *Bonus-2 * - Instead of spending time on setting up ReactJS and TailwindCSS, you can clone the boiler repo from my Github. It is ready with all the setups and folder structure. Just clone, install and code.

// GitHub logo ayushhagarwal / ReactJS_Tailwind_Boiler
// This project is a boiler to start ReactJS and Tailwind project.
// Creating Modal Component
// Now comes the integral part of this blog. We will be creating a modal component and using it directly on App.js to render our modal.

// Create a file Modal.js in src/Components directory.
// Next, the code to get the Modal functionality working is :
// import React, { useState } from "react";


import React, { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Address
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      City
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;

// Understanding the Code Logic
// The code looks complex, right? Don't worry, I'll break the logic into simple terms and help you understand. So let's see step by step what is happening.

// In the useState hook :
// const [showModal, setShowModal] = useState(false);
// We have defined the initial state as showModal and the update function as setShowModal. This function will tell us if we intend to show the Modal or not.

// Next to the right side of =, we have defined the default value of the initial state, i.e., showModal as false.

// Next, we have a <button> tag. This button is to get to the form, so we have added a React onClick event. Whenever the user clicks the button, it will set the showModal to true using setShowModal.

// That's it. After that, we have a ternary condition that displays the form using TailwindCSS. If showModal is "true" the meaning button was clicked.

// The basic gist is if the showModal state is true, we have to display the form; otherwise, the Form is closed.

// At the end, we export the component to use it in App.js to render it on our page.

// Rendering Modal Component
// As we are very well aware of rendering a component in React, we have to import it in App.js. So we will do the same, with some basic CSS to the home page.
// import Modal from "./Components/Modal";
// const App = () => {
//   return (
//     <div className="App h-screen flex flex-col items-center justify-center bg-purple-200">
//       <Modal />
//     </div>
//   );
// };

// export default App;
// Launching the Application
// That's it; we have come to the end of creating a modal in React. To check. Our project just does npm start and voila!!.

// Conclusion
// Via this blog, I have tried my best to try and teach a small but valuable mini project in React. The link to the Github repo of the project is below:

// ReactJS Tailwind CSS Modal

// I would love to read your thoughts about the blog, so please comment below.

// Hope to meet you again in my next blog. Bubye 👋🏻

// Top comments (0)

// Subscribe
// pic
// Add to the discussion
// Code of Conduct • Report abuse
// Visualizing Promises and Async/Await 🤯
// async await

// ☝️ Check out this all-time classic DEV post

// Read next
// joseayram profile image
// AdventJS - Reto #1: ¡Automatizando envolver regalos de navidad!
// José Ayrám - Dec 10

// naubit profile image
// 5 Small and Hidden React libraries You Should Already Be Using
// Al - Naubit - Dec 4

// dnsinyukov profile image
// How To Integrate Google Calendar API with Laravel
// Denis Sinyukov - Dec 9

// hy_piyush profile image
// 5 Best Sites for FREE Web hosting
// 💡Piyush Kesarwani - Dec 9


// Ayush Agarwal
// Follow
// Frontend Developer at Amadeus Software Labs || Technical Blogger
// LOCATION
// Bangalore, India
// JOINED
// Jul 11, 2020
// More from Ayush Agarwal
// Hide Firebase API Keys in ReactJS Project using Environment Variables
// #firebase #codenewbie #react #javascript
// DIABYTICS - A simple application to keep track of your Diabetes Tests
// #react #tailwindcss #firebase #netlify
// Path To Become A Self Taught Programmer
// #devops #codenewbie #productivity #webdev
// import React, { useState } from "react";

// const Modal = () => {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <>
//       <button
//         className="bg-blue-200 text-black active:bg-blue-500 
//       font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//         Fill Details
//       </button>
//       {showModal ? (
//         <>
//           <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
//                   <h3 className="text-3xl font=semibold">General Info</h3>
//                   <button
//                     className="bg-transparent border-0 text-black float-right"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
//                       x
//                     </span>
//                   </button>
//                 </div>
//                 <div className="relative p-6 flex-auto">
//                   <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
//                     <label className="block text-black text-sm font-bold mb-1">
//                       First Name
//                     </label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
//                     <label className="block text-black text-sm font-bold mb-1">
//                       Last Name
//                     </label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
//                     <label className="block text-black text-sm font-bold mb-1">
//                       Address
//                     </label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
//                     <label className="block text-black text-sm font-bold mb-1">
//                       City
//                     </label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
//                   </form>
//                 </div>
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// };

// export default Modal;

// DEV Community 👩‍💻👨‍💻 — A constructive and inclusive social network for software developers. With you every step of your journey.

// Built on Forem — the open source software that powers DEV and other inclusive communities.

// Made with love and Ruby on Rails. DEV Community 👩‍💻👨‍💻 © 2016 - 2022.