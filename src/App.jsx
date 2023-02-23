import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Questions from "./Questions";
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/questions", element: <Questions /> },
]);
function App() {
    return <RouterProvider router={router} />;
}
export default App;
