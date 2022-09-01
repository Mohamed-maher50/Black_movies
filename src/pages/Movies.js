import Card from "../components/Swiper/Card";
import { Container, Box, Stack } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimate from "../components/context/ContextLoading";
import fetchData from "../fetchData/fetch";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";
import SideMenu from "../components/sideMenu/SideMenu";
function Movies() {
  const { id } = useParams();
  const { language } = useContext(LoadingAnimate);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const GetData = async () => {
      const getMovies = await fetchData(
        "https://api.themoviedb.org/3/discover/movie",
        `&with_genres=${id}&language=${language}`
      );

      setMovies(getMovies);
    };

    GetData();
  }, [id, language]);
  if (movies == null) {
    return (
      <div className="Loading">
        <div className="tv"></div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <SideMenu />
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          width="100%"
          flexWrap="wrap"
          justifyContent={"space-between"}
        >
          {movies &&
            movies.results.map((item) => {
              return (
                <Box
                  height="300px"
                  key={item.key}
                  mx="auto"
                  mb="10px"
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
      <Footer />
    </>
  );
}

export default Movies;
