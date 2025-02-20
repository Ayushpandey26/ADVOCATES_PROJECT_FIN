function VideoCall({ lawyer, onClose }) {
    const [localStream, setLocalStream] = React.useState(null);
    const [remoteStream, setRemoteStream] = React.useState(null);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isVideoOff, setIsVideoOff] = React.useState(false);
    const [connectionStatus, setConnectionStatus] = React.useState('connecting');
    const [timeRemaining, setTimeRemaining] = React.useState(1800); // 30 minutes

    const localVideoRef = React.useRef(null);
    const remoteVideoRef = React.useRef(null);

    React.useEffect(() => {
        try {
            const startCall = async () => {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                // Simulate connecting to lawyer
                setTimeout(() => {
                    setConnectionStatus('connected');
                    // Simulate remote stream with local stream for demo
                    setRemoteStream(stream);
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = stream;
                    }
                }, 2000);
            };
            startCall();

            // Countdown timer
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => {
                clearInterval(timer);
                if (localStream) {
                    localStream.getTracks().forEach(track => track.stop());
                }
            };
        } catch (error) {
            reportError(error);
            setConnectionStatus('error');
        }
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(!isVideoOff);
        }
    };

    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        onClose();
    };

    return (
        <div data-name="video-call" className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="w-full max-w-6xl p-4">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 px-4 py-2 rounded-lg text-white">
                        Time remaining: {formatTime(timeRemaining)}
                    </div>

                    {connectionStatus === 'connecting' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <div className="text-white text-center">
                                <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
                                <p>Connecting to {lawyer.name}...</p>
                            </div>
                        </div>
                    )}

                    {connectionStatus === 'error' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <div className="text-white text-center">
                                <i className="fas fa-exclamation-circle text-4xl mb-4 text-red-500"></i>
                                <p>Failed to establish connection. Please try again.</p>
                                <button
                                    onClick={onClose}
                                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-4 gap-4 p-4">
                        <div className="col-span-3">
                            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg text-white">
                                    {lawyer.name}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                                    You
                                </div>
                            </div>
                            <div className="space-y-2">
                                <button
                                    onClick={toggleMute}
                                    className={`w-full py-2 rounded-lg ${
                                        isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                                    } text-white`}
                                >
                                    <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} mr-2`}></i>
                                    {isMuted ? 'Unmute' : 'Mute'}
                                </button>
                                <button
                                    onClick={toggleVideo}
                                    className={`w-full py-2 rounded-lg ${
                                        isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                                    } text-white`}
                                >
                                    <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'} mr-2`}></i>
                                    {isVideoOff ? 'Start Video' : 'Stop Video'}
                                </button>
                                <button
                                    onClick={endCall}
                                    className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <i className="fas fa-phone-slash mr-2"></i>
                                    End Call
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
