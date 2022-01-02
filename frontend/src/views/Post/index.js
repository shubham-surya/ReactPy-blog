import * as React from 'react';
import { useEffect, useState } from "react";
import PostCard from "components/Card";

// redux
import { getPost } from "components/slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";

// router
import { useParams, useNavigate } from "react-router-dom";

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
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

const Nav = React.lazy(() => import("components/Nav"))

function Post() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const post_id  = useParams();
	const singlePost = useSelector((state) => state.postData.singlePost);
	const status = useSelector((state) => state.postData.status);

	useEffect(() => {
        var fd = new FormData()
        fd.append("post_id", post_id.id)
		dispatch(getPost(fd));
	}, []);

	const handleCreatePost = () => {
        navigate("/create-post")
    }

	const renderCard = () => {
		if (singlePost.length === 0) {
			return (
				<Typography
					component="h3"
					sx={{ color: "#ffffff", marginLeft: 1, textAlign:"center"  }}
				>
					Nothing to show here
				</Typography>
			);
		}

        else if (status === 'loading'){

        }
        else{
            return (
                <PostCard data={singlePost}/>
            )
        }
	};

	return (
        <>
        <Nav/>
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Box component="div" sx={{width: "100%"}}>
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
							width: 100,
							height: 50,
						}}
					>
						<DynamicFeedIcon />
						<Typography
							component="h3"
							sx={{ color: "#ffffff", marginLeft: 1 }}
						>
							Post
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

export default Post;
