import React from 'react'
import HeroImg from '../../../assets/IntoPage/Hero.png';
import './hero.css';

const Hero = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="heroTitle title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Read your all notes and story
                            <br className="heroTitle hidden lg:inline-block" />anywhere and everywhere
                        </h1>
                        <p className="mb-8 leading-relaxed">By keeping track of document, you'll be prepared for any situation that arises.Stay equipped for whatever comes your way with organized Ensure your readiness for any situation by effectively managing notes, tasks and story.</p>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-1/2">
                        <img className="vert-move object-cover object-center rounded" alt="hero" src={HeroImg} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero