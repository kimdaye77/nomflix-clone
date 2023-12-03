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
  position: relative;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: absolute;
  bottom: 0px;
`;

const BigDesc = styled.div`
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 400px;
  gap: 15px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Genre = styled.div`
  font-weight: bold;
`;

const Adult = styled.div<{ adult: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.adult ? props.theme.red : "pink")};
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  display: -webkit-box;
  word-break: break-all;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
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
                >
                  <BigTitle>{clickedMovie.title}</BigTitle>
                </BigCover>
                <BigDesc>
                  <Row>
                    <Genre>{clickedMovie.genres[0].name}</Genre>
                    <Adult adult={clickedMovie.adult}>
                      {clickedMovie.ault ? "for Adult" : "for Not adult"}
                    </Adult>
                  </Row>
                  <BigOverview>
                    {clickedMovie.production_countries[0].name}
                  </BigOverview>
                  <BigOverview>
                    {clickedMovie.production_companies[0].name}
                  </BigOverview>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </BigDesc>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Detail;
