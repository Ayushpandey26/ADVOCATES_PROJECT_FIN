function PincodeEntry({ onSubmit }) {
    const [pincode, setPincode] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pincode.length === 6) {
            onSubmit(pincode);
        } else {
            setError('Please enter a valid 6-digit pincode');
        }
    };

    const handleDetectLocation = async () => {
        try {
            const coords = await getCurrentLocation();
            if (coords) {
                const detectedPincode = await getPincodeFromCoordinates(coords.latitude, coords.longitude);
                if (detectedPincode) {
                    setPincode(detectedPincode);
                }
            }
        } catch (error) {
            reportError(error);
            setError('Unable to detect location. Please enter pincode manually.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <h2 className="text-center text-2xl font-bold mb-8">Enter Your Location</h2>
                    
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Pincode
                            </label>
                            <input
                                type="text"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                                placeholder="Enter 6-digit pincode"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Find Lawyers
                        </button>
                    </form>

                    <div className="mt-6">
                        <button
                            onClick={handleDetectLocation}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <i className="fas fa-location-arrow mr-2"></i>
                            Use my current location
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
