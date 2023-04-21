// r
import React from "react";

// rrd
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";


// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// components
import BudgetItem from "../components/BudgetItem/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm/AddExpenseForm";
import Table from "../components/Table/Table";

// loader
export async function budgetLoader({ params }) {
	const budget = await getAllMatchingItems({
		category: "budgets",
		key: "id",
		value: params.id,
	})[0];
	
	const expenses = await getAllMatchingItems({
		category: "expenses",
		key: "budgetId",
		value: params.id,
	});
	
	if (!budget) {
		throw new Error("The budget you are trying to find does not exist");
	}

	return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
	const data = await request.formData();
	const { _action, ...values } = Object.fromEntries(data);

	// delete expense submission
	if (_action === "deleteExpense") {
		try {
			// delete expense
			deleteItem({ key: "expenses", id: values.expenseId });
			return toast.success(`Expense deleted!`);
		} catch (error) {
			throw new Error("There was a problem deleting your expense");
		}
	}

	// create expense submission
	if (_action === "createExpense") {
		try {
			// create expense
			createExpense({
				name: values.newExpense,
				amount: values.newExpenseAmount,
				budgetId: values.newExpenseBudget,
			});
			return toast.success(`Expense ${values.newExpense} created`);
		} catch (error) {
			throw new Error("There was a problem creating your expense");
		}
	}
}

const BudgetPage = () => {
	const { budget, expenses } = useLoaderData();
	return (
		<div className='grid-lg' style={{"--accent": budget.color}}>
			<h1 className='h2'>
				<span className='accent'>{budget.name}</span>{" "}
				Overview
			</h1>
			<div className="flex-lg">
				<BudgetItem budget={budget} showDelete={true}/>
				<AddExpenseForm budgets={[budget]} />
			</div>
			{
				expenses && expenses.length > 0 && (
					<div className="grid-md">
						<h2><span className="accent">{budget.name}</span></h2>
						<Table expenses={expenses} showBudget={false}/>
					</div>
				)
			}
		</div>
	);
};

export default BudgetPage;
