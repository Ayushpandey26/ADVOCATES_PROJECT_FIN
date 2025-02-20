function LawyerProfile({ lawyer, onClose }) {
    const [showChat, setShowChat] = React.useState(false);
    const [chatTimeLeft, setChatTimeLeft] = React.useState(1800); // 30 minutes in seconds
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');

    React.useEffect(() => {
        let timer;
        if (showChat && chatTimeLeft > 0) {
            timer = setInterval(() => {
                setChatTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showChat, chatTimeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, sender: 'user' }]);
            setNewMessage('');
            // Simulate lawyer response
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "Thank you for your message. I'll assist you with your legal query.",
                    sender: 'lawyer'
                }]);
            }, 1000);
        }
    };

    return (
        <div data-name="lawyer-profile" className="bg-white rounded-lg shadow-xl">
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="lawyer-profile-header text-white p-8">
                    <div className="flex items-center">
                        <img
                            src={lawyer.image}
                            alt={lawyer.name}
                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                        />
                        <div className="ml-6">
                            <h2 className="text-3xl font-bold">{lawyer.name}</h2>
                            <p className="text-xl">{lawyer.specialization}</p>
                            <div className="flex items-center mt-2">
                                <i className="fas fa-star text-yellow-400 mr-1"></i>
                                <span className="text-lg">{lawyer.rating} Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">About</h3>
                        <p className="text-gray-600 mb-6">{lawyer.description}</p>
                        
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-700">Experience</h4>
                                <p className="text-gray-600">{lawyer.experience} years</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">Education</h4>
                                <p className="text-gray-600">{lawyer.education}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">Languages</h4>
                                <div className="flex gap-2">
                                    {lawyer.languages.map(lang => (
                                        <span key={lang} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">Awards</h4>
                                <ul className="list-disc list-inside text-gray-600">
                                    {lawyer.awards.map(award => (
                                        <li key={award}>{award}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        {showChat ? (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold">Chat</h3>
                                    <div className="text-gray-600">
                                        Time remaining: {formatTime(chatTimeLeft)}
                                    </div>
                                </div>
                                <div className="h-96 overflow-y-auto mb-4 p-4 bg-white rounded-lg shadow">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 ${
                                                message.sender === 'user' ? 'text-right' : 'text-left'
                                            }`}
                                        >
                                            <div
                                                className={`inline-block p-3 rounded-lg ${
                                                    message.sender === 'user'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-800'
                                                }`}
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Type your message..."
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-gray-800">
                                        ${lawyer.hourlyRate}
                                    </span>
                                    <span className="text-gray-600">/hour</span>
                                </div>
                                <button
                                    onClick={() => setShowChat(true)}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mb-4"
                                >
                                    Start 30-Min Free Consultation
                                </button>
                                <p className="text-gray-600">
                                    First 30 minutes are free, then ${lawyer.hourlyRate}/hour applies
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
