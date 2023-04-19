// rrd
import { useLoaderData } from "react-router-dom";

// components
import Intro from "../components/Intro/Intro";

// helper
import { fetchData } from "../helpers";
import { toast } from "react-toastify";

// lodaer
export function dashboardLoader() {
	const userName = fetchData("userName");
	return { userName };
}

// action
export async function dashboardAction({request}) {
	const data = await request.formData()
	const FormData = Object.fromEntries(data)
	// const userName = data.get("userName")

	try {
		localStorage.setItem("userName", JSON.stringify(FormData.userName));
		return toast.success(`Welcome, ${FormData.userName}`);
	} catch (error) {
		throw new Error("There was a problem creating your account.");
	}
}

const Dashboard = () => {
	const { userName } = useLoaderData();

	return (
		<>
			{userName ? (<p>Welcome {userName}</p>) : <Intro /> }
		</>
	);
};

export default Dashboard;
