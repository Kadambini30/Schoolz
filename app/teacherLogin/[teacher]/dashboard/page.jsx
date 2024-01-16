import React from 'react';
import teacher from '../public/teacher.png';
import Image from 'next/image';
function page() {
	return (
		<div className="">
			<div className="flex justify-end pt-1 pr-2">
				<svg
					width="46"
					height="45"
					viewBox="0 0 46 45"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M23 0.416748C10.5733 0.416748 0.5 10.3035 0.5 22.5001C0.5 34.6967 10.5733 44.5834 23 44.5834C35.4268 44.5834 45.5 34.6967 45.5 22.5001C45.5 10.3035 35.4268 0.416748 23 0.416748ZM15.125 16.9792C15.125 15.9642 15.3287 14.9592 15.7244 14.0214C16.1202 13.0837 16.7003 12.2316 17.4315 11.5139C18.1628 10.7962 19.0309 10.2269 19.9864 9.83843C20.9418 9.45 21.9658 9.25008 23 9.25008C24.0342 9.25008 25.0582 9.45 26.0136 9.83843C26.9691 10.2269 27.8372 10.7962 28.5685 11.5139C29.2997 12.2316 29.8798 13.0837 30.2756 14.0214C30.6713 14.9592 30.875 15.9642 30.875 16.9792C30.875 19.0292 30.0453 20.9951 28.5685 22.4446C27.0916 23.8941 25.0886 24.7084 23 24.7084C20.9114 24.7084 18.9084 23.8941 17.4315 22.4446C15.9547 20.9951 15.125 19.0292 15.125 16.9792ZM37.0805 33.5064C35.3962 35.5858 33.2551 37.2649 30.8169 38.4182C28.3787 39.5715 25.7066 40.1692 23 40.1667C20.2934 40.1692 17.6213 39.5715 15.1831 38.4182C12.7449 37.2649 10.6038 35.5858 8.9195 33.5064C12.5668 30.9381 17.5438 29.1251 23 29.1251C28.4562 29.1251 33.4333 30.9381 37.0805 33.5064Z"
						fill="black"
					/>
				</svg>
			</div>
			<div className="flex justify-between mt-2 px-16">
				<div className='pt-16'>
					<div className="w-96 h-16 text-black text-5xl font-bold font-merriweather">
						Hello Meera,
					</div>
					<div class="w-96 h-28 text-black text-base font-normal font-['Jacques Francois']">
						Schoolz provides trained, passionate tutors to support the students
						with recovery from unfinished learning,remediation and enrichment!
					</div>
					<button class="group w-40 h-14 text-black text-xl font-normal font-jacques  bg-indigo-400 rounded-2xl drop-shadow-md hover:bg-indigo-300	 flex justify-center items-center gap-1">
						Add Course
						<svg
							className="group-hover:rotate-90 ease-in-out duration-500"
							width="11"
							height="10"
							viewBox="0 0 11 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.27654 0.21934C5.41869 0.0788896 5.61138 0 5.81228 0C6.01318 0 6.20587 0.0788896 6.34801 0.21934L10.644 4.46934C10.786 4.60997 10.8657 4.80059 10.8657 4.99934C10.8657 5.19809 10.786 5.38871 10.644 5.52934L6.34801 9.77934C6.20421 9.91175 6.01412 9.98385 5.8177 9.9805C5.62128 9.97714 5.43383 9.89858 5.29474 9.76134C5.15601 9.62374 5.0766 9.43829 5.07321 9.24397C5.06982 9.04965 5.1427 8.8616 5.27654 8.71934L8.27868 5.74934L0.758164 5.74934C0.557099 5.74934 0.36427 5.67032 0.222095 5.52967C0.0799208 5.38902 4.76837e-05 5.19825 4.76837e-05 4.99934C4.76837e-05 4.80043 0.0799208 4.60966 0.222095 4.46901C0.36427 4.32836 0.557099 4.24934 0.758164 4.24934L8.27868 4.24934L5.27654 1.27934C5.13457 1.13871 5.05483 0.948091 5.05483 0.74934C5.05483 0.550589 5.13457 0.359965 5.27654 0.21934Z"
								fill="black"
							/>
						</svg>
					</button>
				</div>
				<div>
					<Image
						src="/teacher.png"
						alt="Teacher Image"
						width={400}
						height={300}
					/>
				</div>
			</div>
			{/*lower part*/}
			<div className='w-screen h-content bg-blue-200 flex py-10 mt-3 justify-evenly'>
			<div class="w-72 h-80 bg-white rounded-2xl flex flex-col justify-center items-center gap-1 group cursor-pointer hover:scale-105 ease-in-out duration-300"><Image
						src="/calen.png"
						alt="Teacher Image"
						width={400}
						height={300}
					/>
					<div class="w-72 h-16 flex justify-center  text-black text-3xl font-normal font-jacques ">Check Schedule</div>
					</div>
			<div class="w-72 h-80 bg-white rounded-2xl flex flex-col group gap-1 cursor-pointer hover:scale-105 ease-in-out duration-300"><Image
						src="/clock.png"
						alt="Teacher Image"
						width={400}
						height={300}
					/>
					<div class="w-72 h-16 flex justify-center  text-black text-3xl font-normal font-jacques">Upcoming Classes</div>
					</div>
			<div class="w-72 h-80 bg-white rounded-2xl flex flex-col group gap-1 cursor-pointer hover:scale-105 ease-in-out duration-300"><Image
						src="/class.png"
						alt="Teacher Image"
						width={400}
						height={300}
						
					/>
					<div class="w-72 h-16 flex justify-center  text-black text-3xl font-normal font-jacques">Online Class</div>
					</div>
			</div>
		</div>
	);
}

export default page;
