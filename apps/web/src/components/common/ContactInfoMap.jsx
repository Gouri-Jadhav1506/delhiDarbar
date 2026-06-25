import React from "react";
import Link from "next/link";
import Image from "next/image";
import theEvening from "../../assets/images/home-1/hero-slider.png";

const ContactInfoMap = () => {
  return (
    <>
      <div className="contact-info-map fade-in">
        <div className="">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="relative w-full h-full flex items-center justify-center flex-col">
                <div className="py-10 lg:py-0 px-4 lg:px-0 relative z-[1]">
                  <h2 className="split-collab font-plus-jakarta-sans font-semibold text-[30px] md:text-[40px] lg:text-[85px] leading-[50px] lg:leading-[107px] text-white mb-[34px]">
                    This evening will <br />
                    be great!
                  </h2>
                  <p className="font-jost font-normal text-[20px] leading-[25px] mb-[43px] text-white">
                    Lorem Ipsum is that it has a more-or-less <br /> normal look
                    like readable English.{" "}
                  </p>
                  <div className="flex items-center justify-start gap-[87px] flex-col md:flex-row">
                    <Link
                      href="#"
                      className="btn font-josefinsans font-medium text-[22px] leading-[68px] text-International-Orange bg-white border border-International-Orange px-[50px]"
                    >
                      <span className="btn__ink"></span>
                      <div className="btn__inner">Book a Table</div>
                    </Link>
                    <Link
                      href="#"
                      className=" font-jost font-medium text-[22px] leading-[27px] text-white"
                    >
                      Get in touch
                    </Link>
                  </div>
                </div>
                <div className="img absolute top-0 left-0 w-full h-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={theEvening}
                    alt="Restaurant interior"
                    fill
                    sizes="50vw"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1737.6221882978507!2d-98.48650795000005!3d29.421653200000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c58aa57e6a56f%3A0xf08a9ad66f03e879!2sHenry+B.+Gonzalez+Convention+Center!5e0!3m2!1sen!2sus!4v1393884854786"
                width="100%"
                height="700"
                frameborder="0"
                style={{ border: "0" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfoMap;
