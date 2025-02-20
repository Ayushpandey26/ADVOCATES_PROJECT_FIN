function LandingPage({ onNavigate }) {
    return (
        <div data-name="landing-container" className="min-h-screen">
            <div data-name="hero-section" className="hero-section h-screen flex items-center justify-center text-white">
                <div className="text-center px-4">
                    <h1 className="text-5xl font-bold mb-6">Welcome to Law Connect</h1>
                    <p className="text-xl mb-8">Connect with Expert Lawyers for Professional Legal Assistance</p>
                    <div className="space-x-4">
                        <button
                            data-name="signup-btn"
                            onClick={() =>window.location.href = "/index1.html"}
                            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
                        >
                            Sign Up
                        </button>
                        <button
                            data-name="signin-btn"
                            onClick={() =>window.location.href = "/index1.html"}
                            className="bg-transparent border-2 border-white hover:bg-white hover:text-red-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>

            <div data-name="features-section" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div data-name="feature-card" className="feature-card bg-white p-6 rounded-lg shadow-lg">
                            <i className="fas fa-gavel text-4xl text-red-700 mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Legal Counseling</h3>
                            <p className="text-gray-600">Expert advice from experienced lawyers in various fields of law</p>
                        </div>
                        <div data-name="feature-card" className="feature-card bg-white p-6 rounded-lg shadow-lg">
                            <i className="fas fa-clock text-4xl text-red-700 mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">30-Min Free Chat</h3>
                            <p className="text-gray-600">Start with a free consultation to discuss your legal matters</p>
                        </div>
                        <div data-name="feature-card" className="feature-card bg-white p-6 rounded-lg shadow-lg">
                            <i className="fas fa-user-tie text-4xl text-red-700 mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Best Advocates</h3>
                            <p className="text-gray-600">Access to top-rated lawyers with proven track records</p>
                        </div>
                        <div data-name="feature-card" className="feature-card bg-white p-6 rounded-lg shadow-lg">
                            <i className="fas fa-video text-4xl text-red-700 mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Video Counseling</h3>
                            <p className="text-gray-600">Remote legal consultations from the comfort of your home</p>
                        </div>
                    </div>
                </div>
            </div>

            <div data-name="about-section" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">About Law Connect</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600"
                                alt="Law Connect Team"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Your Bridge to Legal Excellence</h3>
                            <p className="text-gray-600 mb-6">
                                Law Connect is dedicated to making legal services accessible to everyone. 
                                Our platform connects clients with experienced lawyers across various 
                                specializations, ensuring you get the right legal support when you need it.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                                    <span>Verified and experienced lawyers</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                                    <span>Secure and confidential consultations</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                                    <span>24/7 legal chatbot assistance</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                                    <span>Flexible consultation options</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
