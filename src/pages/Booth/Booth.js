import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './Booth.css';
import Boothcard from '../../components/Booth/Boothcard';
import boothsearchC from '../../assets/img/boothsearchC.png';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import boothMap from '../../assets/img/boothMap.png';
import noticeExImg from '../../assets/img/noticeExImg.png';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.25);
`;

const DayBox = styled.div`
  bottom: 0;
  margin: 0px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -2px;
`;

const BoxDate = styled.span`
  opacity: ${(props) => (props.isActive ? 1 : 0.7)};
  transition: all 0.5s;
  font-family: 'GmarketSansLight';
  margin-bottom: 3px;
`;

const BoxDay = styled.span`
  font-size: 21px;
  margin-bottom: 7px;
  color: ${(props) => (props.isActive ? '#FFC909' : '#FFFFFF')};
`;

const BoxHere = styled(motion.div)`
  height: 2px;
  width: 60px;
  border-radius: 5px;
  background-color: #ffc909;
`;

const BoxNotHere = styled(motion.div)`
  height: 2px;
  width: 50px;
  border-radius: 5px;
`;

const LocationImg = styled.img`
  margin-top: 1.8rem;
  margin-bottom: 10px;
  width: 90%;
`;

const BoothContainer = styled.section`
  width: 100%;
  text-align: center;
  padding: 2rem 0rem 9rem 0;
`;
const BoothCardContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr;
  grid-template-columns: 1fr 1fr;
  width: 328px;
  margin: 0 auto;
  margin-top: 40px;
`;

const BuildingContainer = styled.div`
  margin-top: 10px;
`;

const BuildingDetail = styled(motion.button)`
  border: none;

  align-items: center;
  padding: 0px;

  font-family: 'GmarketSansMedium';
  font-size: 12px;
  width: 71px;
  height: 28px;

  margin: 3px;
  color: ${(props) => (props.isActive ? '#FD9903' : '#ffffff')};

  background-color: transparent;
  border-bottom: 2px solid
    ${(props) => (props.isActive ? '#FD9903' : 'rgba(256, 256, 256, 0.5)')};

  transition: 0.5s all;
`;

const dayArray = [
  {
    id: 1,
    date: 28,
    day: '수요일',
  },
  {
    id: 2,
    date: 29,
    day: '목요일',
  },
  {
    id: 3,
    date: 30,
    day: '금요일',
  },
];
const buildingArray = [
  {
    id: 1,
    building: '만해광장',
  },
  {
    id: 2,
    building: '대운동장',
  },
  {
    id: 3,
    building: '팔정도',
  },
  {
    id: 4,
    building: '명진관',
  },
  {
    id: 5,
    building: '원흥관',
  },
  {
    id: 6,
    building: '학생회관',
  },
  {
    id: 7,
    building: '학림관',
  },
  {
    id: 8,
    building: '다향관',
  },
  {
    id: 9,
    building: '법학관',
  },
  {
    id: 10,
    building: '혜화관',
  },
  {
    id: 11,
    building: '사회과학관',
  },
  {
    id: 12,
    building: '잉카페앞',
  },
];

export default function Booth({}) {
  const [booth, setBooth] = useState([
    {
      id: 1,
      boothType: {
        korean: '주점',
      },
      title: '명진관호떡',
      location: '원흥관',
      introduction: '맛있는 호떡과 다양한 음식',
      likeCnt: 20,
      // images: [
      //   {
      //     url: noticeExImg,
      //   },
      // ],
    },
    {
      id: 2,
      boothType: {
        korean: '푸드트럭',
      },
      title: '신공공룡',
      introduction: '으아가각아ㅏㄱ',
      likeCnt: 20,
      location: '신공학관',
      // images: [
      //   {
      //     url: noticeExImg,
      //   },
      // ],
    },
    {
      id: 3,
      boothType: {
        korean: '부스',
      },
      title: '혜화아아아ㅏㄱ',
      location: '혜화관',
      introduction: '혜화아아아ㅏㄱ',
      likeCnt: 420,
      images: [
        {
          url: noticeExImg,
        },
      ],
    },
  ]);

  // 날짜 할당
  const day = new Date();

  // todate는 29일에 2, 30일에 3, 그 외(28일)에는 1
  const todate =
    day.getDate() - 27 === 2 ? 2 : day.getDate() - 27 === 3 ? 3 : 1;

  const [isToday, setIsToday] = useState(todate);
  const [isBuilding, setIsBuilding] = useState('만해광장');
  const [isExist, setIsExist] = useState(true);

  //todate,isbuilding 패치시키기
  useEffect(() => {
    fetchBooth(isToday, isBuilding);
  }, [isToday, isBuilding]);

  //api가져오기
  const fetchBooth = async (todate, isBuilding) => {
    try {
      const request = await axios.get(
        `/booths?day=${todate}&location=${isBuilding}`, //메뉴..까지.. 뒤지는건가..!
      );
      setBooth(request.data);
    } catch (error) {
      setIsExist(false);
      console.log('ERROR', error);
    }
  };

  //

  return isExist ? (
    <BoothContainer>
      <DateContainer>
        {/* api호출 방법 :/api/booths?day={day}&location={location} */}
        {dayArray.map((i) => (
          <DayBox key={i.id} onClick={() => setIsToday(i.id)}>
            <BoxDate isActive={isToday === i.id}>{i.date}일</BoxDate>
            <BoxDay isActive={isToday === i.id}>{i.day}</BoxDay>
            {isToday === i.id ? <BoxHere layoutId="boxhe" /> : <BoxNotHere />}
          </DayBox>
        ))}
      </DateContainer>

      {/* 지도 이미지 */}
      <LocationImg alt={isBuilding} src={boothMap} />

      <BuildingContainer>
        {buildingArray.map((bu) => {
          return (
            <BuildingDetail
              key={bu.id}
              onClick={() => {
                setIsBuilding(bu.building);
              }}
              isActive={isBuilding === bu.building}
            >
              {bu.building}
              {/* {isBuilding === bu.building ? (
                <BuildingHere layoutId="buildinghe" />
              ) : (
                <BuildingNotHere />
              )} */}
            </BuildingDetail>
          );
        })}
      </BuildingContainer>

      {/* map으로 카드 뜨게 만들기 */}

      <BoothCardContainer>
        {booth.map((boo) => {
          return (
            <Boothcard
              key={boo.id}
              boothId={boo.id}
              title={boo.title}
              intro={boo.introduction}
              type={boo.boothType.korean}
              locationName={boo.location}
              likeCount={boo.likeCnt}
              // boothImage={boo.images[0]}
            />
          );
        })}
      </BoothCardContainer>
    </BoothContainer>
  ) : (
    <BoothContainer>
      <DateContainer>
        {/* api호출 방법 :/api/booths?day={day}&location={location} */}
        {dayArray.map((i) => (
          <DayBox key={i.id} onClick={() => setIsToday(i.id)}>
            <BoxDate isActive={isToday === i.id}>{i.date}일</BoxDate>
            <BoxDay isActive={isToday === i.id}>{i.day}</BoxDay>
            {isToday === i.id ? <BoxHere layoutId="boxhe" /> : <BoxNotHere />}
          </DayBox>
        ))}
      </DateContainer>

      {/* 지도 이미지 */}
      <LocationImg alt={isBuilding} src={boothMap} />

      <BuildingContainer>
        {buildingArray.map((bu) => {
          return (
            <BuildingDetail
              key={bu.id}
              onClick={() => {
                setIsBuilding(bu.building);
              }}
              isActive={isBuilding === bu.building}
            >
              {bu.building}
              {/* {isBuilding === bu.building ? (
                <BuildingHere layoutId="buildinghe" />
              ) : (
                <BuildingNotHere />
              )} */}
            </BuildingDetail>
          );
        })}
      </BuildingContainer>
      <Stack sx={{ width: '328px', margin: '30px auto' }} spacing={2}>
        <div className="no-results__text">
          <img src={boothsearchC} className="noResultImg" />
          <p>등록되어 있는 부스가 없습니다.</p>
        </div>
      </Stack>
    </BoothContainer>
  );
}
