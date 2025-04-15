'use client'
import { RiArrowUpDoubleFill } from "react-icons/ri";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { FaLongArrowAltLeft } from "react-icons/fa";
import React, { useEffect, useRef } from 'react'
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/slices/user";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { fetchChat } from "@/redux/slices/chat";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

export default function Chat() {
    let socket;
    const dispacth = useDispatch()
    const session = useSession()
    const router = useRouter()
    const scrollTarget = useRef(null);
    const [showChat, setShowChat] = React.useState(true)
    const [showMessage, setShowMessage] = React.useState(true)
    const [targetUser, setTargetUser] = React.useState(null)
    const [chat, setChat] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const [users, setUsers] = React.useState([])

    useEffect(() => {
        socket = io();
        // socket.connect();
        initialize();
        // socket.on("users", (users) => {
        //     users.forEach((user) => {
        //       user.self = user.userID === socket.id;
        //       initReactiveProperties(user);
        //     });
        //     // put the current user first, and then sort by username
        //     this.users = users.sort((a, b) => {
        //       if (a.self) return -1;
        //       if (b.self) return 1;
        //       if (a.username < b.username) return -1;
        //       return a.username > b.username ? 1 : 0;
        //     });
        // });
        
        // socket.on("user connected", (user) => {
        //     initReactiveProperties(user);
        //     this.users.push(user);
        //     console.log('uu',user)
        //   });
          
        socket.on("chat", (msg) => {
            setMessages(dataLama => [...dataLama, { chat: msg, createdAt: new Date() }])
        })
        // return () => {
        //     socket.disconnect();
        // };        
    }, []);

    const dataUser = useSelector(state => state.user.data)
    const user = dataUser.filter(item => item.id !== session?.data.user.id)
    
    const handleSelectUser = (usr) => {
        setShowMessage(false);
        setTargetUser(usr.id);
    }
    
    const handleClear = () => {
        setShowMessage(true)
        setTargetUser(null)
    }
    
    useEffect(() => {
        dispacth(fetchUser())
        dispacth(fetchChat())
    }, []);

    const initialize = async () => {
        const dataChat = await fetch("/api/chat");
        const data = await dataChat.json();
        setMessages([...data])
    }

    useEffect(() => {
		(scrollTarget.current).scrollIntoView();	
	}, [handleSelectUser]);

    useEffect(() => {
		if (scrollTarget.current) {
			(scrollTarget.current).scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages.length]);

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (chat === '') {
            toast.error('Please enter a message')
        } else {
            socket.emit("chat", chat); // Send message to server   
            setMessages(dataLama => [...dataLama, { chat: chat, createdAt: new Date() }])    
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat,
                    chatId: session.data.user.id + targetUser,
                }),
            })
            if (res.ok) {
                toast.success('Pesan terkirim')
                dispacth(fetchChat())
                setChat('')
            } else {
                toast.error('Gagal mengirim pesan')
            }
        }

    }
    return (
        <div className={`${showChat ? 'h-10' : 'h-1/2'} fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:w-96 duration-400 ease-out z-50`}>
            <div className='w-full text-center -mb-7'>
                <button onClick={() => setShowChat(!showChat)} className='bg-primary text-white text-center p-2 h-20 w-20 text-2xl rounded-full' color='secondary'>{
                    showChat ?
                        <div className="animate-bounce flex justify-center mb-5"><RiArrowUpDoubleFill /></div> :
                        <div className="animate-bounce flex justify-center mb-3"><RiArrowDownDoubleFill /></div>}
                </button>
            </div>
            <div className={`${showChat ? '' : ''} bg-primary h-[calc(100%-50px)] w-full fixed rounded-md shadow-lg shadow-secondary/50 p-1`}>
                <div className="bg-white h-full w-full shadow-lg rounded-md shadow-secondary/50 p-2 flex flex-col gap-2">
                    {user.map((usr, index) =>
                        <div key={index} className={`${showMessage ? 'block' : 'hidden'}`}>
                            <div onClick={() => handleSelectUser(usr)} className={`${showMessage ? 'block' : 'hidden'} flex items-center p-1 rounded-md hover:bg-primary-300 cursor-pointer`}>
                                <div className="w-12"><Avatar radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /></div>
                                <div className='flex flex-col'>
                                    <div className='font-bold'>{usr.name}</div>
                                    <div className='text-gray-500 text-sm'>biji</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={`${showMessage ? 'hidden' : 'block'} rounded-md`}>
                        {user.filter(usr => usr.id === targetUser).map((usr, index) =>
                            <div key={index} className="flex items-center pb-3">
                                <div className="text-2xl hover:cursor-pointer text-primary hover:text-primary-300" onClick={handleClear}><FaLongArrowAltLeft /></div>
                                <p className="w-full text-center font-bold text-primary">{usr.name}</p>
                            </div>
                        )}
                        <div className="flex flex-col h-[175px] gap-2 overflow-y-auto">
                            <div className="flex flex-col gap-1 overflow-y-auto flex-grow pr-1">
                                {/* {dataChat.filter(item => item.chatId === session.data.user?.id + targetUser).map((data, index) => */}
                                {messages.map((data, index) =>
                                    data.user?.id === session.data.user?.id ?
                                        <div className="bg-primary-300 p-1 max-w-[70%]" key={index}>
                                            {data.chat}
                                        </div>
                                        :
                                        <div className="bg-primary-300 p-1 max-w-[70%] self-end" key={index}>
                                            {data.chat}
                                        </div>
                                )}
                                <div ref={scrollTarget}></div>
                            </div>
                            <form onSubmit={handleSendMessage} className="flex gap-2 w-full bg-white">
                                <Textarea onChange={(e) => setChat(e.target.value)} value={chat} minRows={1} placeholder='Type here...' color='primary' radius='none' />
                                <Button type='submit' radius='none' isIconOnly className='bg-secondary text-secondary-foreground flex justify-center items-center text-xl hover:bg-black hover:text-primary'><BiSend /></Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

// 'use client'
// import React, { useEffect, useState } from 'react'
// import io from "socket.io-client";
// let socket;

// export default function Chat() {
//     const [name, setName] = useState("");
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);

    
//     useEffect(() => {
//         initialize();
        
//         socket = io();
//         return () => {
//             socket.disconnect();
//         }
//     }, []);
    
//     const initialize = async () => {
//         await fetch("/api/socket");
//         socket = io();
//         socket.on("receive-message", (data) => {
//             setMessages((messages) => [...messages, data]);
//         });
//     }
    

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         socket.emit("send-message", { name, message });
//         setMessage("");
//     }

//     return (
//         <div>
//             <h1>NEXT SOCKET.IO</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Enter your name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//                 <br />
//                 <input
//                     type="text"
//                     placeholder="Enter your message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                 />
//                 <br />
//                 <button type="submit">Send</button>
//             </form>
//             <hr />

//             <h2>Messages</h2>
//             <ul>
//                 {
//                     messages.map((msg, i) => (
//                         <li key={i}>
//                             <strong>{msg.name}</strong> : {msg.message}
//                         </li>
//                     ))
//                 }
//             </ul>
//         </div>
//     );
// };