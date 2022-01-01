import * as React from "react";

// router
import { Link } from "react-router-dom";

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

export default function PostCard(props) {

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
			</Card>
		);
	});
}
