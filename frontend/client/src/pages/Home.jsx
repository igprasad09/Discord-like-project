import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import axios from 'axios';

function Home() {
  const [room_names, setRoomNames] = useState([]);
  const [serchInput, setSearchInput] = useState('');
  const [all_Messages, setAllMessages] = useState();
  const [room, setRoom] = useState('godl');
  const [msgInput, setMsgInput] = useState('');

  useEffect(() => {
    axios.get("https://discord-like-project.onrender.com/api/v1/getrooms")
      .then((res) => {
        setRoomNames(res.data.roomNames);
      });

    axios.get("https://discord-like-project.onrender.com/api/v1/getmsgs", {
      headers: { room_name: room },
    }).then((res) => {
      setAllMessages(res.data.message)
    });
  }, []);

  const filteredRoomNames = room_names.filter((name) =>
    name.toLowerCase().startsWith(serchInput.toLowerCase())
  );

  async function handle_createRoom() {
    const name = prompt("Enter Room Name: ");
    try {
      axios.post("https://discord-like-project.onrender.com/api/v1/create-room", {
        room_name: name
      }).then((res) => {
        alert(res.data.message);
        axios.get("https://discord-like-project.onrender.com/api/v1/getrooms")
      .then((res) => {
        setRoomNames(res.data.roomNames);
      });
      }).catch((err) => {
        alert(err);
      })
    } catch (err) {
      alert(err);
    }
  }

  async function get_roomName(event) {
    try {
      setRoom(event);

      const res = await axios.get("https://discord-like-project.onrender.com/api/v1/getmsgs", {
        headers: { room_name: event },
      });

      setAllMessages(res.data.message);

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }


  async function handle_msgInput(e) {
    e.preventDefault();
    await axios.post(
      "https://discord-like-project.onrender.com/api/v1/addmsg",
      msgInput, // send raw text only
      {
        headers: {
          "Content-Type": "text/plain", // inform backend it is raw text
          room_name: room
        }
      }
    );
    get_roomName(room);
    setMsgInput('');
  }

  return (
    <div className=" grid grid-cols-5 w-screen h-screen">
      <div className="h-full col-span-1 bg-gray-800 border-r-1 overflow-x-scroll">

        <span className=''>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(e) => setSearchInput(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Room..." required />
          </div>
          <button onClick={handle_createRoom} type="button" className="text-white w-full mt-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Room</button>
        </span>


        {room_names ? (
          filteredRoomNames.map((element, index) => (
            <Button
              onClick={() => get_roomName(element)}
              Label={element}
              key={index}
              isActive={element === room}
            />
          ))
        ) : (
          <div className="text-white">loading........</div>
        )}


      </div>



      <div className="flex flex-col col-span-4 h-screen w-full bg-gray-700 ">
        {/* Message area - scrollable */}
        <div className="flex-1 overflow-y-auto  p-2">
          {all_Messages ?
            all_Messages.map((element, index) => (

              <div className="flex items-start gap-2.5" key={index}>
                <img className="w-8 h-8 rounded-full" src="https://wallpapers.com/images/featured/funny-facebook-profile-pictures-nghrweqjmsbdt69s.jpg" alt="Jese image"/>
                  <div className="flex flex-col gap-1 w-full ">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    </div>
                    <div className="flex flex-col leading-1.5 pl-4 pb-10 content-center border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <p className="text-sm font-normal text-gray-900 dark:text-white" style={{ whiteSpace: "pre-wrap" }}> {element}</p>
                    </div>
                  </div>
                  <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>
                  <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">            
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                      </li>       
                    </ul>
                  </div>
              </div>

            )) : <div className='text-3xl  font-bold '>
              <p >Loading...</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            </div>}
        </div>

        {/* Fixed bottom input */}
        <div className="bg-gray-800 w-full">
          <form
            onSubmit={handle_msgInput}
            className="flex items-center w-full p-2 max-w-2xl mx-auto"
          >
            <div className="relative w-full">
              <textarea
                onChange={(e) => setMsgInput(e.target.value)}
                value={msgInput}
                placeholder="Message..."
                rows={3}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />

            </div>
            <button
              type="submit"
              className="ml-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
          </form>
        </div>
      </div>





    </div>
  )
}

export default Home
