import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "components/App/App";
import Bans from "components/Bans/Bans";
import Login from "components/Login/Login";
import AdminsPanel from "components/Main/components/AdminsPanel/AdminsPanel";
import NotFound from "components/NotFound/NotFound";
import Stats from "components/Stats/Stats";
import { createBrowserRouter } from "react-router-dom";
import Main from "components/Main/Main";

const queryClientAdmins = new QueryClient();
const queryClientBans = new QueryClient();
const queryClientStats = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Main />,
                errorElement: <NotFound />,
                children: [
                    {
                        path: "admins",
                        element:
                            <QueryClientProvider client={queryClientAdmins}>
                                <AdminsPanel />
                            </QueryClientProvider>  
                    },
                    {
                        path: "bans",
                        element:
                            <QueryClientProvider client={queryClientBans}>
                                <Bans />
                            </QueryClientProvider>  
                    },
                    {
                        path: "stats",
                        element:
                            <QueryClientProvider client={queryClientStats}>
                                <Stats />
                            </QueryClientProvider>  
                    },
                ]
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    
]);
  
export default router;