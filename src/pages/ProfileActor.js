import { Container } from "@mui/system";
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import fetchData from "../fetchData/fetch";
import { Stack, Box, Typography, Pagination } from "@mui/material";
import Card from "../components/Swiper/Card";
import LoadingAnimate from "../components/context/ContextLoading";
import SideMenu from "../components/sideMenu/SideMenu";
function ProfileActor() {
  const { language } = useContext(LoadingAnimate);
  const { id } = useParams();
  const [Movies, setMovies] = useState(null);
  const [numberPage, setNumberPage] = useState(1);
  const movieNumber = 16;
  const startSlice = numberPage * movieNumber - movieNumber;
  const endSlice = numberPage * movieNumber;
  useEffect(() => {
    const GetData = async () => {
      const getActor = await fetchData(
        `https://api.themoviedb.org/3/person/${id}`,
        `&language=${language}&append_to_response=movie_credits`
      );

      setMovies(getActor);
    };

    GetData();
  }, [id, language]);

  const handleNumberPage = (event, value) => {
    setNumberPage(value);
  };
  return (
    <div>
      {Movies && (
        <>
          <Navbar />
          <SideMenu />
          <Container maxWidth="lg">
            <Box mb="50px">
              <img
                src={`https://image.tmdb.org/t/p/w500/${Movies.profile_path}`}
                width="200px"
                height={"200px"}
                style={{
                  borderRadius: "200px",
                  margin: "auto",
                  display: "block",
                  boxShadow: "0px 0px 50px -20px #DFF6FF",
                }}
                alt={Movies.name}
                loading="lazy"
              />
              <Typography
                variant="h4"
                textAlign={"center"}
                mt="20px"
                fontWeight={"bold"}
                color="#DFF6FF"
              >
                {Movies.name}
              </Typography>
            </Box>

            <Stack
              direction={"row"}
              width="100%"
              flexWrap="wrap"
              justifyContent={"space-between"}
            >
              {Movies.movie_credits.cast
                .slice(startSlice, endSlice)
                .map((item) => {
                  if (!(item.backdrop_path || item.poster_path)) return "";
                  return (
                    <Box
                      key={item.id}
                      height="300px"
                      mx="auto"
                      mb="20px"
                      sx={{
                        boxShadow: "0px 0px 50px -20px #DFF6FF",
                        borderRadius: "10px",
                        overflow: "hidden",
                        width: {
                          xs: "400px",
                          lg: "250px",
                        },
                      }}
                    >
                      <Card item={item} />
                    </Box>
                  );
                })}
            </Stack>
          </Container>

          {Movies.movie_credits.cast.length > movieNumber ? (
            <Pagination
              count={Math.round(Movies.movie_credits.cast.length / movieNumber)}
              defaultPage={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                "& li button": {
                  background: "#DFF6FF",
                },
              }}
              variant="outlined"
              shape="rounded"
              onChange={handleNumberPage}
            />
          ) : (
            ""
          )}

          <Footer />
        </>
      )}
    </div>
  );
}

export default ProfileActor;
