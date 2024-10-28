import { FaStar } from "react-icons/fa6";

const StarComp = ({ rating }) => {
  const CalcStar = ({ stars }) => {
    let sum;
    for (let i = 0; i < stars; i++) {
      sum += <FaStar />;
    }

    console.log(sum);

    return <></>;
  };

  switch (true) {
    case rating === 5:
      return "5 Star";

    case rating > 4 && rating < 5:
      return "4.5 star";

    case rating === 4:
      return <CalcStar stars={4} />;

    case rating > 3 && rating < 4:
      return "3.5 star";

    case rating === 3:
      return "3 star";

    case rating > 2 && rating < 3:
      return "2.5 star";

    case rating === 2:
      return "2 star";

    case rating > 1 && rating < 2:
      return "1.5 star";

    case rating === 1:
      return "1 star";
  }
};

export default StarComp;
