// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//layout
import Main, { MainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";

// routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";


const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		loader: MainLoader,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Dashboard />,
				loader: dashboardLoader,
				action: dashboardAction,
				errorElement: <Error />,
			},
			{
				path: "logout",
				action: logoutAction,
			},
		],
	},
]);

const App = () => {
	return (
		<div className="App">
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
};

export default App;
