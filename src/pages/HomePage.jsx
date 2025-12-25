import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    ChevronDown,
    Star,
    MapPin,
    Phone,
    Clock,
    Mail,
    ChevronRight,
    Sparkles,
    Heart,
    Award,
    Users,
    Scissors,
    MessageCircle
} from 'lucide-react';
import { useBooking, useTheme } from '../hooks';
import { LoadingSpinner, ErrorMessage, ServiceCard, ServiceDetailModal } from '../components';

/**
 * Home Page Component
 * Long-scroll landing page with multiple sections
 */
const HomePage = () => {
    const navigate = useNavigate();
    const { services, staff, loading, error, refreshAppointments } = useBooking();
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: 'Sarah M.',
            rating: 5,
            text: 'Absolutely amazing experience! The stylists really listen to what you want and deliver beyond expectations.',
            service: 'Hair Coloring'
        },
        {
            id: 2,
            name: 'Emily R.',
            rating: 5,
            text: 'Best salon in town! The atmosphere is so relaxing and the staff is incredibly professional.',
            service: 'Facial Treatment'
        },
        {
            id: 3,
            name: 'Jessica L.',
            rating: 5,
            text: 'I\'ve been coming here for years. Consistent quality and always leave feeling beautiful!',
            service: 'Manicure & Pedicure'
        }
    ];

    // Benefits data
    const benefits = [
        { icon: Award, title: 'Certified Experts', description: 'All our stylists are professionally certified' },
        { icon: Sparkles, title: 'Premium Products', description: 'We use only high-end beauty products' },
        { icon: Heart, title: 'Personalized Care', description: 'Tailored services for your unique style' },
        { icon: Users, title: 'Friendly Team', description: 'Warm and welcoming atmosphere' }
    ];

    // Service categories for quick overview
    const serviceCategories = [
        { name: 'Hair Services', icon: Scissors, count: services.filter(s => s.category === 'hair').length },
        { name: 'Nail Care', icon: Sparkles, count: services.filter(s => s.category === 'nails').length },
        { name: 'Skincare', icon: Heart, count: services.filter(s => s.category === 'skincare').length },
        { name: 'Makeup', icon: Star, count: services.filter(s => s.category === 'makeup').length }
    ];

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={refreshAppointments} />;

    // Filter and search logic
    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);
    const categories = ['all', ...new Set(services.map(s => s.category))];

    // Scroll to services section
    const scrollToServices = () => {
        document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-page">
            {/* ==================== 1. HERO SECTION ==================== */}
            <section className="hero-section" aria-label="Welcome">
                <div className="hero-section__overlay"></div>
                <div className="hero-section__content">
                    <img
                        src="/images/logo.png"
                        alt="Suulu Salon"
                        className="hero-section__logo"
                    />
                    <h1 className="hero-section__title">
                        Experience Korean Beauty
                    </h1>
                    <p className="hero-section__subtitle">
                        Nails | Hair | Skincare
                    </p>
                    <div className="hero-section__cta">
                        <button
                            className="btn btn--primary btn--lg"
                            onClick={() => navigate('/booking')}
                        >
                            Book Your Appointment
                        </button>
                        <button
                            className="btn btn--outline-dark btn--lg"
                            onClick={scrollToServices}
                        >
                            Explore Services
                        </button>
                    </div>
                    <div className="hero-section__stats">
                        <div className="hero-section__stat">
                            <span className="hero-section__stat-number">1000+</span>
                            <span className="hero-section__stat-label">Happy Clients</span>
                        </div>
                        <div className="hero-section__stat">
                            <span className="hero-section__stat-number">15+</span>
                            <span className="hero-section__stat-label">Years Experience</span>
                        </div>
                        <div className="hero-section__stat">
                            <span className="hero-section__stat-number">20+</span>
                            <span className="hero-section__stat-label">Expert Stylists</span>
                        </div>
                    </div>
                </div>
                <div className="hero-section__image">
                    <img
                        src={isDarkMode ? "/images/hero-models-dark.png" : "/images/hero-models.png"}
                        alt="Beautiful salon clients"
                    />
                </div>
                <div className="hero-section__scroll-indicator" onClick={scrollToServices}>
                    <ChevronDown className="icon animate-bounce" />
                </div>
            </section>

            {/* ==================== 2. ABOUT US SECTION ==================== */}
            <section className="about-section" aria-labelledby="about-heading">
                <div className="about-section__container">
                    <div className="about-section__content">
                        <span className="section-tag">Welcome to Suulu Salon</span>
                        <h2 id="about-heading" className="section-title">Experience Korean Beauty</h2>
                        <p className="about-section__text">
                            At Suulu Salon, we bring the finest Korean beauty techniques to you. Our team of passionate
                            professionals is dedicated to bringing out the best in you through personalized beauty
                            services and exceptional care.
                        </p>
                        <p className="about-section__text">
                            With expertise in Korean beauty trends and premium products, we've perfected the art of
                            creating stunning transformations while ensuring a relaxing and enjoyable experience
                            for every client who walks through our doors.
                        </p>
                        <div className="about-section__features">
                            <div className="about-section__feature">
                                <Award className="about-section__feature-icon" />
                                <span>Korean Beauty Experts</span>
                            </div>
                            <div className="about-section__feature">
                                <Sparkles className="about-section__feature-icon" />
                                <span>Premium K-Beauty Products</span>
                            </div>
                            <div className="about-section__feature">
                                <Heart className="about-section__feature-icon" />
                                <span>100% Satisfaction</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-section__image">
                        <div className="about-section__image-card">
                            <img
                                src="/images/logo.png"
                                alt="Suulu Salon"
                                className="about-section__logo"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== 3. SERVICES OVERVIEW ==================== */}
            <section className="categories-section" aria-labelledby="categories-heading">
                <div className="categories-section__container">
                    <span className="section-tag">What We Offer</span>
                    <h2 id="categories-heading" className="section-title">Our Service Categories</h2>
                    <p className="section-subtitle">
                        Discover our comprehensive range of beauty services designed to make you look and feel amazing
                    </p>

                    <div className="categories-grid">
                        {serviceCategories.map((category, index) => (
                            <button
                                key={index}
                                className="category-card"
                                onClick={() => {
                                    setFilterCategory(category.name.toLowerCase().includes('hair') ? 'hair' :
                                        category.name.toLowerCase().includes('nail') ? 'nails' :
                                            category.name.toLowerCase().includes('skin') ? 'skincare' : 'makeup');
                                    scrollToServices();
                                }}
                            >
                                <div className="category-card__icon">
                                    <category.icon />
                                </div>
                                <h3 className="category-card__title">{category.name}</h3>
                                <p className="category-card__count">{category.count} Services</p>
                                <span className="category-card__link">
                                    View All <ChevronRight className="icon-xs" />
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== 4. FULL SERVICES LIST ==================== */}
            <section id="services-section" className="services-section" aria-labelledby="services-heading">
                <div className="page-container">
                    <span className="section-tag">Browse & Book</span>
                    <h2 id="services-heading" className="section-title">Our Services</h2>
                    <p className="section-subtitle">
                        Choose from our wide range of professional beauty treatments
                    </p>

                    {/* Search and Filter */}
                    <div className="search-filter">
                        <div className="search-filter__grid">
                            <div className="search-box">
                                <Search className="search-box__icon" aria-hidden="true" />
                                <input
                                    type="text"
                                    placeholder="Search services..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="search-box__input"
                                    aria-label="Search services"
                                />
                            </div>
                            <div className="filter-box">
                                <Filter className="filter-box__icon" aria-hidden="true" />
                                <select
                                    value={filterCategory}
                                    onChange={(e) => {
                                        setFilterCategory(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="filter-box__select"
                                    aria-label="Filter by category"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="filter-box__arrow" aria-hidden="true" />
                            </div>
                        </div>
                    </div>

                    {/* Services Grid */}
                    {paginatedServices.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-state__text">No services found matching your criteria</p>
                        </div>
                    ) : (
                        <>
                            <div className="services-grid">
                                {paginatedServices.map(service => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        onClick={() => setSelectedServiceDetail(service)}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="pagination__btn"
                                        aria-label="Previous page"
                                    >
                                        Previous
                                    </button>
                                    <span className="pagination__info">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="pagination__btn"
                                        aria-label="Next page"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* ==================== 5. TESTIMONIALS & BENEFITS ==================== */}
            <section className="testimonials-section" aria-labelledby="testimonials-heading">
                <div className="testimonials-section__container">
                    <span className="section-tag">Client Love</span>
                    <h2 id="testimonials-heading" className="section-title">What Our Clients Say</h2>

                    <div className="testimonials-grid">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="testimonial-card__stars">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="testimonial-card__star" fill="currentColor" />
                                    ))}
                                </div>
                                <p className="testimonial-card__text">"{testimonial.text}"</p>
                                <div className="testimonial-card__author">
                                    <div className="testimonial-card__avatar">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="testimonial-card__name">{testimonial.name}</p>
                                        <p className="testimonial-card__service">{testimonial.service}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits */}
                    <div className="benefits-section">
                        <h3 className="benefits-section__title">Why Choose Us?</h3>
                        <div className="benefits-grid">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-card">
                                    <div className="benefit-card__icon">
                                        <benefit.icon />
                                    </div>
                                    <h4 className="benefit-card__title">{benefit.title}</h4>
                                    <p className="benefit-card__text">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== 6. TEAM SECTION ==================== */}
            <section className="team-section" aria-labelledby="team-heading">
                <div className="team-section__container">
                    <span className="section-tag">Meet the Experts</span>
                    <h2 id="team-heading" className="section-title">Our Professional Team</h2>
                    <p className="section-subtitle">
                        Talented stylists and beauty experts dedicated to making you look amazing
                    </p>

                    <div className="team-grid">
                        {staff.map(member => (
                            <div key={member.id} className="team-card">
                                <div className="team-card__avatar">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="team-card__name">{member.name}</h3>
                                <p className="team-card__specialty">{member.specialty}</p>
                                <p className="team-card__experience">{member.experience} experience</p>
                                <p className="team-card__bio">{member.bio}</p>
                                <button
                                    className="team-card__btn"
                                    onClick={() => navigate('/booking')}
                                >
                                    Book with {member.name.split(' ')[0]}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== 7. CONTACT / LOCATION SECTION ==================== */}
            <section className="contact-section" aria-labelledby="contact-heading">
                <div className="contact-section__container">
                    <div className="contact-section__info">
                        <span className="section-tag">Visit Us</span>
                        <h2 id="contact-heading" className="section-title">Get In Touch</h2>
                        <p className="contact-section__text">
                            Ready for your transformation? Visit our salon or contact us to book your appointment today.
                        </p>

                        <div className="contact-details">
                            <div className="contact-detail">
                                <MapPin className="contact-detail__icon" />
                                <div>
                                    <h4>Location</h4>
                                    <p>123 Beauty Boulevard<br />New York, NY 10001</p>
                                </div>
                            </div>
                            <div className="contact-detail">
                                <Phone className="contact-detail__icon" />
                                <div>
                                    <h4>Phone</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="contact-detail">
                                <Clock className="contact-detail__icon" />
                                <div>
                                    <h4>Hours</h4>
                                    <p>Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: 10:00 AM - 5:00 PM</p>
                                </div>
                            </div>
                            <div className="contact-detail">
                                <Mail className="contact-detail__icon" />
                                <div>
                                    <h4>Email</h4>
                                    <p>hello@suulusalon.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-section__cta">
                            <button
                                className="btn btn--primary btn--lg"
                                onClick={() => onNavigate('booking')}
                            >
                                Book Your Appointment
                            </button>
                            <button className="btn btn--whatsapp btn--lg">
                                <MessageCircle className="icon" />
                                Chat on WhatsApp
                            </button>
                        </div>
                    </div>

                    <div className="contact-section__map">
                        <div className="map-placeholder">
                            <MapPin className="map-placeholder__icon" />
                            <p>Interactive Map</p>
                            <span>123 Beauty Boulevard, New York</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Detail Modal */}
            {selectedServiceDetail && (
                <ServiceDetailModal
                    service={selectedServiceDetail}
                    onClose={() => setSelectedServiceDetail(null)}
                    onBook={(service) => navigate('/booking', { state: { initialServices: [service] } })}
                />
            )}
        </div>
    );
};

export default HomePage;
