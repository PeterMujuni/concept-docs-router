// rrd
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg"

//components
import Nav from "../components/Nav";

// helper
import { fetchData } from "../helpers";

// lodaer
export function MainLoader() {
	const userName = fetchData("userName");
	return { userName };
}

const Main = () => {
	const { userName } = useLoaderData();

	return (
		<div className="layout">
			<header>
				<Nav userName={userName} />
			</header>
			<main>
				<Outlet />
			</main>
			<img src={wave} alt="" />
		</div>
	);
};

export default Main;
