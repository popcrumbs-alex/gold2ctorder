import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
`;
const Time = styled.h2`
  margin: 0.5rem 0;
  font-size: 2rem;
`;
const Text = styled.p`
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.6;
  font-weight: 300;
`;

interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

type Props = {
  timeProps: {
    hoursProp: string;
    minutesProp: string;
    secondsProp: string;
  };
};

const Timer = ({ timeProps }: Props) => {
  const { hoursProp, minutesProp, secondsProp } = timeProps;

  const [time, setTimes] = useState<Time>({
    hours: hoursProp || "00",
    minutes: minutesProp || "12",
    seconds: secondsProp || "59",
  });

  const { hours, minutes, seconds } = time;

  useEffect(() => {
    let interval = setInterval(() => {
      setTimes({ ...time, seconds: (parseFloat(seconds) - 1).toString() });
      //reset seconds and subtract min
      if (parseFloat(seconds) === 0) {
        //min and secs both equal 0, stop
        if (parseFloat(minutes) === 0) {
          return setTimes({ ...time, minutes: "00", seconds: "00" });
        }
        setTimes({
          ...time,
          minutes:
            parseFloat(minutes) > 0
              ? (parseFloat(minutes) - 1).toString()
              : "00",
          seconds: "59",
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <Container>
      <Column>
        <Time>{hours}</Time> <Text>HOUR</Text>
      </Column>
      <Column>
        <Time>{minutes}</Time> <Text>MINUTES</Text>
      </Column>
      <Column>
        <Time>{seconds}</Time> <Text>SECONDS</Text>
      </Column>
    </Container>
  );
};

export default Timer;
