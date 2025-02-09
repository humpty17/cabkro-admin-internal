import { useContext, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { AutoSizer, List } from "react-virtualized";
import "react-virtualized/styles.css";
import Swal from "sweetalert2";
import { APICALLFAIL, ApiHeadersUserType, APINULLERROR } from "../../General/ConstStates";
import { callApi } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import BookingCard from "./BookingCard";
import BookingDetails from "./BookingDetails";
import { handleBackClick } from "./BookingMethods";
import PagesHeading from "./PagesHeading";
import NotFoundCard from "./NotFoundCard";

const CancelBookingList = () => 
  {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [bookingList, setBookingList] = useState([]);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    fetchBookingList();
  }, []);

  const fetchBookingList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllBookingsByStatus`,
        [
          "Cancel"
        ],
        {}
      );
      if (response) {
        if (response.data.code === 200) {
          console.log(response.data.data.length);
          setBookingList([...(response?.data?.data || [])]);
        } else {
          NotificationManager.error(
            response.data?.message || "Error while fetching data"
          );
          setBookingList([]);
        }
      } else {
        NotificationManager.error(APINULLERROR);
        setBookingList([]);
      }
    } catch (err) {
      console.log(err);
      NotificationManager.error(APICALLFAIL);
      setBookingList([]);
    } finally {
      stopLoading();
    }
  };

  const handleManageBooking = (data) => {
    console.log(data);
    setBookingData(data);
  };

  const rowRenderer = ({ index, key, style }) => {
    const data = bookingList[index];
    const rowStyle = {
      ...style,

      margin: "0px 10px 10px 10px",
      height: "150px",
      width: "98%",
    };

    return (
      <div key={key} className="card border" style={rowStyle}>
        <BookingCard data={data} handleManageBooking = {handleManageBooking}></BookingCard>
      </div>
    );
  };


  
  

  return (
    <>
     <PagesHeading heading={"Cancel Booking List"}></PagesHeading>
      {Object.keys(bookingData).length === 0 ? (
        <div className="m-2" style={{ height: "500px" }}>
          {bookingList.length > 0 ?  <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={bookingList.length}
                rowHeight={170}
                rowRenderer={rowRenderer}
                overscanRowCount={5}
              />
            )}
          </AutoSizer>: <NotFoundCard></NotFoundCard>}
        </div>
      ) : (
        <BookingDetails bookingData={bookingData} handleBackClick={()=>handleBackClick(setBookingData)}></BookingDetails>
      )}
    </>
  );
};

export default CancelBookingList;
