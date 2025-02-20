function UserProfile({ user, onLogout }) {
    const [appointments, setAppointments] = React.useState([]);
    const [consultations, setConsultations] = React.useState([]);

    React.useEffect(() => {
        try {
            const fetchUserData = async () => {
                // Simulated API calls to fetch user's appointments and consultations
                const appointmentsData = [
                    {
                        id: 1,
                        lawyer: 'John Doe',
                        date: '2024-02-15',
                        time: '14:00',
                        status: 'upcoming'
                    },
                    {
                        id: 2,
                        lawyer: 'Jane Smith',
                        date: '2024-02-20',
                        time: '10:00',
                        status: 'upcoming'
                    }
                ];

                const consultationsData = [
                    {
                        id: 1,
                        lawyer: 'Jane Smith',
                        date: '2024-02-10',
                        duration: '30 mins',
                        status: 'completed'
                    },
                    {
                        id: 2,
                        lawyer: 'Mike Johnson',
                        date: '2024-02-05',
                        duration: '1 hour',
                        status: 'completed'
                    }
                ];

                setAppointments(appointmentsData);
                setConsultations(consultationsData);
            };

            fetchUserData();
        } catch (error) {
            reportError(error);
        }
    }, []);

    return (
        <div data-name="user-profile" className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <img
                            src={user.objectData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.objectData.name)}`}
                            alt={user.objectData.name}
                            className="w-20 h-20 rounded-full"
                        />
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold">{user.objectData.name}</h2>
                            <p className="text-gray-600">{user.objectData.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="border-t pt-8">
                    <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
                    {appointments.length > 0 ? (
                        <div className="space-y-4">
                            {appointments.map(appointment => (
                                <div
                                    key={appointment.id}
                                    className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-semibold">{appointment.lawyer}</p>
                                        <p className="text-gray-600">
                                            {appointment.date} at {appointment.time}
                                        </p>
                                    </div>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                        {appointment.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No upcoming appointments</p>
                    )}
                </div>

                <div className="border-t mt-8 pt-8">
                    <h3 className="text-xl font-semibold mb-4">Past Consultations</h3>
                    {consultations.length > 0 ? (
                        <div className="space-y-4">
                            {consultations.map(consultation => (
                                <div
                                    key={consultation.id}
                                    className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-semibold">{consultation.lawyer}</p>
                                        <p className="text-gray-600">
                                            {consultation.date} - {consultation.duration}
                                        </p>
                                    </div>
                                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                                        {consultation.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No past consultations</p>
                    )}
                </div>
            </div>
        </div>
    );
}
