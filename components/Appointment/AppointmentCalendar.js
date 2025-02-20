function AppointmentCalendar({ lawyer, onClose, onBook }) {
    const [selectedDate, setSelectedDate] = React.useState('');
    const [selectedTime, setSelectedTime] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const availableTimeSlots = [
        '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
    ];

    const handleBooking = async () => {
        try {
            setLoading(true);
            const appointmentData = {
                lawyerId: lawyer.id,
                date: selectedDate,
                time: selectedTime,
                status: 'pending'
            };

            const appointment = await trickleCreateObject('appointment', appointmentData);
            onBook(appointment);
            onClose();
        } catch (error) {
            reportError(error);
            alert('Failed to book appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Book Appointment</h3>
                    <div className="mt-2 px-7 py-3">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Date
                            </label>
                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {selectedDate && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Time
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {availableTimeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`p-2 text-sm rounded ${
                                                selectedTime === time
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBooking}
                                disabled={!selectedDate || !selectedTime || loading}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                                    loading ? 'opacity-50' : 'hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Booking...' : 'Book Appointment'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
