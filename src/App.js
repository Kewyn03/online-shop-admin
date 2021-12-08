import React, { useContext, useState } from 'react'
import LoginPage from "./components/loginPage/LoginPage";
import Bar from "./components/bar/Bar";
import UserPage from "./components/userPage/UserPage";
import { AuthContext } from './context/AuthContext'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import ItemPage from "./components/itemPage/ItemPage";
import OrdersPage from "./components/ordersPage/OrdersPage"
import ItemContextProvider from "./context/ItemContext";
import OrdersContextProvider from "./context/OrdersContext";
import UsersContextProvider from "./context/UsersContext";

function App() {


    const [isRole, setIsRole] = React.useState(false)


    return (
        <BrowserRouter>
            <AuthContext.Provider value={[isRole, setIsRole]}>
                <ItemContextProvider >
                    <OrdersContextProvider>
                        <UsersContextProvider>

                            <div className="App">


                                <Route path="/" exact component={LoginPage}/>

                                <Bar isRole={isRole}/>
                                <Route path='/main'>
                                    <MainPage/>
                                </Route>
                                <Route path='/users'>
                                    <UserPage/>
                                </Route>
                                <Route path='/items'>
                                    <ItemPage/>
                                </Route>
                                <Route path='/orders'>
                                    <OrdersPage/>
                                </Route>


                            </div>
                        </UsersContextProvider>
                    </OrdersContextProvider>
                </ItemContextProvider>
            </AuthContext.Provider>
        </BrowserRouter>

    );
}

export default App;
