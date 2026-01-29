import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import WhyUs from '../components/home/WhyUs';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Hero />
                <Stats />
                <WhyUs />
                <Features />
                <Testimonials />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
