import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../Hook/useSearch";
import styled from "styled-components";
import { IMovie } from "../Components/api";
import { NEXFLIX_LOGO_URL, makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 60px;
  gap: 150px;
`;

const Section = styled.div`
  flex-direction: row;
`;

const Category = styled.div`
  margin: 50px 0 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.white.lighter};
`;

const Text = styled.div`
  font-size: 50px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  font-size: 66px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  position: relative;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    zIndex: 2,
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    zIndex: 2,
  },
};

const offset = 6;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    // if (data) {
    //   if (leaving) return;
    //   toggleLeaving();
    //   const totalMovies = data.results.length - 1;
    //   const maxIndex = Math.floor(totalMovies / offset) - 1;
    //   setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    // }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const [
    { isLoading: loadingMvResult, data: mvResult },
    { isLoading: loadingTvResult, data: tvResult },
  ] = useSearch(keyword!);

  return (
    <>
      {!loadingMvResult && !loadingTvResult && (
        <>
          {mvResult.length === 0 && tvResult.length === 0 ? (
            <Text>No Results.</Text>
          ) : (
            <Wrapper>
              <Section>
                <Category>Movies</Category>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    onClick={increaseIndex}
                    variants={rowVariants}
                    transition={{ type: "tween", duration: 1 }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    key={index}
                  >
                    {mvResult?.results
                      .slice(1)
                      .slice(offset * index, offset * index + offset)
                      .map((movie: IMovie) => (
                        <Box
                          layoutId={movie.id + ""}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVariants}
                          transition={{
                            type: "tween",
                            duration: 0.1,
                            delay: 0.5,
                          }}
                          bgPhoto={makeImagePath(
                            movie.backdrop_path ||
                              movie.poster_path ||
                              NEXFLIX_LOGO_URL,
                            "w500"
                          )}
                          onClick={() => onBoxClicked(movie.id)}
                        >
                          <Info
                            variants={infoVariants}
                            transition={{
                              type: "tween",
                              duration: 0.1,
                              delay: 0.5,
                            }}
                          >
                            <h4>{movie.title}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Section>
              <Section>
                <Category>Tv</Category>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    onClick={increaseIndex}
                    variants={rowVariants}
                    transition={{ type: "tween", duration: 1 }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    key={index}
                  >
                    {tvResult?.results
                      .slice(1)
                      .slice(offset * index, offset * index + offset)
                      .map((tv: IMovie) => (
                        <Box
                          layoutId={tv.id + ""}
                          key={tv.id}
                          whileHover="hover"
                          initial="normal"
                          variants={boxVariants}
                          transition={{
                            type: "tween",
                            duration: 0.1,
                            delay: 0.5,
                          }}
                          bgPhoto={makeImagePath(
                            tv.backdrop_path ||
                              tv.poster_path ||
                              NEXFLIX_LOGO_URL,
                            "w500"
                          )}
                          onClick={() => onBoxClicked(tv.id)}
                        >
                          <Info
                            variants={infoVariants}
                            transition={{
                              type: "tween",
                              duration: 0.1,
                              delay: 0.5,
                            }}
                          >
                            <h4>{tv.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Section>
            </Wrapper>
          )}
        </>
      )}
    </>
  );
}

export default Search;
