import { useEffect, useState } from "react";

import {Link, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import { deepOrange } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


import axios from "axios";

function Login() {

	const navigate = useNavigate();
	const [values, setValues] = useState({
		password: "",
		username: "",
		showPassword: true,
		loading: false,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true)
		var fd = new FormData();
		fd.append("username", values.username);
		fd.append("password", values.password);
		axios
			.post("http://127.0.0.1:5000/register", fd)
			.then((data) => {
				setLoading(false)
				navigate('/login')
			})
			.catch((error) => {
				setLoading(false)
				setError(true)
			});
		
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				component="form"
				onSubmit={(e) => handleSubmit(e)}
				sx={{
					marginTop: 8,
				}}
			>
				<Collapse in={error}>
					<Alert
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setError(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 2 }}
						severity="error"
					>
						Invalid Username or Password
					</Alert>
				</Collapse>
				<Paper
					elevation={3}
					variant="outlined"
					sx={{ backgroundColor: "#fff0e7", padding: 5, display: "flex", flexDirection: "column", alignItems: "center" }}
				>
					<Avatar
						sx={{ bgcolor: deepOrange[500], alignSelf: "center", marginBottom: 1 }}
					>
						<HowToRegIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						inputProps={{ minlength: "8" }}
						onChange={handleChange("username")}
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						id="password"
						type={values.showPassword ? "text" : "password"}
						inputProps={{ minlength: "8" }}
						onChange={handleChange("password")}
						autoComplete="current-password"
					/>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									defaultChecked
									onChange={handleClickShowPassword}
								/>
							}
							label="Show Password"
						/>
					</FormGroup>
					<LoadingButton
						type="submit"
						loading={loading}
						variant="contained"
						color="success"
						sx={{marginTop: 2}}
					>
						Submit
					</LoadingButton>
					<Link to="/login">Login?</Link>
				</Paper>
			</Box>
		</Container>
	);
}

export default Login;
