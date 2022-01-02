import * as React from "react";

// router
import { Link } from "react-router-dom";

// redux
import { createComment } from "components/slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";

//  MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import { Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

export default function PostCard(props) {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.postData.status);
	const [comments, setComments] = React.useState([]);
	const [content, setContent] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);

	React.useEffect(() => {
		if (props.data[0].hasOwnProperty("comments")) {
			setComments(props.data[0].comments);
		}
	}, []);

	const handleChange = (e) => {
		setContent(e.target.value)
	}

	const handleClick = () => {
		setLoading(true);
		var fd = new FormData()
		fd.append("user_id", JSON.parse(sessionStorage.getItem("user_data")).id)
		fd.append("post_id", props.data[0].id)
		fd.append("content", content)
		if(dispatch(createComment(fd))){
			setComments({comment_content: content, username: JSON.parse(sessionStorage.getItem("user_data")).username})
			setLoading(false)			
		}
		if(dispatch(fd)){
			setLoading(false)
		}
	};

	const renderComments = () => {
		if (props.data[0].hasOwnProperty("comments")) {
			if (comments.length === 0) {
				return (
					<>
						<CardContent>
							<Typography component="h3" sx={{ marginLeft: 1 }}>
								No comments on this post yet.
							</Typography>
						</CardContent>
						<Grid
							sx={{
								display: "flex",
								flexDirection: "row",
								alignSelf: "center",
								alignItems: "center",
								margin: 2,
							}}
						>
							<Avatar
								sx={{
									bgcolor: deepOrange[500],
									width: 25,
									height: 25,
									marginRight: 1,
								}}
								aria-label="recipe"
							>
								{JSON.parse(sessionStorage.getItem("user_data")).username.charAt(0).toUpperCase()}
							</Avatar>
							<TextField
								label="Write a comment"
								id="standard-size-small"
								size="small"
								variant="standard"
								onChange={(e) => handleChange(e)}
								multiline
								sx={{ margin: 1 }}
							/>
							<LoadingButton
								onClick={handleClick}
								endIcon={<SendIcon />}
								loading={loading}
								loadingPosition="end"
								variant="contained"
								sx={{ marginLeft: 1 }}
							>
								Send
							</LoadingButton>
						</Grid>
					</>
				);
			} else {
				return (
					<>
						<CardContent>
							<Typography variant="h6" sx={{ margin: 1 }}>
								Comments
							</Typography>
							{comments.map((item) => {
								return (
									<>
										<Grid
											sx={{
												display: "flex",
												flexDirection: "row",
												alignSelf: "center",
											}}
										>
											<Avatar
												sx={{
													bgcolor: deepOrange[500],
													width: 25,
													height: 25,
													marginRight: 1,
												}}
												aria-label="recipe"
											>
												{item.username
													.charAt(0)
													.toUpperCase()}
											</Avatar>
											{item.username}
										</Grid>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{ marginBottom: 1 }}
										>
											{item.comment_content}
										</Typography>
									</>
								);
							})}
						</CardContent>
						<Grid
							sx={{
								display: "flex",
								flexDirection: "row",
								alignSelf: "center",
								alignItems: "center",
								margin: 2,
							}}
						>
							<Avatar
								sx={{
									bgcolor: deepOrange[500],
									width: 25,
									height: 25,
									marginRight: 1,
								}}
								aria-label="recipe"
							>
								{JSON.parse(sessionStorage.getItem("user_data")).username.charAt(0).toUpperCase()}
							</Avatar>
							<TextField
								label="Write a comment"
								id="standard-size-small"
								size="small"
								variant="standard"
								onChange={(e) => handleChange(e)}
								multiline
								sx={{ margin: 1 }}
							/>
							<LoadingButton
								onClick={handleClick}
								endIcon={<SendIcon />}
								loading={loading}
								loadingPosition="end"
								variant="contained"
								sx={{ marginLeft: 1 }}
							>
								Send
							</LoadingButton>
						</Grid>
					</>
				);
			}
		}
	};

	return props.data.map((item) => {
		return (
			<Card key={item.id} sx={{ maxWidth: 345, margin: 3 }}>
				<CardHeader
					sx={{ display: "flex" }}
					avatar={
						<Avatar
							sx={{ bgcolor: deepOrange[500] }}
							aria-label="recipe"
						>
							{item.username.charAt(0).toUpperCase()}
						</Avatar>
					}
					title={item.username}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{item.post_title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{item.post_content}
					</Typography>
				</CardContent>
				<Link to={`/post/${item.id}`}>
					<CardActions disableSpacing>
						<IconButton aria-label="comments">
							<ModeCommentRoundedIcon
								fontSize="small"
								sx={{ marginRight: 1 }}
							/>
							<Typography>{item.comment_count}</Typography>
						</IconButton>
					</CardActions>
				</Link>

				<>{renderComments()}</>
			</Card>
		);
	});
}
