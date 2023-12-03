import { useQuery } from "react-query";
import { IGetMoviesResult, getMovieDetail, getMovies } from "../Components/api";
import styled from "styled-components";
import { NEXFLIX_LOGO_URL, makeImagePath } from "../utils";
import { useMvMultipleQuery } from "../Hook/useMvMultipleQuery";
import Slider from "../Components/Slider";
import Detail from "../Components/Detail";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const SliderPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: -100px;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SliderTitle = styled.div`
  padding-left: 10px;
  font-weight: bold;
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

function getDetail(movieId: string) {
  return getMovieDetail(Number(movieId));
}

function Home() {
  const [
    { isLoading: loadingLatest, data: latestData },
    { isLoading: loadingNowPlaying, data: playingData },
    { isLoading: loadingTopRates, data: topRatedData },
    { isLoading: loadingUpComing, data: upComingData },
  ] = useMvMultipleQuery();

  return (
    <Wrapper>
      {loadingNowPlaying ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              playingData?.results[0].backdrop_path ||
                playingData?.results[0].poster_path ||
                NEXFLIX_LOGO_URL
            )}
          >
            <Title>{playingData?.results[0]?.title}</Title>
            <Overview>{playingData?.results[0]?.overview}</Overview>
          </Banner>
          <SliderPart>
            <SliderWrapper>
              <SliderTitle>Now Playing</SliderTitle>
              {!loadingNowPlaying && <Slider data={playingData} />}
            </SliderWrapper>
            <SliderWrapper>
              <SliderTitle>Top Rated</SliderTitle>
              {!loadingTopRates && <Slider data={topRatedData} />}
            </SliderWrapper>
            <SliderWrapper>
              <SliderTitle>Upcoming</SliderTitle>
              {!loadingUpComing && <Slider data={upComingData} />}
            </SliderWrapper>
          </SliderPart>
          <Detail />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
