//-Path: "uno-tool/src/Page.tsx"
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Main from "./content/main/Main";
import Display from "./content/Display";

export default function Page() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route index element={<Main />} />
				<Route path='/display' element={<Display />} />
			</>
		)
	);
	return <RouterProvider router={router} />;
}
