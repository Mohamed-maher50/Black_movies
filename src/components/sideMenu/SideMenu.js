import { Typography } from "@mui/material";
import { Stack, Box, Container } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import fetchData from "../../fetchData/fetch";
import LoadingAnimate from "../context/ContextLoading";
function SideMenu() {
  const { language } = useContext(LoadingAnimate);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const categorieResults = await fetchData(
        "https://api.themoviedb.org/3/genre/movie/list",
        `&language=${language}`
      );

      setCategories(categorieResults);
      console.log(categorieResults);
    };
    getData();
  }, [language]);
  return (
    <Container maxWidth="xl">
      <Stack
        spacing={1}
        direction="row"
        flexWrap={"wrap"}
        justifyContent="center"
        display={"flex"}
        mb="30px"
      >
        {categories &&
          categories.genres.map((categ) => {
            return (
              <Link
                to={`/movies/${categ.id}`}
                key={categ.id}
                style={{
                  textDecoration: "none",
                }}
              >
                <Box p="5px" overflow={"hidden"}>
                  <Typography
                    variant="h5"
                    m="0px"
                    p="8px 15px"
                    bgcolor="#003d62"
                    borderRadius={"7px"}
                    boxShadow={"0px 5px 10px -4px #000"}
                    sx={{
                      transition: ".5s ease-in-out",

                      "&:hover": {
                        color: "#003d62",
                        background: "#DFF6FF",
                      },
                      fontSize: {
                        xs: "14px",
                        sm: "20px",
                      },
                    }}
                  >
                    {categ.name}
                  </Typography>
                </Box>
              </Link>
            );
          })}
      </Stack>
    </Container>
  );
}

export default SideMenu;
