import React, { useState, useEffect, useContext } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Movies.css";
import LoadingAnimate from "../context/ContextLoading";
import { Typography, Container } from "@mui/material";
import SwiperComp from "../Swiper/Swiper";
import fetchData from "../../fetchData/fetch";
const getMovies = async (query, lang) => {
  const resData = await fetchData(
    `https://api.themoviedb.org/3/search/movie`,
    `${query}&language=${lang}`
  );
  return resData;
};
function Movies() {
  const [actionMovies, setActionMovies] = useState(null);
  const [comedyMovies, setComedyMovies] = useState(null);

  const [HorrorMovies, setHorrorMovies] = useState(null);
  const [RomanceMovies, setRomanceMovies] = useState(null);
  const { language } = useContext(LoadingAnimate);

  useEffect(() => {
    // action movies

    const getData = async () => {
      const getActionMovies = await fetchData(
        "https://api.themoviedb.org/3/discover/movie",
        `&with_genres=28&language=${language}`
      );
      setActionMovies(getActionMovies);
      const comedyMoviesData = await fetchData(
        "https://api.themoviedb.org/3/discover/movie",
        `&with_genres=35&language=${language}`
      );
      setComedyMovies(comedyMoviesData);
      const HorrorMoviesData = await getMovies("horror", language);
      setHorrorMovies(HorrorMoviesData);
      const RomanceMoviesData = await await fetchData(
        "https://api.themoviedb.org/3/discover/movie",
        `&with_genres=10752&language=${language}`
      );
      setRomanceMovies(RomanceMoviesData);
    };
    getData();
  }, [language]);

  return (
    <Container maxWidth="xl">
      <Typography
        sx={{ fontSize: "25px", color: "#DFF6FF", fontWeight: "bold" }}
      >
        Action
      </Typography>
      <SwiperComp data={actionMovies} />
      <Typography
        sx={{ fontSize: "25px", color: "#DFF6FF", fontWeight: "bold" }}
      >
        Comedy
      </Typography>
      <SwiperComp data={comedyMovies} className="moviesSwiper" />
      <Typography
        sx={{ fontSize: "25px", color: "#DFF6FF", fontWeight: "bold" }}
      >
        Horror
      </Typography>
      <SwiperComp data={HorrorMovies} className="moviesSwiper" />
      <Typography
        sx={{ fontSize: "25px", color: "#DFF6FF", fontWeight: "bold" }}
      >
        War
      </Typography>
      <SwiperComp data={RomanceMovies} />
    </Container>
  );
}

export default Movies;
