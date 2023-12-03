import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail } from "./api";
import { useQuery } from "react-query";
import { NEXFLIX_LOGO_URL, makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 10;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
  z-index: 15;
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
`;

function Detail() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const onOverlayClick = () => navigate("/");
  const { data: clickedMovie, isLoading } = useQuery(
    ["movieDetail", bigMovieMatch?.params.movieId],
    () => getMovieDetail(Number(bigMovieMatch?.params.movieId))
  );
  return (
    <AnimatePresence>
      {bigMovieMatch && !isLoading ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            layoutId={bigMovieMatch.params.movieId}
            style={{ top: "50%", transform: "translate(0, -50%)" }}
          >
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient( to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path ||
                        clickedMovie.poster_path ||
                        NEXFLIX_LOGO_URL,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Detail;
