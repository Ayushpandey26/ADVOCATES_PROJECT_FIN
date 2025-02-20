function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState('landing');
    const [userData, setUserData] = React.useState(null);
    const [pincode, setPincode] = React.useState('');

    const handleAuth = async (user) => {
        try {
            const newUser = await trickleCreateObject('user', user);
            setIsAuthenticated(true);
            setUserData(newUser);
            setCurrentPage('location'); // Navigate to location page after auth
        } catch (error) {
            reportError(error);
            alert('Authentication failed. Please try again.');
        }
    };

    const handlePincodeSubmit = (enteredPincode) => {
        setPincode(enteredPincode);
        setCurrentPage('main'); // Navigate to main page after pincode entry
    };

    const handleLogout = async () => {
        try {
            if (userData) {
                await trickleDeleteObject('user', userData.objectId);
            }
            setIsAuthenticated(false);
            setUserData(null);
            setPincode('');
            setCurrentPage('landing');
        } catch (error) {
            reportError(error);
        }
    };

    const renderContent = () => {
        if (!isAuthenticated) {
            switch (currentPage) {
                case 'signin':
                    return <SignIn onAuth={handleAuth} onNavigate={setCurrentPage} />;
                case 'signup':
                    return <SignUp onAuth={handleAuth} onNavigate={setCurrentPage} />;
                default:
                    return <LandingPage onNavigate={setCurrentPage} />;
            }
        }

        if (currentPage === 'location' || !pincode) {
            return <PincodeEntry onSubmit={handlePincodeSubmit} />;
        }

        return (
            <MainPage 
                user={userData}
                pincode={pincode}
                onLogout={handleLogout}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        );
    };

    return (
        <div data-name="app-container">
            {renderContent()}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
