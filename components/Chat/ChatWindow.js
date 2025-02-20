function ChatWindow({ lawyer, onClose, onStartVideoCall }) {
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(1800); // 30 minutes in seconds
    const [isPaid, setIsPaid] = React.useState(false);
    const chatRef = React.useRef(null);

    React.useEffect(() => {
        // Initial welcome message
        setMessages([
            {
                id: 1,
                sender: 'lawyer',
                content: `Hello! I'm ${lawyer.name}. How can I assist you today?`,
                timestamp: new Date().toISOString()
            }
        ]);

        // Start timer for free consultation
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [lawyer.name]);

    React.useEffect(() => {
        // Scroll to bottom when new messages arrive
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        if (timeLeft <= 0 && !isPaid) {
            alert('Free consultation time has ended. Please purchase additional time to continue.');
            return;
        }

        try {
            const userMessage = {
                id: messages.length + 1,
                sender: 'user',
                content: newMessage,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, userMessage]);
            setNewMessage('');
            setIsTyping(true);

            // Simulate lawyer response
            setTimeout(() => {
                const lawyerMessage = {
                    id: messages.length + 2,
                    sender: 'lawyer',
                    content: `Thank you for your message. I understand your concern about ${newMessage.substring(0, 20)}... Let me help you with that.`,
                    timestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, lawyerMessage]);
                setIsTyping(false);
            }, 2000);
        } catch (error) {
            reportError(error);
            setIsTyping(false);
        }
    };

    const handlePurchaseTime = async () => {
        try {
            const payment = await processPayment(lawyer.hourlyRate);
            if (payment) {
                setIsPaid(true);
                setTimeLeft(3600); // Add 1 hour
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div data-name="chat-window" className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <div className="flex items-center">
                        <img
                            src={lawyer.image}
                            alt={lawyer.name}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <h3 className="font-semibold">{lawyer.name}</h3>
                            <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                            {timeLeft > 0 ? (
                                <span>Time remaining: {formatTime(timeLeft)}</span>
                            ) : (
                                <span className="text-red-600">Consultation ended</span>
                            )}
                        </div>
                        <button
                            onClick={onStartVideoCall}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                            <i className="fas fa-video mr-1"></i>
                            Video Call
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <div
                    ref={chatRef}
                    className="h-96 overflow-y-auto p-4 space-y-4"
                >
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                                    message.sender === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                <p>{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-3">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {timeLeft <= 0 && !isPaid ? (
                    <div className="p-4 bg-yellow-50 border-t border-yellow-100">
                        <p className="text-center text-gray-700 mb-2">
                            Free consultation time has ended. Continue chatting for ${lawyer.hourlyRate}/hour
                        </p>
                        <button
                            onClick={handlePurchaseTime}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Purchase More Time
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSendMessage} className="p-4 border-t">
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
