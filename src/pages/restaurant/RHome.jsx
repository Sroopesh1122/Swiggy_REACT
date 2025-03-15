import React from "react";
import bg from "../../assets/img/cheif.png";
import { ArrowRight } from "lucide-react";
import { data, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axiosInstance";
import { serverUrlAPI } from "../../utils/Infos";
import ReviewStars  from 'react-rating-stars-component'
import Loader from "../../components/Loader";
const RHome = () => {
  const REVIEW_PAGE_LIMIT = 5;
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const fetchReviews = async () => {
    const restaurantId =
      queryClient.getQueryData(["profile"]).restaurantId || 0;

    const data = {
      page: 1,
      limit: REVIEW_PAGE_LIMIT,
      restaurantId,
    };

    const response = await axiosInstance.get(
      `${serverUrlAPI}review/secure/restaurant`,
      {
        params: data,
      }
    );
    return response.data;
  };

  const { data: reviewsData, isLoading: reviewLoading } = useQuery({
    queryKey: ["recent-reviews"],
    queryFn: fetchReviews,
    enabled: queryClient.getQueryData(["profile"]).restaurantId ? true : false,
  });

  
  const {reviews:reviewList} = reviewsData || {};

  return (
    <>
      <section className="w-full max-w-[1800px] h-[50vh] lg:h-[60vh] bg-white relative flex justify-start items-center p-3">
        <article className="flex flex-1 h-full  flex-col justify-center items-center">
          <span className="text-7xl text-[#feb80a] font-extrabold duration-500 hover:tracking-tighter">
            Hello Chef,
          </span>
          <span className="text-2xl font-extrabold">
            Let’s Serve the World from Our Kitchen!
          </span>
          <button
            className=" p-1 bg-black text-white rounded-2xl flex justify-center items-center gap-2 px-3"
            onClick={() => navigate("/restaurant/menu")}
          >
            Kitchen <ArrowRight className="w-4 h-4" />{" "}
          </button>
        </article>
        <article className="h-full lg:w-[400px] xl:w-[600px] flex justify-start items-center">
          <img src={bg} alt="" />
        </article>
      </section>

      <section className="w-full mx-auto max-w-[1300px] p-2">
        <h1 className="text-2xl font-extralight">Recent Reviews:</h1>
        {reviewLoading ? (
          <article className="w-full flex justify-center items-center">
            <Loader />
          </article>
        ) : reviewList?.length === 0 ? (
          <article className="flex w-full justify-center items-start">
            <span className="text-[0.7rem]">No reviews Found</span>
          </article>
        ) : (
          <article className="w-full py-2 overflow-auto flex justify-start items-center gap-3 px-3">
           {
            reviewList?.map((review,idx)=><RecentReviews data={review} key={idx}/>)
           }
        </article>
        )}
      </section>
    </>
  );
};

export default RHome;

const RecentReviews = ({data}) => {

  const {review , menuItem ,reviewedBy} = data || {};

  const {img ,name:foodName} = menuItem

  const {comment,rating} = review

  const {name} = reviewedBy

  return (
    <div className="w-[250px]  shadow-md rounded-lg flex flex-col justify-center items-center flex-shrink-0 flex-grow-0  p-2 md:p-5 duration-500 hover:scale-[0.95] cursor-pointer">
      <img
        src={img}
        alt=""
        className="w-[80px] h-[80px] rounded-full"
      />

      <h6 className="text-[0.8rem] font-semibold">{foodName}</h6>
       
       <ReviewStars size={15} count={5} value={rating} edit={false}/>

      <div className="text-[0.7rem] text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis line-clamp-3">
        {comment}
      </div>

       <div className="w-full flex justify-end items-center text-[0.75rem] overflow-hidden text-ellipsis mt-2">
           <span>By {name}</span>
       </div>

    </div>
  );
};
