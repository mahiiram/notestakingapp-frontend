import React from "react";

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Username from "./Components/Username";
import Password from "./Components/Password";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Recovery from "./Components/Recovery";
import Reset from "./Components/Reset";
import { AuthorizeUser,ProtectRoute } from "./middleware/auth";
import Home from "./Components/Home";
import CreateNote from "./Components/CreateNote";
import Allnotescard from "./Components/Allnotescard";
import UpdateNote from "./Components/UpdateNote";

const router = createBrowserRouter([
  {
    path:"/login",
    element:<div><Username/></div>
  },
  {
    path:"/password",
    element:<ProtectRoute><Password/></ProtectRoute>
  },
  {
    path:"/register",
    element:<div><Register/></div>
  },
  {
    path:"/profile",
    element:<ProtectRoute><Profile/></ProtectRoute>
  },
  {
    path:"/recovery",
    element:<div><Recovery/></div>
  },
  {
    path:"/reset",
    element:<div><Reset/></div>
  },
  {
    path:"/",
    element:<div><Home/></div>
  },
  {
    path:"/create",
    element:<ProtectRoute><CreateNote/></ProtectRoute>
  },
  {
    path:"/update/:id",
    element:<ProtectRoute><UpdateNote/></ProtectRoute>
  },
  {
    path:"/allnotes",
    element:<ProtectRoute><Allnotescard/></ProtectRoute>
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={router}>

      </RouterProvider>
    </main>
  );
}

export default App;