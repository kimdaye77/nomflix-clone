import styled from "styled-components";
import { NEXFLIX_LOGO_URL, makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import Detail from "../Components/Detail";
import { useTvMultipleQuery } from "../Hook/useTvMultipleQuery";

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

function Tv() {
  const [
    { isLoading: loadingLatest, data: latestData },
    { isLoading: loadingAiring, data: airingData },
    { isLoading: loadingPopular, data: popularData },
    { isLoading: loadingTopRates, data: topRatedData },
  ] = useTvMultipleQuery();
  return (
    <Wrapper>
      {loadingLatest ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              latestData?.backdrop_path ||
                latestData?.poster_path ||
                NEXFLIX_LOGO_URL
            )}
          >
            <Title>{latestData?.title}</Title>
            <Overview>{latestData?.overview}</Overview>
          </Banner>
          <SliderPart>
            <SliderWrapper>
              <SliderTitle>Airing</SliderTitle>
              {!loadingAiring && <Slider data={airingData} />}
            </SliderWrapper>
            <SliderWrapper>
              <SliderTitle>Popular</SliderTitle>
              {!loadingPopular && <Slider data={popularData} />}
            </SliderWrapper>
            <SliderWrapper>
              <SliderTitle>Top Rated</SliderTitle>
              {!loadingTopRates && <Slider data={topRatedData} />}
            </SliderWrapper>
          </SliderPart>
          <Detail />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
