import { Box, Typography, Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <Link to={`/movie/${item.id}`}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#333",
          height: "100%",
          color: "#fff",

          position: "relative",
          overflow: "hidden",
          "& .subBoxImage": {
            transform: "scale(1)",
            transition: "transform .5s ease-in-out",
            transformOrigin: "top",
          },
          "&:hover": {
            "& .subBox": {
              bottom: "0px",
            },
            "& .subBoxImage": {
              transform: "scale(1.2)",
            },
          },
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${
            item.backdrop_path || item.poster_path
          }`}
          width={"100%"}
          height={"100%"}
          className="subBoxImage"
          loading="lazy"
          alt={item.title}
        />
        <Box
          className="subBox"
          sx={{
            position: "absolute",
            bottom: "-80%",
            backgroundColor: "rgba(6 ,40, 61,.9)",
            width: "100%",
            height: "50%",
            color: "#DFF6FF",
            transition: ".5s ease-in-out",
            padding: "10px",
          }}
        >
          <Typography fontSize={"20px"} fontWeight={"bold"} color="#DBDFFD">
            {item.title}
          </Typography>
          <Rating
            value={item.vote_average * 0.5}
            defaultValue={1}
            precision={0.5}
            sx={{
              ".MuiRating-iconEmpty": {
                color: "#DFF6FF !important",
              },
            }}
            readOnly
          />
        </Box>
      </Box>
    </Link>
  );
}

export default Card;
