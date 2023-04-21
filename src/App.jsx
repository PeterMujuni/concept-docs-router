// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//layout
import Main, { MainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

// routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import Error from "./pages/Error";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";


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
				path: "budget/:id",
				element: <BudgetPage />,
				loader: budgetLoader,
				action: budgetAction,
				errorElement: <Error />,
				children: [
					{
						path: "delete",
						action: deleteBudget,
					}
				]
			},
			{
				path: "expenses",
				element: <ExpensesPage />,
				loader: expensesLoader,
				action: expensesAction,
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
