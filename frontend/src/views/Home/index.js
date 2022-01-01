import * as React from "react";
import { useEffect, useState } from "react";
import PostCard from "components/Card";

// redux
import { getAllPosts } from "components/slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";

// router
import { useNavigate } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import { teal } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

// axios
import axios from "axios";
import { Grid } from "@mui/material";

const Nav = React.lazy(() => import("components/Nav"));

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postData.allPosts);
	const status = useSelector((state) => state.postData.status);

	useEffect(() => {
		if (sessionStorage.getItem("user_data") === null) {
			navigate("/login");
		} else {
			dispatch(getAllPosts());
		}
	}, []);

	const renderCard = () => {
		if (posts.length === 0) {
			return (
				<Typography
					component="h3"
					sx={{ color: "#ffffff", marginLeft: 1 }}
				>
					Nothing to show here
				</Typography>
			);
		} else if (status === "loading") {
		} else {
			return <PostCard data={posts} />;
		}
	};

    const handleCreatePost = () => {
        navigate("/create-post")
    }

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
				<Box component="div" sx={{ width: "100%" }}>
					<Grid
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignSelf: "center",
							alignItems: "center",
							margin: 2,
						}}
					>
						<Avatar
							variant="rounded"
							sx={{
								bgcolor: teal[500],
								alignSelf: "center",
								width: 150,
								height: 50,
							}}
						>
							<DynamicFeedIcon />
							<Typography
								component="h3"
								sx={{ color: "#ffffff", marginLeft: 1 }}
							>
								Your feed
							</Typography>
						</Avatar>
						<Tooltip title="Create post" placement="bottom">
							<Fab
								color="secondary"
								aria-label="edit"
								sx={{ marginLeft: 3 }}
                                onClick={handleCreatePost}
							>
								<EditIcon />
							</Fab>
						</Tooltip>
					</Grid>

					<>{renderCard()}</>
				</Box>
			</Container>
		</>
	);
}

export default Home;
