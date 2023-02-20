import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
<<<<<<< HEAD
const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
=======
import Questions from "./Questions";
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/questions", element: <Questions /> },
]);
>>>>>>> 807e9c3 (Created a quiziical game)
function App() {
    return <RouterProvider router={router} />;
}
export default App;
