import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Link from 'next/link';

const SliderReels = () => {
    const companies = [
    {
        id: 1,
        image: '/mail_google_com/Untitled design (1).png',
        title: 'Company One',
        description: 'Innovative solutions for modern problems.',
    },
    {
        id: 2,
        image: '/mail_google_com/Untitled design (2).png',
        title: 'Company Two',
        description: 'Delivering quality services to our clients.',
    },
    {
        id: 3,
        image: '/mail_google_com/Untitled design (3).png',
        title: 'Company Three',
        description: 'Your trusted partner in business growth.',
    },
    {
        id: 4,
        image: '/mail_google_com/Untitled design (4).png',
        title: 'Company Four',
        description: 'Pioneers in technological advancements.',
    },
    {
        id: 5,
        image: '/mail_google_com/Untitled design (5).png',
        title: 'Company Five',
        description: 'Committed to excellence and innovation.',
    },
    {
        id: 6,
        image: '/mail_google_com/Untitled design (6).png',
        title: 'Company Six',
        description: 'Leaders in sustainable business practices.',
    },
    {
        id: 7,
        image: '/mail_google_com/Untitled design (7).png',
        title: 'Company Seven',
        description: 'Experts in industry-leading solutions.',
    },
    {
        id: 8,
        image: '/mail_google_com/Untitled design (8).png',
        title: 'Company Eight',
        description: 'Providing outstanding customer service.',
    },
    {
        id: 9,
        image: '/mail_google_com/Untitled design (9).png',
        title: 'Company Nine',
        description: 'Innovating for a better future.',
    },
    {
        id: 10,
        image: '/mail_google_com/Untitled design (10).png',
        title: 'Company Ten',
        description: 'Driven by passion and results.',
    },
    {
        id: 11,
        image: '/mail_google_com/Untitled design (11).png',
        title: 'Company Eleven',
        description: 'Global leaders in our industry.',
    },
    {
        id: 12,
        image: '/mail_google_com/Untitled design (12).png',
        title: 'Company Twelve',
        description: 'Your partner in business excellence.',
    },
    {
        id: 13,
        image: '/mail_google_com/Untitled design (13).png',
        title: 'Company Thirteen',
        description: 'Innovation and quality at its best.',
    },
];

    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3000, // Delay between slides in milliseconds
                disableOnInteraction: false, // Allows continuous scrolling even after interaction
            }}
            loop={true} // Enable continuous loop mode
            style={{ width: '100%', height: '300px' }}
        >
            {companies.map(company => (
                <SwiperSlide key={company.id}>
                    <div className="card" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                        <img src={company.image} alt={company.title} className="card-img-top" style={{ maxHeight: '150px', width: 'auto', margin: 'auto' }} />
                        <div className="card-body">
                            <h5 className="card-title">{company.title}</h5>
                            <p className="card-text">{company.description}</p>
                            <Link href={`/companies/${company.id}`} className="btn btn-primary">Learn More</Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderReels;
