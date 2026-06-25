'use client';
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Image from "next/image";
import contactBg from '@/assets/images/home-1/contact-form-bg.png';

const ContactForm3 = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="contact-form relative overflow-hidden w-full min-h-[900px] py-[70px] md:pt-[135px] md:pb-[139px] fade-in">
        <Image
          src={contactBg}
          alt="Contact section background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="container relative z-10">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 text-center mb-10 md:mb-[70px]">
                    <h2
                        className="section-subtitle font-satisfy font-normal subtitle text-Deep-Teal flex items-center justify-center gap-[15px]">
                        <span>
                            <svg width="13" height="30" viewBox="0 0 13 30" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z"
                                    fill="#0F3435" />
                            </svg>
                        </span>
                        News &amp; Blogs
                    </h2>
                    <h1 className="skew-up title font-plus-jakarta-sans font-semibold text-Deep-Teal">
                        Get Every Single Updates</h1>
                </div>
                <div className="col-span-12">
                    <form className="bg-Beer px-5 md:px-8 py-6 md:py-10 rounded-lg" action="#">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                                <div className="relative">
                                    <input type="text" id="event-name"
                                        className="block pb-2.5 pt-4 w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 appearance-none focus:outline-none focus:ring-0 text-Deep-Teal peer placeholder:text-Deep-Teal/70"
                                        placeholder=" "/>
                                    <label htmlFor="event-name"
                                        className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Event-Name</label>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <select id="countries"
                                    defaultValue="Number-Of-People"
                                    className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal w-full border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 bg-Beer cursor-pointer pb-2.5 pt-4 px-0 outline-0 focus:outline-0 focus:ring-0 appearance-none arrows text-left">
                                    <option className="bg-Beer text-Deep-Teal">Number-Of-People</option>
                                    <option className="bg-Beer text-Deep-Teal">1 Person</option>
                                    <option className="bg-Beer text-Deep-Teal">2 Person</option>
                                    <option className="bg-Beer text-Deep-Teal">3 Person</option>
                                    <option className="bg-Beer text-Deep-Teal">4 Person</option>
                                </select>
                            </div>
                            <div className="col-span-4">
                                {/* <input type="text"
                                    className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-white block pb-2.5 pt-4 w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 border-dashed border-International-Orange appearance-none focus:outline-none focus:ring-0 placeholder:text-white px-0 calender"
                                    id="datepicker" autocomplete="off" placeholder="2024-10-01"/> */}
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal block pb-2.5 pt-4 w-full border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 appearance-none focus:outline-none focus:ring-0 placeholder:text-Deep-Teal/70 px-0 calender"/>
                            </div>
                            <div className="col-span-4">
                                <select id="time"
                                    defaultValue="06:00 PM"
                                    className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal w-full border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 bg-Beer cursor-pointer pb-2.5 pt-4 px-0 outline-0 focus:outline-0 focus:ring-0 appearance-none arrows text-left">
                                    <option className="bg-Beer text-Deep-Teal">06:00 PM</option>
                                    <option className="bg-Beer text-Deep-Teal">07:00 PM</option>
                                    <option className="bg-Beer text-Deep-Teal">08:00 PM</option>
                                    <option className="bg-Beer text-Deep-Teal">09:00 PM</option>
                                </select>
                            </div>
                            <div className="col-span-4">
                                <div className="relative">
                                    <input type="text" id="Your-name"
                                        className="block pb-2.5 pt-4 w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 appearance-none focus:outline-none focus:ring-0 peer text-Deep-Teal placeholder:text-Deep-Teal/70"
                                        placeholder=" "/>
                                    <label htmlFor="Your-name"
                                        className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your
                                        name</label>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="relative">
                                    <input type="text" id="your-email"
                                        className="block pb-2.5 pt-4 w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 appearance-none focus:outline-none focus:ring-0 peer text-Deep-Teal placeholder:text-Deep-Teal/70"
                                        placeholder=" "/>
                                    <label htmlFor="your-email"
                                        className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your-Email</label>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="relative">
                                    <input type="text" id="phone"
                                        className="block pb-2.5 pt-4 w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 appearance-none focus:outline-none focus:ring-0 peer text-Deep-Teal placeholder:text-Deep-Teal/70"
                                        placeholder=" "/>
                                    <label htmlFor="phone"
                                        className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone</label>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="relative">
                                    <textarea type="text" id="textarea" rows="6"
                                        className="block pb-2.5 pt-4 w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 border-dashed border-Deep-Teal/70 appearance-none focus:outline-none focus:ring-0 peer text-Deep-Teal placeholder:text-Deep-Teal/70"
                                        placeholder=" "></textarea>
                                    <label htmlFor="textarea"
                                        className="font-jost font-normal text-[14px] md:text-[18px] leading-[26px] text-Deep-Teal absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">tell
                                        us more about event (optional)</label>
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-center">
                                <Link href="#"
                                    className="btn inline-flex items-center justify-center gap-[7px] font-jost font-medium text-[14px] md:text-[18px] leading-[26px] bg-Beer border border-Deep-Teal text-Deep-Teal py-[8px] md:py-[22.5px] px-[20px] md:px-[31px] mt-[26px] rounded-md"
                                    style={{ color: '#0F3435' }}>
                                    <span className="btn__ink"></span>
                                    <div className="btn__inner text-Deep-Teal" style={{ color: '#0F3435' }}>Book A Table</div>
                                    <span>
                                        <svg width="7" height="11" viewBox="0 0 7 11" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.23096 5.78125L1.66846 10.4062C1.51221 10.5625 1.26221 10.5625 1.13721 10.4062L0.512207 9.78125C0.355957 9.625 0.355957 9.40625 0.512207 9.25L4.19971 5.5L0.512207 1.78125C0.355957 1.625 0.355957 1.375 0.512207 1.25L1.13721 0.625C1.26221 0.46875 1.51221 0.46875 1.66846 0.625L6.23096 5.25C6.38721 5.40625 6.38721 5.625 6.23096 5.78125Z"
                                                fill="#0F3435" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default ContactForm3;
