export const Button = (props) => {
   return (
      <div
         onClick={props.onClick}
         className={`flex items-center justify-between m-3 p-2 rounded-lg group cursor-pointer
        ${props.isActive
               ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
               : 'text-gray-300 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
      >
        <span className="flex">
            <svg
            className={`shrink-0 w-5 h-5 transition duration-75 
          ${props.isActive
                  ? 'text-white'
                  : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
               }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
         >
            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
         </svg>

         <button className="ms-3 whitespace-nowrap font-bold">{props.Label}</button>
        </span>

        <span>
             <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" fill="none" width="24" height="24" />
            <g>
               <path d="M17.91 14c-.478 2.833-2.943 5-5.91 5-3.308 0-6-2.692-6-6s2.692-6 6-6h2.172l-2.086 2.086L13.5 10.5 18 6l-4.5-4.5-1.414 1.414L14.172 5H12c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.08 0 7.438-3.055 7.93-7h-2.02z" />
            </g>
           </svg>
        </span>

      </div>
   );
};
