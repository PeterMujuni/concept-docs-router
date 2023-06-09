import React from "react";
import { Form, useFetcher } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../../assets/illustration.jpg";

const Intro = () => {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === "submitting";

	return (
		<div className='intro'>
			<div>
				<h1>
					Take Control of <span className='accent'>Your Money</span>
				</h1>
				<p>
					Personal budgeting is the secret to financial freedom. Start
					your journey today
				</p>
				<fetcher.Form method='post'>
					<input
						type='text'
						name='userName'
						id='userName'
						required
						placeholder='What is your name?'
						aria-label='Your Name'
						autoComplete='given-name'
					/>
					<input
						type='hidden'
						name='_action'
						value='newUser'
					/>
					<button
						type='submit'
						className='btn btn--dark'
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							"Creating account..."
						) : (
							<>
								<span>Create Account</span>
								<UserPlusIcon width={20} />
							</>
						)}
					</button>
				</fetcher.Form>
			</div>
			<img
				src={illustration}
				alt='Person with money'
				width={600}
			/>
		</div>
	);
};

export default Intro;
