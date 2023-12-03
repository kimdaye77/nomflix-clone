import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../Components/api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useMvMultipleQuery } from "../Hook/useMvMultipleQuery";
import Slider from "../Components/Slider";

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
  position: relative;
  top: -100px;
`;

const SliderWrapper = styled.div``;

const SliderTitle = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

function Home() {
  const [
    { isLoading: loadingLatest, data: latestData },
    { isLoading: loadingTopRatest, data: topRatedData },
    { isLoading: loadingUpComing, data: upComingData },
  ] = useMvMultipleQuery();

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderPart>
            <SliderWrapper>
              <SliderTitle>Now Playing</SliderTitle>
              {!isLoading && <Slider data={data} />}
            </SliderWrapper>
            <SliderWrapper>
              <SliderTitle>Top Rated</SliderTitle>
              {!loadingLatest && <Slider data={topRatedData} />}
            </SliderWrapper>
            <SliderWrapper>
              <SliderTitle>Upcoming</SliderTitle>
              {!loadingUpComing && <Slider data={upComingData} />}
            </SliderWrapper>
          </SliderPart>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
