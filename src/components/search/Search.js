import React, { useState, useContext } from "react";
import { InputBase, Box, Stack } from "@mui/material";

import { Link } from "react-router-dom";
import fetchData from "../../fetchData/fetch";
import LoadingAnimate from "../context/ContextLoading";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const { language } = useContext(LoadingAnimate);
  const handelSearch = async (e) => {
    if (e.target.value.trim() == "") setSearchResult(null);
    setSearchValue(e.target.value);
    const GetMovieDetaill = await fetchData(
      `https://api.themoviedb.org/3/search/multi`,
      `${e.target.value}&language=${language}`
    );

    setSearchResult(GetMovieDetaill.results.slice(0, 10));
  };

  return (
    <>
      <InputBase
        sx={{
          backgroundColor: "#ffff",
          p: "0px 5px",
          borderRadius: "3px",
          color: "#06283D",
          boxShadow: "0px 0px 14px -3px #DFF6FF",
          boxSizing: "border-box",
          height: "40px",
          marginRight: "10px",
          transition: "1s",
          "& ::placeholder": {
            color: "#06283D",
            opacity: 0.8,
          },
        }}
        type="search"
        value={searchValue}
        placeholder={"Search"}
        onChange={handelSearch}
        size="medium"
      />

      <Stack
        sx={{
          position: "absolute",
          padding: `${searchResult ? "10px" : ""}`,
          boxSizing: "border-box",

          zIndex: "10",
          right: "0",
          top: "65px",
          width: "400px",
          minHeight: "0px",
          background: "#06283D",
        }}
        direction="column"
        spacing={2}
      >
        {searchResult &&
          searchResult?.map((movie) => {
            if (!movie.backdrop_path) return "";
            return (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                style={{ textDecoration: "none" }}
              >
                <Stack color={"white"} direction="row" bgcolor={"#14354fbf"}>
                  <Box
                    width={"30%"}
                    boxSizing={"border-box"}
                    sx={{
                      height: "fit-content",
                    }}
                    overflow={"hidden"}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                      width="80px"
                      height={"80px"}
                      style={{ borderRadius: "100%", marginLeft: "10px" }}
                      alt={movie.title || movie.name}
                    />
                  </Box>
                  <Box fontWeight={"700"} pt="20px" fontSize="19px">
                    {movie.title || movie.name}
                  </Box>
                </Stack>
              </Link>
            );
          })}
      </Stack>
    </>
  );
}

export default Search;
