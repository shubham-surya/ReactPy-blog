import * as React from "react";
import { useEffect, useState } from "react";

// redux
import { createPost } from "components/slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";

// router
import { useNavigate } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SendIcon from '@mui/icons-material/Send';
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const Nav = React.lazy(() => import("components/Nav"));

function CreatePost() {
	const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
		title: "",
        content: "",
        id: JSON.parse(sessionStorage.getItem("user_data")).id
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = React.useState(false);
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

    const handleSubmit = (e) => {
		e.preventDefault();
        setLoading(true)
        var fd = new FormData();
        fd.append("title", values.title)
        fd.append("content", values.content)
        fd.append("id", values.id)
        if(dispatch(createPost(fd))){
            setLoading(false)
            navigate("/")
        }
        else{
            setLoading(false)
            setError(true)
        }
	};

	return (
		<>
			<Nav />
			<Container
				component="main"
				maxWidth="xs"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ width: "100%" }}>
                <Collapse in={error} sx={{marginTop: 3}}>
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
						Some error occured! Please try again
					</Alert>
				</Collapse>
					<Card sx={{ width:"100%", marginTop: 2 }}>
						<CardContent>
							<Typography component="h1" variant="h5">
								Create Post
							</Typography>
							<TextField
								margin="normal"
								required
								fullWidth
								id="title"
								label="Title"
								name="Title"
								variant="standard"
                                onChange={handleChange("title")}
								autoFocus
                                multiline
							/>
                            <TextField
								margin="normal"
								required
								fullWidth
								id="content"
								label="Content"
								name="Content"
								variant="standard"
                                onChange={handleChange("content")}
								autoFocus
                                multiline
							/>
                            <LoadingButton
                                type="submit"
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                sx={{
                                    float: "right",
                                    margin: 3
                                }}
                            >
                                Create
                            </LoadingButton>
						</CardContent>
					</Card>
				</Box>
			</Container>
		</>
	);
}

export default CreatePost;
