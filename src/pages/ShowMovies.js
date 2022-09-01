import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Stack, Container, Typography, Rating } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";
import LoadingAnimate from "../components/context/ContextLoading";
import fetchData from "../fetchData/fetch";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function ShowMovies() {
  const { id } = useParams();

  const [movieDetaill, setMovieDetaill] = useState(null);

  const { language } = useContext(LoadingAnimate);

  useEffect(() => {
    const fetchMovieDetaill = async () => {
      const GetMovieDetaill = await fetchData(
        `https://api.themoviedb.org/3/movie/${id}`,
        `&language=${language}-us&append_to_response=credits,videos`
      );
      setMovieDetaill(GetMovieDetaill);
    };
    fetchMovieDetaill();
  }, [id, language]);

  if (movieDetaill == null)
    return (
      <div className="Loading">
        <div className="tv"></div>
      </div>
    );
  return (
    <>
      <Navbar />

      <Container maxWidth="xl">
        <Stack
          direction={"row"}
          spacing="10"
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
          }}
        >
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "flex",
              },
              width: {
                sm: "50%",
              },
            }}
            overflow={"hidden"}
          >
            {movieDetaill != null ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetaill.backdrop_path}`}
                width={"100%"}
                alt={movieDetaill.original_title}
              />
            ) : (
              ""
            )}
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "flex",
              },
              width: {
                sm: "50%",
              },
            }}
          >
            {movieDetaill && (
              <Box p="15px" textOverflow={"wrap"}>
                <Typography variant="h5">
                  {movieDetaill.original_title}
                </Typography>

                <Typography variant="h5">Overview</Typography>
                <Typography m={"10px 0px"} color={"#fff"} fontSize="18px">
                  {movieDetaill.overview}
                </Typography>
                <Rating
                  value={movieDetaill.vote_average * 0.5}
                  precision={0.5}
                  sx={{
                    ".MuiRating-iconEmpty": {
                      color: "#DFF6FF !important",
                    },
                  }}
                  readOnly
                />
                <Stack direction={"row"} spacing={"15px"} m={"10px 0px"}>
                  <Typography variant="h5">Language</Typography>
                  <Typography
                    color={"#fff"}
                    fontSize="25px"
                    sx={{
                      opacity: ".8",
                      lineHeight: "90px",
                    }}
                  >
                    {movieDetaill.original_language}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
        <Container sx={{ marginTop: "50px ", marginBottom: "50px" }}>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            centeredSlides={"auto"}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            slidesPerView={"auto"}
            spaceBetween={5}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            <Stack direction={"row"}>
              {movieDetaill.credits.cast.map((item) => {
                if (item.profile_path == null) return "";
                return (
                  <SwiperSlide>
                    <Link
                      to={`/Actor/profile/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Stack direction={"row"} m="auto">
                        <Box m="auto">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                            loading="lazy"
                            width="100px"
                            height={"100px"}
                            style={{
                              borderRadius: "100%",
                              display: "block",
                              margin: "auto",
                              boxShadow: "0px 0px 10px -3px #DFF6FF",
                            }}
                            alt={item.original_title}
                          />
                          <Box
                            textAlign={"center"}
                            variant="h1"
                            color={"#DFF6FF"}
                            fontWeight="bold"
                            m="5px"
                          >
                            {item.name}
                          </Box>
                          <Box textAlign={"center"} color={"#ffffffb5"}>
                            {item.character}
                          </Box>
                        </Box>
                      </Stack>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Stack>
          </Swiper>
        </Container>

        {movieDetaill != null ? (
          <Box display={"flex"} justifyContent="center" m="50px">
            {movieDetaill?.videos.results[0]?.key !== undefined ? (
              <>
                <iframe
                  width="860"
                  height="415"
                  src={`https://www.youtube.com/embed/${movieDetaill?.videos.results[0]?.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
              </>
            ) : (
              "this movies not find"
            )}
          </Box>
        ) : (
          ""
        )}
      </Container>
      <Footer />
    </>
  );
}

export default ShowMovies;
