import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./Routers.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import { Toaster } from "@/components/ui/toaster"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <RouterProvider router={AppRouter} />
        <Toaster/>
        <ToastContainer />
      </SocketContextProvider>
    </Provider>
  </React.StrictMode>
);
