/* eslint-disable no-unused-vars */
// import { Input } from "../ui/input";
import Button from "../ui/button";
import mail from "../../assets/(landing)/icons/mail.svg";
import Input from "../ui/Input";
import { useState } from "react";

export default function NewsLetter() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleSubscribe = (e) => {
		e.preventDefault();
		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		// Clear input and error after successful validation
		setEmail("");
		setError("");
	};
	return (
		<form
			onSubmit={handleSubscribe}
			className="absolute left-0 right-0 -top-[10%] md:top-0 -translate-y-1/2 bg-white rounded-[30px] shadow-[0_4px_15px_0] shadow-black/20 text-black p-6 pt-[46px] pb-[60px] w-[90%] mx-auto max-w-[500px] md:max-w-[750px] lg:max-w-[950px] xl:max-w-[1111px] lg:pt-[51px] lg:pb-[82px]"
		>
			<h2 className="text-2xl font-semibold mb-5 text-center uppercase tracking-wide leading-normal md:text-3xl md:w-fit mx-auto lg:text-4xl max-w-[347px] md:max-w-none xl:text-[2.625rem]">
				JOIN MY TICKETSELLER PARTY COMMUNITY
			</h2>
			<p className="text-center mb-[45px] sm:text-lg max-w-[323px] sm:max-w-[340px] mx-auto md:max-w-none md:mb-[49px] lg:text-xl xl:text-2xl xl:mb-[64px ]">
				Sign up for our newsletter to get exclusive event access,
				discounts and updates.
			</p>
			<div className="md:flex flex-row gap-6 items-center md:w-[90%] md:mx-auto lg:max-w-[694px]">
				<div className="flex bg-white rounded-[30px] shadow-[0_4px_10px_0] shadow-black/20 transition-transform hover:scale-[1.02] items-center gap-4 py-4 px-6 mb-[30px] md:flex-1 md:mb-0">
					<img
						src={mail}
						alt="mail"
						width={25}
						height={25}
						className="lg:size-[32px]"
					/>
					<Input
						className="border-none shadow-none focus:!ring-0 p-0 placeholder:text-[#6E6D6D] md:text-lg"
						placeholder="Enter Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						required
					/>
				</div>

				<Button className="flex font-semibold bg-primary rounded-full h-14 e w-[157px] gap-[10px] text-lg lg:h-14 mx-auto cursor-pointer">
					Subscribe
				</Button>
			</div>
		</form>
	);
}
