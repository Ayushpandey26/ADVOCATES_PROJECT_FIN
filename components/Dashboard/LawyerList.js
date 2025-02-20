function LawyerList({ pincode }) {
    const [lawyers, setLawyers] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [priceRange, setPriceRange] = React.useState('all');
    const [loading, setLoading] = React.useState(true);
    const [showProfile, setShowProfile] = React.useState(null);

    const categories = [
        { id: 'all', name: 'All Categories' },
        { id: 'criminal', name: 'Criminal Law' },
        { id: 'civil', name: 'Civil Law' },
        { id: 'corporate', name: 'Corporate Law' },
        { id: 'family', name: 'Family Law' },
        { id: 'property', name: 'Property Law' },
        { id: 'tax', name: 'Tax Law' },
        { id: 'immigration', name: 'Immigration Law' }
    ];

    const priceRanges = [
        { id: 'all', name: 'All Prices' },
        { id: 'low', name: 'Under $100/hr' },
        { id: 'mid', name: '$100-$200/hr' },
        { id: 'high', name: 'Above $200/hr' }
    ];

    React.useEffect(() => {
        try {
            const fetchLawyers = async () => {
                // Simulated API call with more lawyer data
                const dummyLawyers = [
                    {
                        id: 1,
                        name: 'John Doe',
                        category: 'criminal',
                        experience: 15,
                        rating: 4.8,
                        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
                        cases: 200,
                        specialization: 'Criminal Defense',
                        hourlyRate: 150,
                        description: 'Specialized in criminal defense with extensive courtroom experience.',
                        languages: ['English', 'Spanish'],
                        education: 'Harvard Law School',
                        awards: ['Best Criminal Lawyer 2022']
                    },
                    {
                        id: 2,
                        name: 'Jane Smith',
                        category: 'corporate',
                        experience: 12,
                        rating: 4.6,
                        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
                        cases: 150,
                        specialization: 'Corporate Law',
                        hourlyRate: 200,
                        description: 'Expert in corporate law and mergers & acquisitions.',
                        languages: ['English', 'French'],
                        education: 'Yale Law School',
                        awards: ['Corporate Law Excellence Award']
                    },
                    {
                        id: 3,
                        name: 'Michael Chen',
                        category: 'property',
                        experience: 8,
                        rating: 4.9,
                        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200',
                        cases: 120,
                        specialization: 'Real Estate Law',
                        hourlyRate: 175,
                        description: 'Specialized in property law and real estate transactions.',
                        languages: ['English', 'Mandarin'],
                        education: 'Stanford Law School',
                        awards: ['Rising Star in Property Law']
                    },
                    // Add more lawyers with similar detailed information...
                ];
                setLawyers(dummyLawyers);
                setLoading(false);
            };
            fetchLawyers();
        } catch (error) {
            reportError(error);
            setLoading(false);
        }
    }, [pincode]);

    const filterLawyers = (lawyer) => {
        const categoryMatch = selectedCategory === 'all' || lawyer.category === selectedCategory;
        const priceMatch = priceRange === 'all' 
            || (priceRange === 'low' && lawyer.hourlyRate < 100)
            || (priceRange === 'mid' && lawyer.hourlyRate >= 100 && lawyer.hourlyRate <= 200)
            || (priceRange === 'high' && lawyer.hourlyRate > 200);
        return categoryMatch && priceMatch;
    };

    const filteredLawyers = lawyers.filter(filterLawyers);

    return (
        <div data-name="lawyer-list" className="p-4">
            {showProfile ? (
                <LawyerProfile lawyer={showProfile} onClose={() => setShowProfile(null)} />
            ) : (
                <div>
                    <div data-name="filters" className="bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-2xl font-bold mb-6">Find the Right Lawyer for You</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Price Range</label>
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {priceRanges.map(range => (
                                        <option key={range.id} value={range.id}>
                                            {range.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLawyers.map(lawyer => (
                                <LawyerCard 
                                    key={lawyer.id} 
                                    lawyer={lawyer}
                                    onViewProfile={() => setShowProfile(lawyer)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function LawyerCard({ lawyer, onViewProfile }) {
    return (
        <div data-name="lawyer-card" className="lawyer-card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="relative h-48">
                <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow">
                    ${lawyer.hourlyRate}/hr
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                        <p className="text-gray-600">{lawyer.specialization}</p>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        <span className="font-semibold">{lawyer.rating}</span>
                    </div>
                </div>
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                        <i className="fas fa-briefcase mr-2"></i>
                        <span>{lawyer.experience} years experience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <i className="fas fa-gavel mr-2"></i>
                        <span>{lawyer.cases}+ cases handled</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <i className="fas fa-graduation-cap mr-2"></i>
                        <span>{lawyer.education}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={onViewProfile}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        View Profile
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                        Chat Now
                    </button>
                </div>
            </div>
        </div>
    );
}
