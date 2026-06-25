'use client';
import Link from "next/link";
import Image from "next/image";
import img1 from "@/assets/images/blog-details/blog-details-1.png";
import img10 from "@/assets/images/blog-details/blog-details-10.png";
import img11 from "@/assets/images/blog-details/blog-details-11.png";
import img12 from "@/assets/images/blog-details/blog-details-12.png";
import img2 from "@/assets/images/blog-details/blog-details-2.png";
import img3 from "@/assets/images/blog-details/blog-details-3.png";
import img4 from "@/assets/images/blog-details/blog-details-4.png";
import img5 from "@/assets/images/blog-details/blog-details-5.png";
import img6 from "@/assets/images/blog-details/blog-details-6.png";
import img7 from "@/assets/images/blog-details/blog-details-7.png";
import img8 from "@/assets/images/blog-details/blog-details-8.png";
import img9 from "@/assets/images/blog-details/blog-details-9.png";

const BlogDetails = () => {
  return (
    <>
      {/* <!-- blog details --> */}
      <div className="service-details py-[150px] fade-in">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-12 col-span-8 order-1">
              <div className="left-bar">
                <div className="service-1 zoom-effect">
                  <div className="img overflow-hidden overlay-anim w-full h-full mb-[30px] wow zoom-effect">
                    <Image
                      className="w-full h-full"
                      src={img1}
                      alt=""
                    />
                  </div>
                  <h2 className="font-plus-jakarta-sans font-semibold text-[35px] leading-[50px] text-white mb-5">
                    Food is the foundation of true happiness
                  </h2>
                  <div className="publish-by-date flex items-center justify-start gap-4 font-nunito font-normal text-[16px] leading-[26px] text-white mb-[27px]">
                    <div className="flex items-center justify-start gap-2">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_487_3942"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                          >
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_487_3942)">
                            <path
                              d="M4.8724 14.2498C5.58073 13.7082 6.3724 13.2811 7.2474 12.9686C8.1224 12.6561 9.03906 12.4998 9.9974 12.4998C10.9557 12.4998 11.8724 12.6561 12.7474 12.9686C13.6224 13.2811 14.4141 13.7082 15.1224 14.2498C15.6085 13.6804 15.987 13.0346 16.2578 12.3123C16.5286 11.5901 16.6641 10.8193 16.6641 9.99984C16.6641 8.15262 16.0148 6.5797 14.7161 5.28109C13.4175 3.98248 11.8446 3.33317 9.9974 3.33317C8.15017 3.33317 6.57726 3.98248 5.27865 5.28109C3.98003 6.5797 3.33073 8.15262 3.33073 9.99984C3.33073 10.8193 3.46615 11.5901 3.73698 12.3123C4.00781 13.0346 4.38628 13.6804 4.8724 14.2498ZM9.9974 10.8332C9.17795 10.8332 8.48698 10.5519 7.92448 9.98942C7.36198 9.42692 7.08073 8.73595 7.08073 7.9165C7.08073 7.09706 7.36198 6.40609 7.92448 5.84359C8.48698 5.28109 9.17795 4.99984 9.9974 4.99984C10.8168 4.99984 11.5078 5.28109 12.0703 5.84359C12.6328 6.40609 12.9141 7.09706 12.9141 7.9165C12.9141 8.73595 12.6328 9.42692 12.0703 9.98942C11.5078 10.5519 10.8168 10.8332 9.9974 10.8332ZM9.9974 18.3332C8.84462 18.3332 7.76128 18.1144 6.7474 17.6769C5.73351 17.2394 4.85156 16.6457 4.10156 15.8957C3.35156 15.1457 2.75781 14.2637 2.32031 13.2498C1.88281 12.2359 1.66406 11.1526 1.66406 9.99984C1.66406 8.84706 1.88281 7.76373 2.32031 6.74984C2.75781 5.73595 3.35156 4.854 4.10156 4.104C4.85156 3.354 5.73351 2.76025 6.7474 2.32275C7.76128 1.88525 8.84462 1.6665 9.9974 1.6665C11.1502 1.6665 12.2335 1.88525 13.2474 2.32275C14.2613 2.76025 15.1432 3.354 15.8932 4.104C16.6432 4.854 17.237 5.73595 17.6745 6.74984C18.112 7.76373 18.3307 8.84706 18.3307 9.99984C18.3307 11.1526 18.112 12.2359 17.6745 13.2498C17.237 14.2637 16.6432 15.1457 15.8932 15.8957C15.1432 16.6457 14.2613 17.2394 13.2474 17.6769C12.2335 18.1144 11.1502 18.3332 9.9974 18.3332ZM9.9974 16.6665C10.7335 16.6665 11.428 16.5589 12.0807 16.3436C12.7335 16.1283 13.3307 15.8193 13.8724 15.4165C13.3307 15.0137 12.7335 14.7047 12.0807 14.4894C11.428 14.2741 10.7335 14.1665 9.9974 14.1665C9.26128 14.1665 8.56684 14.2741 7.91406 14.4894C7.26128 14.7047 6.66406 15.0137 6.1224 15.4165C6.66406 15.8193 7.26128 16.1283 7.91406 16.3436C8.56684 16.5589 9.26128 16.6665 9.9974 16.6665ZM9.9974 9.1665C10.3585 9.1665 10.6571 9.04845 10.8932 8.81234C11.1293 8.57623 11.2474 8.27762 11.2474 7.9165C11.2474 7.55539 11.1293 7.25678 10.8932 7.02067C10.6571 6.78456 10.3585 6.6665 9.9974 6.6665C9.63628 6.6665 9.33767 6.78456 9.10156 7.02067C8.86545 7.25678 8.7474 7.55539 8.7474 7.9165C8.7474 8.27762 8.86545 8.57623 9.10156 8.81234C9.33767 9.04845 9.63628 9.1665 9.9974 9.1665Z"
                              fill="#DF3F01"
                            />
                          </g>
                        </svg>{" "}
                      </span>
                      <span>By Admin</span>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_487_3953)">
                            <path
                              d="M12.9109 1.23203H12.3141V0.62814C12.3141 0.283106 12.0344 0.00341797 11.6894 0.00341797C11.3444 0.00341797 11.0647 0.283106 11.0647 0.62814V1.23203H4.9353V0.62814C4.9353 0.283106 4.65561 0.00341797 4.31058 0.00341797C3.96555 0.00341797 3.68586 0.283106 3.68586 0.62814V1.23203H3.08909C1.38576 1.23203 0 2.61779 0 4.32109V12.9072C0 14.6105 1.38576 15.9963 3.08909 15.9963H12.9109C14.6142 15.9963 16 14.6105 16 12.9072V4.32109C16 2.61779 14.6142 1.23203 12.9109 1.23203ZM3.08909 2.48147H3.68586V3.69968C3.68586 4.04471 3.96555 4.3244 4.31058 4.3244C4.65561 4.3244 4.9353 4.04471 4.9353 3.69968V2.48147H11.0647V3.69968C11.0647 4.04471 11.3444 4.3244 11.6894 4.3244C12.0345 4.3244 12.3141 4.04471 12.3141 3.69968V2.48147H12.9109C13.9253 2.48147 14.7506 3.30673 14.7506 4.32109V4.91789H1.24944V4.32109C1.24944 3.30673 2.0747 2.48147 3.08909 2.48147ZM12.9109 14.7469H3.08909C2.0747 14.7469 1.24944 13.9216 1.24944 12.9072V6.16733H14.7506V12.9072C14.7506 13.9216 13.9253 14.7469 12.9109 14.7469ZM5.54962 8.62458C5.54962 8.96961 5.26993 9.2493 4.9249 9.2493H3.69629C3.35126 9.2493 3.07157 8.96961 3.07157 8.62458C3.07157 8.27954 3.35126 7.99986 3.69629 7.99986H4.9249C5.2699 7.99986 5.54962 8.27954 5.54962 8.62458ZM12.9285 8.62458C12.9285 8.96961 12.6488 9.2493 12.3037 9.2493H11.0751C10.7301 9.2493 10.4504 8.96961 10.4504 8.62458C10.4504 8.27954 10.7301 7.99986 11.0751 7.99986H12.3037C12.6487 7.99986 12.9285 8.27954 12.9285 8.62458ZM9.23548 8.62458C9.23548 8.96961 8.95579 9.2493 8.61076 9.2493H7.38215C7.03712 9.2493 6.75743 8.96961 6.75743 8.62458C6.75743 8.27954 7.03712 7.99986 7.38215 7.99986H8.61076C8.95576 7.99986 9.23548 8.27954 9.23548 8.62458ZM5.54962 12.3104C5.54962 12.6555 5.26993 12.9352 4.9249 12.9352H3.69629C3.35126 12.9352 3.07157 12.6555 3.07157 12.3104C3.07157 11.9654 3.35126 11.6857 3.69629 11.6857H4.9249C5.2699 11.6857 5.54962 11.9654 5.54962 12.3104ZM12.9285 12.3104C12.9285 12.6555 12.6488 12.9352 12.3037 12.9352H11.0751C10.7301 12.9352 10.4504 12.6555 10.4504 12.3104C10.4504 11.9654 10.7301 11.6857 11.0751 11.6857H12.3037C12.6487 11.6857 12.9285 11.9654 12.9285 12.3104ZM9.23548 12.3104C9.23548 12.6555 8.95579 12.9352 8.61076 12.9352H7.38215C7.03712 12.9352 6.75743 12.6555 6.75743 12.3104C6.75743 11.9654 7.03712 11.6857 7.38215 11.6857H8.61076C8.95576 11.6857 9.23548 11.9654 9.23548 12.3104Z"
                              fill="#DF3F01"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_487_3953">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span>June 13</span>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_487_3946"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                          >
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_487_3946)">
                            <path
                              d="M1.66406 18.3332V3.33317C1.66406 2.87484 1.8274 2.48234 2.15406 2.15567C2.48017 1.82956 2.8724 1.6665 3.33073 1.6665H16.6641C17.1224 1.6665 17.5149 1.82956 17.8416 2.15567C18.1677 2.48234 18.3307 2.87484 18.3307 3.33317V13.3332C18.3307 13.7915 18.1677 14.184 17.8416 14.5107C17.5149 14.8368 17.1224 14.9998 16.6641 14.9998H4.9974L1.66406 18.3332ZM3.33073 14.3123L4.3099 13.3332H16.6641V3.33317H3.33073V14.3123Z"
                              fill="#DF3F01"
                            />
                          </g>
                        </svg>
                      </span>
                      <span>(05)</span>
                    </div>
                  </div>

                  <p className="font-jost font-normal text-base leading-[26px] text-white mb-10">
                    Lorem ipsum is simply free text used by copytyping
                    refreshing. Neque porro est qui dolorem ipsum quia quaed
                    inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Aelltes port lacus quis enim var sed
                    efficitur turpis gilla sed sit amet finibus eros. Lorem
                    Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the ndustry standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley
                  </p>
                </div>
                <div className="service-2 flex items-center justify-start gap-[25px] mb-10">
                  <div className="img overlay-anim zoom-effect overflow-hidden">
                    <Image
                      src={img2}
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <ul className="flex items-start justify-center flex-col gap-[23px]">
                      <li className="flex items-center justify-start gap-4 font-plus-jakarta-sans font-bold text-[18px] leading-[26px] text-white group hover:text-International-Orange transition-all ease-linear duration-300 cursor-pointer">
                        <span>
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_487_3967)">
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.2867 3.41785C23.919 3.04945 23.3222 3.04881 22.9545 3.41629L11.6511 14.6898L7.57286 10.2605C7.22047 9.87796 6.62467 9.85316 6.24152 10.2055C5.85865 10.5579 5.83414 11.154 6.18654 11.5368L10.929 16.6873C11.1027 16.8761 11.3458 16.9857 11.6021 16.991C11.6089 16.9913 11.6156 16.9913 11.6222 16.9913C11.8713 16.9913 12.1109 16.8924 12.2874 16.7165L24.2849 4.75042C24.6536 4.38299 24.6542 3.78626 24.2867 3.41785Z"
                                fill="white"
                              />
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.0578 11.5578C23.5374 11.5578 23.1156 11.9795 23.1156 12.5C23.1156 18.3537 18.3537 23.1156 12.5 23.1156C6.64668 23.1156 1.88442 18.3537 1.88442 12.5C1.88442 6.64668 6.64668 1.88442 12.5 1.88442C13.0204 1.88442 13.4422 1.46265 13.4422 0.942236C13.4422 0.421777 13.0204 0 12.5 0C5.60742 0 0 5.60742 0 12.5C0 19.3923 5.60742 25 12.5 25C19.3923 25 25 19.3923 25 12.5C25 11.9796 24.5782 11.5578 24.0578 11.5578Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath>
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span>Find information and begin your application</span>
                      </li>
                      <li className="flex items-center justify-start gap-4 font-plus-jakarta-sans font-bold text-[18px] leading-[26px] text-white group hover:text-International-Orange transition-all ease-linear duration-300 cursor-pointer">
                        <span>
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_487_3967)">
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.2867 3.41785C23.919 3.04945 23.3222 3.04881 22.9545 3.41629L11.6511 14.6898L7.57286 10.2605C7.22047 9.87796 6.62467 9.85316 6.24152 10.2055C5.85865 10.5579 5.83414 11.154 6.18654 11.5368L10.929 16.6873C11.1027 16.8761 11.3458 16.9857 11.6021 16.991C11.6089 16.9913 11.6156 16.9913 11.6222 16.9913C11.8713 16.9913 12.1109 16.8924 12.2874 16.7165L24.2849 4.75042C24.6536 4.38299 24.6542 3.78626 24.2867 3.41785Z"
                                fill="white"
                              />
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.0578 11.5578C23.5374 11.5578 23.1156 11.9795 23.1156 12.5C23.1156 18.3537 18.3537 23.1156 12.5 23.1156C6.64668 23.1156 1.88442 18.3537 1.88442 12.5C1.88442 6.64668 6.64668 1.88442 12.5 1.88442C13.0204 1.88442 13.4422 1.46265 13.4422 0.942236C13.4422 0.421777 13.0204 0 12.5 0C5.60742 0 0 5.60742 0 12.5C0 19.3923 5.60742 25 12.5 25C19.3923 25 25 19.3923 25 12.5C25 11.9796 24.5782 11.5578 24.0578 11.5578Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath>
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        We provide obtaining entry permits
                      </li>
                      <li className="flex items-center justify-start gap-4 font-plus-jakarta-sans font-bold text-[18px] leading-[26px] text-white group hover:text-International-Orange transition-all ease-linear duration-300 cursor-pointer">
                        <span>
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_487_3967)">
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.2867 3.41785C23.919 3.04945 23.3222 3.04881 22.9545 3.41629L11.6511 14.6898L7.57286 10.2605C7.22047 9.87796 6.62467 9.85316 6.24152 10.2055C5.85865 10.5579 5.83414 11.154 6.18654 11.5368L10.929 16.6873C11.1027 16.8761 11.3458 16.9857 11.6021 16.991C11.6089 16.9913 11.6156 16.9913 11.6222 16.9913C11.8713 16.9913 12.1109 16.8924 12.2874 16.7165L24.2849 4.75042C24.6536 4.38299 24.6542 3.78626 24.2867 3.41785Z"
                                fill="white"
                              />
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.0578 11.5578C23.5374 11.5578 23.1156 11.9795 23.1156 12.5C23.1156 18.3537 18.3537 23.1156 12.5 23.1156C6.64668 23.1156 1.88442 18.3537 1.88442 12.5C1.88442 6.64668 6.64668 1.88442 12.5 1.88442C13.0204 1.88442 13.4422 1.46265 13.4422 0.942236C13.4422 0.421777 13.0204 0 12.5 0C5.60742 0 0 5.60742 0 12.5C0 19.3923 5.60742 25 12.5 25C19.3923 25 25 19.3923 25 12.5C25 11.9796 24.5782 11.5578 24.0578 11.5578Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath>
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        Ut enim veniam, quis nostrud minim exerc
                      </li>
                      <li className="flex items-center justify-start gap-4 font-plus-jakarta-sans font-bold text-[18px] leading-[26px] text-white group hover:text-International-Orange transition-all ease-linear duration-300 cursor-pointer">
                        <span>
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_487_3967)">
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.2867 3.41785C23.919 3.04945 23.3222 3.04881 22.9545 3.41629L11.6511 14.6898L7.57286 10.2605C7.22047 9.87796 6.62467 9.85316 6.24152 10.2055C5.85865 10.5579 5.83414 11.154 6.18654 11.5368L10.929 16.6873C11.1027 16.8761 11.3458 16.9857 11.6021 16.991C11.6089 16.9913 11.6156 16.9913 11.6222 16.9913C11.8713 16.9913 12.1109 16.8924 12.2874 16.7165L24.2849 4.75042C24.6536 4.38299 24.6542 3.78626 24.2867 3.41785Z"
                                fill="white"
                              />
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.0578 11.5578C23.5374 11.5578 23.1156 11.9795 23.1156 12.5C23.1156 18.3537 18.3537 23.1156 12.5 23.1156C6.64668 23.1156 1.88442 18.3537 1.88442 12.5C1.88442 6.64668 6.64668 1.88442 12.5 1.88442C13.0204 1.88442 13.4422 1.46265 13.4422 0.942236C13.4422 0.421777 13.0204 0 12.5 0C5.60742 0 0 5.60742 0 12.5C0 19.3923 5.60742 25 12.5 25C19.3923 25 25 19.3923 25 12.5C25 11.9796 24.5782 11.5578 24.0578 11.5578Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath>
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        Apply to travel, study, work or immigrate
                      </li>
                      <li className="flex items-center justify-start gap-4 font-plus-jakarta-sans font-bold text-[18px] leading-[26px] text-white group hover:text-International-Orange transition-all ease-linear duration-300 cursor-pointer">
                        <span>
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_487_3967)">
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.2867 3.41785C23.919 3.04945 23.3222 3.04881 22.9545 3.41629L11.6511 14.6898L7.57286 10.2605C7.22047 9.87796 6.62467 9.85316 6.24152 10.2055C5.85865 10.5579 5.83414 11.154 6.18654 11.5368L10.929 16.6873C11.1027 16.8761 11.3458 16.9857 11.6021 16.991C11.6089 16.9913 11.6156 16.9913 11.6222 16.9913C11.8713 16.9913 12.1109 16.8924 12.2874 16.7165L24.2849 4.75042C24.6536 4.38299 24.6542 3.78626 24.2867 3.41785Z"
                                fill="white"
                              />
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.0578 11.5578C23.5374 11.5578 23.1156 11.9795 23.1156 12.5C23.1156 18.3537 18.3537 23.1156 12.5 23.1156C6.64668 23.1156 1.88442 18.3537 1.88442 12.5C1.88442 6.64668 6.64668 1.88442 12.5 1.88442C13.0204 1.88442 13.4422 1.46265 13.4422 0.942236C13.4422 0.421777 13.0204 0 12.5 0C5.60742 0 0 5.60742 0 12.5C0 19.3923 5.60742 25 12.5 25C19.3923 25 25 19.3923 25 12.5C25 11.9796 24.5782 11.5578 24.0578 11.5578Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath>
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        Dolor in reprehenderit voluptate velit esse
                      </li>
                      <li className="flex items-center justify-start gap-4 font-plus-jakarta-sans font-bold text-[18px] leading-[26px] text-white group hover:text-International-Orange transition-all ease-linear duration-300 cursor-pointer">
                        <span>
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_487_3967)">
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.2867 3.41785C23.919 3.04945 23.3222 3.04881 22.9545 3.41629L11.6511 14.6898L7.57286 10.2605C7.22047 9.87796 6.62467 9.85316 6.24152 10.2055C5.85865 10.5579 5.83414 11.154 6.18654 11.5368L10.929 16.6873C11.1027 16.8761 11.3458 16.9857 11.6021 16.991C11.6089 16.9913 11.6156 16.9913 11.6222 16.9913C11.8713 16.9913 12.1109 16.8924 12.2874 16.7165L24.2849 4.75042C24.6536 4.38299 24.6542 3.78626 24.2867 3.41785Z"
                                fill="white"
                              />
                              <path
                                className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                                d="M24.0578 11.5578C23.5374 11.5578 23.1156 11.9795 23.1156 12.5C23.1156 18.3537 18.3537 23.1156 12.5 23.1156C6.64668 23.1156 1.88442 18.3537 1.88442 12.5C1.88442 6.64668 6.64668 1.88442 12.5 1.88442C13.0204 1.88442 13.4422 1.46265 13.4422 0.942236C13.4422 0.421777 13.0204 0 12.5 0C5.60742 0 0 5.60742 0 12.5C0 19.3923 5.60742 25 12.5 25C19.3923 25 25 19.3923 25 12.5C25 11.9796 24.5782 11.5578 24.0578 11.5578Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath>
                                <rect width="25" height="25" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        Bunt in culpa qui officia deserunt mollit anim
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="service-3">
                  <h2 className="font-plus-jakarta-sans font-semibold text-[30px] leading-[45px] text-white mb-5">
                    When Restaurant Menu Design Can Help
                  </h2>
                  <p className="font-jost font-normal text-base leading-[26px] text-white mb-10">
                    England dotted with a lush, green landscape, rustic villages
                    and throbbing with humanity. South Asian country that has
                    plenty to offer to visitors with its diverse wildlife .We
                    have helped students, business persons, tourists, clients
                    with medical needs. There are many variations of passages of
                    Lorem Ipsum available.
                  </p>
                  <div className="flex items-center justify-start gap-[34px] mb-10">
                    <div className=" overlay-anim zoom-effect overflow-hidden">
                      <Image
                        src={img3}
                        alt=""
                      />
                    </div>
                    <div className=" overlay-anim zoom-effect overflow-hidden">
                      <Image
                        src={img4}
                        alt=""
                      />
                    </div>
                  </div>
                  <h2 className="font-plus-jakarta-sans font-semibold text-[24px] leading-[32px] text-white mb-4">
                    We have been offering human translation services
                  </h2>
                  <p className="font-jost font-normal text-base leading-[26px] text-white mb-11">
                    Lorem ipsum is simply free text used by copytyping
                    refreshing. Neque porro est qui dolorem ipsum quia quaed
                    inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Aelltes port lacus quis enim var sed
                    efficitur turpis gilla sed sit amet finibus eros. Lorem
                    Ipsum
                  </p>

                  <h2 className="font-plus-jakarta-sans font-semibold text-[24px] leading-[32px] text-white mb-4">
                    We seize opportunities to innovate and grow
                  </h2>
                  <p className="font-jost font-normal text-base leading-[26px] text-white mb-[55px]">
                    Lorem ipsum is simply free text used by copytyping
                    refreshing. Neque porro est qui dolorem ipsum quia quaed
                    inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Aelltes port lacus quis enim var sed
                    efficitur turpis gilla sed sit amet finibus eros. Lorem
                    Ipsum
                  </p>
                </div>
                <hr className="border-Lime-Green/10 mb-[39px]" />
                <div className="publisher-info mb-[34px]">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 col-12">
                      <div className="overlay-anim zoom-effect overflow-hidden">
                        <Image
                          className="w-full h-full"
                          src={img5}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-span-9 col-12">
                      <h2 className="font-plus-jakarta-sans font-semibold text-[30px] leading-[37px] text-white mb-5">
                        Jonas Lawrence
                      </h2>
                      <p className="font-jost font-normal text-base leading-[28px] text-white mb-[42px]">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit
                        sed do eiusmod tempor sed ut perspiciatis unde omnis
                        iste natus error sit voluptatem accusantium doloremque
                        laudantium totam rem aperiam eaque ipsa quae ab illo in
                      </p>
                      <ul className="flex items-center justify-start gap-5">
                        <li>
                          <Link
                            className="rounded-full w-[45px] h-[45px] inline-flex items-center justify-center text-International-Orange bg-Charcoal hover:bg-white transition-all ease-linear duration-300"
                            href="#"
                          >
                            <i className="fa-brands fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="rounded-full w-[45px] h-[45px] inline-flex items-center justify-center text-International-Orange bg-Charcoal hover:bg-white transition-all ease-linear duration-300"
                            href="#"
                          >
                            <i className="fa-brands fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="rounded-full w-[45px] h-[45px] inline-flex items-center justify-center text-International-Orange bg-Charcoal hover:bg-white transition-all ease-linear duration-300"
                            href="#"
                          >
                            <i className="fa-brands fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="rounded-full w-[45px] h-[45px] inline-flex items-center justify-center text-International-Orange bg-Charcoal hover:bg-white transition-all ease-linear duration-300"
                            href="#"
                          >
                            <i className="fa-brands fa-linkedin-in"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="next-prev-btn flex items-center justify-between mb-[51px] gap-6">
                  <div className="prev">
                    <div className="items-center bg-texture bg-no-repeat bg-cover bg-center py-[37px] px-[27px]">
                      <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-12 lg:col-span-3">
                          <Image
                            src={img6}
                            alt=""
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                          <h2 className="flex items-center justify-start gap-[10px] font-Poppins font-light text-base leading-6 text-International-Orange">
                            <i className="fa-solid fa-chevron-left"></i>{" "}
                            Previous
                          </h2>
                          <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                            This Place Really Place For Awesome
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="next">
                    <div className="items-center bg-texture bg-no-repeat bg-cover bg-center py-[37px] px-[27px]">
                      <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-12 lg:col-span-9 text-right">
                          <h2 className="flex items-center justify-end gap-[10px] font-Poppins font-light text-base leading-6 text-International-Orange">
                            Next
                            <i className="fa-solid fa-chevron-right"></i>
                          </h2>
                          <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                            This Place Really Place For Awesome
                          </p>
                        </div>
                        <div className="col-span-12 lg:col-span-3">
                          <Image
                            src={img7}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border-Lime-Green/10 mb-[39px]" />
                <div className="user-comment">
                  <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[30px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-[38px]">
                    Comments (2)
                  </h2>
                  <div className="commenting-show-area">
                    <div className="user-comment-item">
                      <div className="card-body user-comment-main">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="md:col-span-2">
                            <Image
                              className="w-[126px] h-[126px]"
                              src={img8}
                              alt=""
                            />
                          </div>
                          <div className="md:col-span-10 relative">
                            <button
                              type="button"
                              className="absolute top-0 right-0 border border-International-Orange text-International-Orange hover:bg-International-Orange hover:text-white font-Poppins font-medium text-[15px] leading-[40px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                            >
                              Reply
                            </button>
                            <p className="font-jost font-semibold text-xl leading-7 text-white">
                              Isaac Herman
                            </p>
                            <p className="font-nunito font-normal text-base leading-[26px] text-white mb-2">
                              June 14, 2023 / 12:00 AM
                            </p>
                            <p className="font-nunito font-normal text-base leading-[26px] text-white">
                              Imperdiet in nulla sed viverraut loremut dapib
                              estetur Lorem ipsum dolor sit amet eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut
                              eniy minim sed exe ullamco laboris nisi ut aliquip
                              cepteur
                            </p>
                          </div>
                        </div>
                        <hr className="border-Lime-Green/10 my-[39px]" />
                      </div>
                    </div>
                    <div className="user-comment-item">
                      <div className="card-body user-comment-replay pl-[49px]">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="md:col-span-2">
                            <Image
                              src={img9}
                              className="img img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="md:col-span-10 relative">
                            <button
                              type="button"
                              className="absolute top-0 right-0 border border-International-Orange text-International-Orange hover:bg-International-Orange hover:text-white font-Poppins font-medium text-[15px] leading-[40px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                            >
                              Reply
                            </button>
                            <p className="font-jost font-semibold text-xl leading-7 text-white">
                              Isaac Herman
                            </p>
                            <p className="font-nunito font-normal text-base leading-[26px] text-white mb-2">
                              June 14, 2023 / 12:00 AM
                            </p>
                            <p className="font-nunito font-normal text-base leading-[26px] text-white">
                              Imperdiet in nulla sed viverraut loremut dapib
                              estetur Lorem ipsum dolor sit amet eiusmod tempor
                              incididunt ut labore et dolore magna aliqua. Ut
                              eniy minim sed exe ullamco laboris nisi ut aliquip
                              cepteur
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comment-box mt-10">
                    <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[30px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-[38px]">
                      Leave a Reply
                    </h2>
                    <form className="grid grid-cols-12 gap-4">
                      <div className="md:col-span-6">
                        <input
                          type="text"
                          className="form-control w-full bg-transparent border-International-Orange/30"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="md:col-span-6">
                        <input
                          type="email"
                          className="form-control w-full bg-transparent border-International-Orange/30"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="col-span-12">
                        <input
                          type="url"
                          className="form-control w-full bg-transparent border-International-Orange/30"
                          placeholder="Website"
                        />
                      </div>
                      <div className="col-span-12">
                        <textarea
                          className="form-control  w-full bg-transparent border-International-Orange/30"
                          placeholder="Comment"
                          required
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="col-span-12">
                        <button
                          type="submit"
                          className="btn button primary-link-btn flex items-center justify-center gap-2 bg-International-Orange text-white px-[25px] rounded-[4px] font-nunito font-bold text-[18px] leading-[60px]"
                          data-abc="true"
                        >
                          <span className="btn__ink"></span>
                          <div className="btn__inner">Post Comment</div>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_462_148)">
                              <path
                                d="M19.5866 11H0.41235C0.184269 11 0 10.7715 0 10.4886C0 10.2058 0.184269 9.97723 0.41235 9.97723H18.5906L16.0881 6.87375C15.927 6.67399 15.927 6.34958 16.0881 6.14982C16.2492 5.95006 16.5108 5.95006 16.6718 6.14982L19.8792 10.1274C19.9977 10.2745 20.0325 10.4934 19.9681 10.6852C19.9036 10.8753 19.7529 11 19.5866 11Z"
                                fill="white"
                              ></path>
                              <path
                                d="M16.3435 14.4241C16.2384 14.4241 16.1333 14.3843 16.0538 14.3035C15.8935 14.1433 15.8935 13.883 16.0538 13.7228L19.2487 10.5279C19.4089 10.3677 19.6692 10.3677 19.8294 10.5279C19.9897 10.6882 19.9897 10.9484 19.8294 11.1087L16.6346 14.3035C16.5538 14.3843 16.4487 14.4241 16.3435 14.4241Z"
                                fill="white"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_462_148">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-span-4 order-1 order-2">
              <div className="right-bar position-sticky top-0">
                <form action="#" className="mb-[26px]">
                  <div className="relative bg-texture bg-no-repeat bg-cover bg-center py-[21px] px-8 flex items-center justify-start">
                    <input
                      className="w-full h-[55px] bg-transparent border-International-Orange rounded-tl-[4px] rounded-bl-[4px]"
                      type="text"
                      placeholder="Search"
                    />
                    <button
                      className="bg-International-Orange w-[64px] h-[55px] rounded-tr-[4px] rounded-br-[4px] flex items-center justify-center"
                      type="submit"
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.41732 0.645996C3.68086 0.645996 0.646484 3.68037 0.646484 7.41683C0.646484 11.1533 3.68086 14.1877 7.41732 14.1877C11.1538 14.1877 14.1882 11.1533 14.1882 7.41683C14.1882 3.68037 11.1538 0.645996 7.41732 0.645996ZM7.41732 1.68766C10.5798 1.68766 13.1465 4.25433 13.1465 7.41683C13.1465 10.5793 10.5798 13.146 7.41732 13.146C4.25482 13.146 1.68815 10.5793 1.68815 7.41683C1.68815 4.25433 4.25482 1.68766 7.41732 1.68766Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.2022 17.4647L12.2033 11.4668C12.0001 11.2637 11.6699 11.2637 11.4668 11.4668C11.2637 11.6699 11.2637 12.0001 11.4668 12.2033L17.4647 18.2022C17.6689 18.4053 17.998 18.4053 18.2022 18.2022C18.4053 17.998 18.4053 17.6689 18.2022 17.4647Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
                <div className="main-service bg-texture bg-no-repeat bg-cover bg-center py-[50px] px-8 mb-[30px]">
                  <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[24px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-11">
                    Main Services
                  </h2>
                  <ul className="flex items-start justify-start flex-col gap-7 w-full">
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="#"
                      >
                        App Development
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        SEO Marketing
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        SEO Analysis
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        SEO Optimization
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        Social Media
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        Marketing Strategy
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="popular-post bg-texture bg-no-repeat bg-cover bg-center py-[50px] px-8 mb-[30px]">
                  <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[24px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-11">
                    Popular Post
                  </h2>
                  <div className="popular-post-part flex items-start justify-start flex-col gap-7">
                    <div className="popular-post-item flex items-center justify-start gap-5">
                      <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-[1_0_110px]">
                        <Image
                          className="w-[110px] h-[110px]"
                          src={img10}
                          alt=""
                        />
                      </div>
                      <div className="content">
                        <div className="flex items-center justify-start gap-[34px] font-jost font-normal text-base leading-5 text-white mb-[18px]">
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.875 3.125H11.25V1.875C11.25 1.70924 11.1842 1.55027 11.0669 1.43306C10.9497 1.31585 10.7908 1.25 10.625 1.25C10.4592 1.25 10.3003 1.31585 10.1831 1.43306C10.0658 1.55027 10 1.70924 10 1.875V3.125H5V1.875C5 1.70924 4.93415 1.55027 4.81694 1.43306C4.69973 1.31585 4.54076 1.25 4.375 1.25C4.20924 1.25 4.05027 1.31585 3.93306 1.43306C3.81585 1.55027 3.75 1.70924 3.75 1.875V3.125H3.125C2.62772 3.125 2.15081 3.32254 1.79917 3.67418C1.44754 4.02581 1.25 4.50272 1.25 5V5.625H13.75V5C13.75 4.50272 13.5525 4.02581 13.2008 3.67418C12.8492 3.32254 12.3723 3.125 11.875 3.125Z"
                                fill="#DF3F01"
                              />
                              <path
                                d="M1.25 11.875C1.25 12.3723 1.44754 12.8492 1.79917 13.2008C2.15081 13.5525 2.62772 13.75 3.125 13.75H11.875C12.3723 13.75 12.8492 13.5525 13.2008 13.2008C13.5525 12.8492 13.75 12.3723 13.75 11.875V6.875H1.25V11.875Z"
                                fill="#DF3F01"
                              />
                            </svg>
                            June 13
                          </span>
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_486_3121)">
                                <path
                                  d="M1.66406 18.3337V3.33366C1.66406 2.87533 1.8274 2.48283 2.15406 2.15616C2.48017 1.83005 2.8724 1.66699 3.33073 1.66699H16.6641C17.1224 1.66699 17.5149 1.83005 17.8416 2.15616C18.1677 2.48283 18.3307 2.87533 18.3307 3.33366V13.3337C18.3307 13.792 18.1677 14.1845 17.8416 14.5112C17.5149 14.8373 17.1224 15.0003 16.6641 15.0003H4.9974L1.66406 18.3337ZM3.33073 14.3128L4.3099 13.3337H16.6641V3.33366H3.33073V14.3128Z"
                                  fill="#DF3F01"
                                />
                              </g>
                            </svg>
                            (05)
                          </span>
                        </div>
                        <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                          This Place Really Place For Awesome Moment
                        </p>
                      </div>
                    </div>
                    <div className="popular-post-item flex items-center justify-start gap-5">
                      <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-[1_0_110px]">
                        <Image
                          className="w-[110px] h-[110px]"
                          src={img11}
                          alt=""
                        />
                      </div>
                      <div className="content">
                        <div className="flex items-center justify-start gap-[34px] font-jost font-normal text-base leading-5 text-white mb-[18px]">
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.875 3.125H11.25V1.875C11.25 1.70924 11.1842 1.55027 11.0669 1.43306C10.9497 1.31585 10.7908 1.25 10.625 1.25C10.4592 1.25 10.3003 1.31585 10.1831 1.43306C10.0658 1.55027 10 1.70924 10 1.875V3.125H5V1.875C5 1.70924 4.93415 1.55027 4.81694 1.43306C4.69973 1.31585 4.54076 1.25 4.375 1.25C4.20924 1.25 4.05027 1.31585 3.93306 1.43306C3.81585 1.55027 3.75 1.70924 3.75 1.875V3.125H3.125C2.62772 3.125 2.15081 3.32254 1.79917 3.67418C1.44754 4.02581 1.25 4.50272 1.25 5V5.625H13.75V5C13.75 4.50272 13.5525 4.02581 13.2008 3.67418C12.8492 3.32254 12.3723 3.125 11.875 3.125Z"
                                fill="#DF3F01"
                              />
                              <path
                                d="M1.25 11.875C1.25 12.3723 1.44754 12.8492 1.79917 13.2008C2.15081 13.5525 2.62772 13.75 3.125 13.75H11.875C12.3723 13.75 12.8492 13.5525 13.2008 13.2008C13.5525 12.8492 13.75 12.3723 13.75 11.875V6.875H1.25V11.875Z"
                                fill="#DF3F01"
                              />
                            </svg>
                            June 13
                          </span>
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_486_3121)">
                                <path
                                  d="M1.66406 18.3337V3.33366C1.66406 2.87533 1.8274 2.48283 2.15406 2.15616C2.48017 1.83005 2.8724 1.66699 3.33073 1.66699H16.6641C17.1224 1.66699 17.5149 1.83005 17.8416 2.15616C18.1677 2.48283 18.3307 2.87533 18.3307 3.33366V13.3337C18.3307 13.792 18.1677 14.1845 17.8416 14.5112C17.5149 14.8373 17.1224 15.0003 16.6641 15.0003H4.9974L1.66406 18.3337ZM3.33073 14.3128L4.3099 13.3337H16.6641V3.33366H3.33073V14.3128Z"
                                  fill="#DF3F01"
                                />
                              </g>
                            </svg>
                            (05)
                          </span>
                        </div>
                        <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                          This Place Really Place For Awesome Moment
                        </p>
                      </div>
                    </div>
                    <div className="popular-post-item flex items-center justify-start gap-5">
                      <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-[1_0_110px]">
                        <Image
                          className="w-[110px] h-[110px]"
                          src={img12}
                          alt=""
                        />
                      </div>
                      <div className="content">
                        <div className="flex items-center justify-start gap-[34px] font-jost font-normal text-base leading-5 text-white mb-[18px]">
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.875 3.125H11.25V1.875C11.25 1.70924 11.1842 1.55027 11.0669 1.43306C10.9497 1.31585 10.7908 1.25 10.625 1.25C10.4592 1.25 10.3003 1.31585 10.1831 1.43306C10.0658 1.55027 10 1.70924 10 1.875V3.125H5V1.875C5 1.70924 4.93415 1.55027 4.81694 1.43306C4.69973 1.31585 4.54076 1.25 4.375 1.25C4.20924 1.25 4.05027 1.31585 3.93306 1.43306C3.81585 1.55027 3.75 1.70924 3.75 1.875V3.125H3.125C2.62772 3.125 2.15081 3.32254 1.79917 3.67418C1.44754 4.02581 1.25 4.50272 1.25 5V5.625H13.75V5C13.75 4.50272 13.5525 4.02581 13.2008 3.67418C12.8492 3.32254 12.3723 3.125 11.875 3.125Z"
                                fill="#DF3F01"
                              />
                              <path
                                d="M1.25 11.875C1.25 12.3723 1.44754 12.8492 1.79917 13.2008C2.15081 13.5525 2.62772 13.75 3.125 13.75H11.875C12.3723 13.75 12.8492 13.5525 13.2008 13.2008C13.5525 12.8492 13.75 12.3723 13.75 11.875V6.875H1.25V11.875Z"
                                fill="#DF3F01"
                              />
                            </svg>
                            June 13
                          </span>
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_486_3121)">
                                <path
                                  d="M1.66406 18.3337V3.33366C1.66406 2.87533 1.8274 2.48283 2.15406 2.15616C2.48017 1.83005 2.8724 1.66699 3.33073 1.66699H16.6641C17.1224 1.66699 17.5149 1.83005 17.8416 2.15616C18.1677 2.48283 18.3307 2.87533 18.3307 3.33366V13.3337C18.3307 13.792 18.1677 14.1845 17.8416 14.5112C17.5149 14.8373 17.1224 15.0003 16.6641 15.0003H4.9974L1.66406 18.3337ZM3.33073 14.3128L4.3099 13.3337H16.6641V3.33366H3.33073V14.3128Z"
                                  fill="#DF3F01"
                                />
                              </g>
                            </svg>
                            (05)
                          </span>
                        </div>
                        <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                          This Place Really Place For Awesome Moment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-tags bg-texture bg-no-repeat bg-cover bg-center py-[21px] px-8">
                  <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[24px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-11">
                    Popular Tags
                  </h2>
                  <ul className="flex items-center justify-start flex-wrap gap-[9px]">
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Social Media
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Digital
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Marketing
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Social
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        SEO Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        SEO{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Education
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        America
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Analysis
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- blog details --> */}
    </>
  );
};

export default BlogDetails;



