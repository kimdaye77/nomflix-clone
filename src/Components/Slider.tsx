import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div``;

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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
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

function Slider({ data }: any) {
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

  return (
    <Wrapper>
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
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie: any) => (
              <Box
                layoutId={movie.id + ""}
                key={movie.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                transition={{ type: "tween", duration: 0.1, delay: 0.5 }}
                bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                onClick={() => onBoxClicked(movie.id)}
              >
                <Info
                  variants={infoVariants}
                  transition={{ type: "tween", duration: 0.1, delay: 0.5 }}
                >
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Slider;
