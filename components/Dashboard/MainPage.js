function MainPage({ user, pincode, onLogout, currentPage, setCurrentPage }) {
    const [showLegalBot, setShowLegalBot] = React.useState(false);

    const handleNavigation = (page) => {
        if (page === 'home') {
            setCurrentPage('main');
        } else {
            setCurrentPage(page);
        }
    };

    const renderSection = () => {
        switch (currentPage) {
            case 'lawyers':
                return <LawyerList pincode={pincode} />;
            case 'profile':
                return (
                    <UserProfile 
                        user={user} 
                        onLogout={onLogout}
                    />
                );
            case 'main':
            default:
                return <LawyerList pincode={pincode} />;
        }
    };

    return (
        <div data-name="main-page" className="min-h-screen bg-gray-50">
            <nav data-name="main-nav" className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 
                                onClick={() => handleNavigation('home')}
                                className="text-2xl font-bold text-gray-900 cursor-pointer"
                            >
                                Law Connect
                            </h1>
                        </div>
                        <div className="flex items-center space-x-8">
                            <button
                                onClick={() => handleNavigation('lawyers')}
                                className={`text-gray-700 hover:text-blue-600 ${
                                    currentPage === 'lawyers' ? 'border-b-2 border-blue-600' : ''
                                }`}
                            >
                                <i className="fas fa-gavel mr-2"></i>
                                Find Lawyers
                            </button>
                            <button
                                onClick={() => setShowLegalBot(!showLegalBot)}
                                className={`text-gray-700 hover:text-blue-600 ${
                                    showLegalBot ? 'border-b-2 border-blue-600' : ''
                                }`}
                            >
                                <i className="fas fa-robot mr-2"></i>
                                Legal Bot
                            </button>
                            <button
                                onClick={() => handleNavigation('profile')}
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

            <div className="max-w-7xl mx-auto px-4 py-8">
                {renderSection()}
            </div>

            {showLegalBot && <LegalBot />}
        </div>
    );
}
