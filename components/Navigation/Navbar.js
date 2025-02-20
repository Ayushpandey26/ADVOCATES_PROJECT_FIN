function Navbar({ currentPage, setCurrentPage, user }) {
    return (
        <nav data-name="main-nav" className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 
                            onClick={() => setCurrentPage('home')}
                            className="text-2xl font-bold text-gray-900 cursor-pointer"
                        >
                            Law Connect
                        </h1>
                    </div>
                    <div className="flex items-center space-x-8">
                        <button
                            onClick={() => setCurrentPage('lawyers')}
                            className={`text-gray-700 hover:text-blue-600 ${
                                currentPage === 'lawyers' ? 'border-b-2 border-blue-600' : ''
                            }`}
                        >
                            <i className="fas fa-gavel mr-2"></i>
                            Find Lawyers
                        </button>
                        <button
                            onClick={() => setCurrentPage('chat')}
                            className={`text-gray-700 hover:text-blue-600 ${
                                currentPage === 'chat' ? 'border-b-2 border-blue-600' : ''
                            }`}
                        >
                            <i className="fas fa-robot mr-2"></i>
                            Legal Bot
                        </button>
                        <button
                            onClick={() => setCurrentPage('profile')}
                            className={`text-gray-700 hover:text-blue-600 ${
                                currentPage === 'profile' ? 'border-b-2 border-blue-600' : ''
                            }`}
                        >
                            <i className="fas fa-user mr-2"></i>
                            Profile
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
