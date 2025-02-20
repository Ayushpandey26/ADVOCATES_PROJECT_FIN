function LegalBot() {
    const [messages, setMessages] = React.useState([
        {
            type: 'bot',
            content: 'Hello! I\'m your AI legal assistant. How can I help you today? You can ask me about:',
            options: [
                'Legal rights and procedures',
                'Document requirements',
                'Court processes',
                'Legal terminology'
            ],
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const chatContainerRef = React.useRef(null);

    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { 
            type: 'user', 
            content: input,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const systemPrompt = `
                You are an expert legal assistant AI. Provide clear, accurate, and helpful responses to legal questions.
                Keep responses concise but informative. If the question is too complex or requires specific legal counsel,
                recommend consulting with a qualified lawyer. Always maintain a professional and empathetic tone.
                Current conversation context:
                ${messages.map(m => `${m.type}: ${m.content}`).join('\n')}
            `;

            const response = await invokeAIAgent(systemPrompt, input);

            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    type: 'bot', 
                    content: response,
                    timestamp: new Date()
                }]);
                setIsTyping(false);
            }, 500);
        } catch (error) {
            reportError(error);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'I apologize, but I encountered an error. Please try asking your question again.',
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }
    };

    const handleQuickOption = async (option) => {
        const userMessage = {
            type: 'user',
            content: option,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const response = await invokeAIAgent(
                "You are a legal assistant. Provide a helpful response to the selected topic.",
                option
            );

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    content: response,
                    timestamp: new Date()
                }]);
                setIsTyping(false);
            }, 500);
        } catch (error) {
            reportError(error);
            setIsTyping(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
                <i className="fas fa-robot text-2xl"></i>
            </button>
        );
    }

    return (
        <div data-name="legal-bot" className="fixed bottom-4 right-4 w-96 z-50">
            <div className="bg-white rounded-lg shadow-xl flex flex-col h-[600px]">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <i className="fas fa-robot text-2xl mr-3"></i>
                        <div>
                            <h3 className="text-lg font-semibold">Legal Assistant</h3>
                            <p className="text-sm opacity-75">Online | Ready to help</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-200"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.type === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                    <i className="fas fa-robot text-white text-sm"></i>
                                </div>
                            )}
                            <div
                                className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                                    message.type === 'user'
                                        ? 'bg-blue-600 text-white ml-2'
                                        : 'bg-white shadow-md'
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>
                                {message.options && (
                                    <div className="mt-4 space-y-2">
                                        {message.options.map((option, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleQuickOption(option)}
                                                className="block w-full text-left px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <p className={`text-xs mt-1 ${
                                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                    {message.timestamp.toLocaleTimeString()}
                                </p>
                            </div>
                            {message.type === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2">
                                    <i className="fas fa-user text-white text-sm"></i>
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                <i className="fas fa-robot text-white text-sm"></i>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask your legal question..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
