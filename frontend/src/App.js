import * as React from 'react';
import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

const Login = React.lazy(() => import("views/Login"))
const Register = React.lazy(() => import("views/Register"))
const Home = React.lazy(() => import("views/Home"))
const Post = React.lazy(() => import("views/Post"))
const CreatePost = React.lazy(() => import("views/CreatePost"))

function App() {

	React.useEffect( () => {
		
	}, [] )

	return (
		<div className="App">
            <React.Suspense fallback="loading...">
					<Router>
						<Routes>
							<Route exact={true} path='/' element={<Home/>} />
							<Route exact={true} path="/post/:id" element={<Post/>} />
							<Route exact={true} path="/create-post" element={<CreatePost/>} />
							<Route exact={true} path='/login' element={<Login/>} />
							<Route exact={true} path="/register" element={<Register/>} />
						</Routes>
					</Router>
            </React.Suspense>
			
		</div>
	);
}

export default App;
