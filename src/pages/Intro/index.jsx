import React from 'react';
import IntoNavbar from '../../components/into/Navbar/Navbar';
import IntoHero from '../../components/into/Hero/Hero';
import IntoHero1 from '../../components/into/Hero1/Hero1';
import IntoTestimonials from '../../components/into/Testimonials/Testimonials';
import IntoFooter from '../../components/into/Footer/Footer';

const index = () => {
  return (
    <>
        <IntoNavbar/>
        <IntoHero/>
        <IntoHero1/>
        <IntoTestimonials/>
        <IntoFooter/>
    </>
  )
}

export default index