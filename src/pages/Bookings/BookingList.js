import { useContext, useEffect, useState } from "react";
import {
  BsArrowRight,
  BsCarFront,
  BsCurrencyRupee,
  BsFuelPump,
} from "react-icons/bs";
import { CiPhone, CiUser } from "react-icons/ci";
import { GrStatusInfo } from "react-icons/gr";
import {
  RiCouponLine,
  RiMoneyRupeeCircleLine,
  RiPinDistanceLine,
} from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { TbBrandBooking } from "react-icons/tb";
import { NotificationManager } from "react-notifications";
import { APICALLFAIL, APINULLERROR, ONEWAY } from "../../General/ConstStates";
import { callApi, convertDatetoReadFormat } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { IoMdTime } from "react-icons/io";
import { PiSeatbeltLight } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { FcRating } from "react-icons/fc";
import { FixedSizeList as List } from "react-window";

const BookingList = () => {
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
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Data/GetAllBookings`,
        {},
        {}
      );
      if (response) {
        if (response.data.code === 200) {
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
  const Row = ({ index, style }) => {
    const data = bookingList[index];
  return (
    <>
      {Object.keys(bookingData).length === 0 ? (
        <div className="m-4">
          {bookingList.map((data, index) => (
            <div className="card border mb-4" >
            {/* Card header */}
            <div className="card-header border-bottom d-md-flex justify-content-md-between align-items-center">
              {/* Icon and Title */}
              <div className="d-flex align-items-center">
                <div className="ms-2">
                  <h6 className="card-title mb-0 w-75">
                    {data.pickupLocation + " to " + data.dropOffLocation}
                  </h6>
                  <ul className="nav nav-divider small">
                    <li className="nav-item">{"Booking ID: " + data.other2}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-2 mt-md-0 w-50">
                <button
                  className="btn-primary-soft mb-0 float-end"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleManageBooking(data)}
                >
                  Manage Booking
                </button>
              </div>
            </div>
            {/* Card body */}
            <div className="card-body">
              <div className="row g-3">
                <div className="col-sm-6 col-md-4">
                  <span>Pickup Time</span>
                  <h6 className="mb-0">{convertDatetoReadFormat(data.pickupTime)}</h6>
                </div>
    
                <div className="col-sm-6 col-md-4">
                  <span>Drop Time</span>
                  <h6 className="mb-0">
                    {data.bookingType === "ONEWAY"
                      ? "Not Applicable"
                      : convertDatetoReadFormat(data.dropOffTime)}
                  </h6>
                </div>
    
                <div className="col-md-4">
                  <span>Booked by</span>
                  <h6 className="mb-0">{data.userName}</h6>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      ) : (
        <div className="card border-light bg-transparent m-4">
          <div className="card-header bg-transparent border-bottom">
            <h5 className="card-header-title">Manage Booking</h5>
          </div>
          <div className="card-body p-0 booking-info">
            <div className="booking-for p-3 position-relative">
              <ul
                className="btype"
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                <li style={{ position: "relative" }}>
                  <span className="badge text-bg-warning fw-bold">
                    Out Station
                  </span>
                  <BsArrowRight></BsArrowRight>
                  <span className="badge text-bg-warning fw-bold">
                    {bookingData.bookingType === ONEWAY
                      ? "One Way"
                      : "Round Trip"}
                  </span>
                </li>
              </ul>
              <div className="row justify-content-between text-start mb-2 mt-3">
                <div className="col-md-12">
                  <ul
                    className="booking-location"
                    style={{
                      listStyle: "none",
                      paddingLeft: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <li>
                      <div>
                        <span className="badge text-bg-success mb-1">
                          Pickup
                        </span>
                        <h6>{bookingData.pickupLocation}</h6>
                      </div>
                    </li>
                    <li>
                      <span className="badge text-bg-danger">Drop</span>
                      <h6>{bookingData.dropOffLocation}</h6>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <TbBrandBooking className="me-2"></TbBrandBooking>
                        Booking ID:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.other2}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <SlCalender className="me-2"></SlCalender>Booking Date:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {convertDatetoReadFormat(bookingData.createdDate)}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <SlCalender className="me-2"></SlCalender>Pick Up Date:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {convertDatetoReadFormat(bookingData.pickupTime)}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <CiUser className="me-2" />
                        Booked by:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.userName}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <GrStatusInfo className="me-2" />
                        Booking Status:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.bookingStatus.toUpperCase()}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <SlCalender className="me-2"></SlCalender>Drop Date:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {convertDatetoReadFormat(bookingData.dropOffTime)}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Interlocations */}
                {bookingData.bookingType === ONEWAY ? null : (
                  <>
                   
                    <p className="fw-bold p-2 m-0">Inter Locations</p>
                    <div>
                      <ul className="list-group list-group-borderless">
                        {[...Array(12)].map((data, index) =>
                          bookingData["interLocation" + (index + 1)] !== "" ? (
                            <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                              <span className="mb-0">
                                <GiPathDistance className="fa-fw me-2" />
                                {"Inter Location " + (index + 1) + ":"}
                              </span>
                              <span className="h6 fw-normal mb-0">
                                {bookingData["interLocation" + (index + 1)]}
                              </span>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </>
                )}

                <p className="fw-bold p-2 m-0">Booking Details</p>
                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiPinDistanceLine className="me-2" />
                        Total Distance:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.tripDistance + " KM"}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Toll Tax:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                       
                        {bookingData.tollTaxType === "Included" ? (
                          bookingData.tollTaxType
                        ) : (
                          <>
                            <BsCurrencyRupee className="me-1" />
                            {bookingData.tollTaxAmount}
                          </>
                        )}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Night Charges:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                       
                        {bookingData.nightChargesType === "Included" ? (
                          bookingData.nightChargesType
                        ) : (
                          <>
                            <BsCurrencyRupee className="me-1" />
                            {bookingData.nightChargesAmount}
                          </>
                        )}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Extra Luggage:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                        <BsCurrencyRupee className="me-1" />
                        {bookingData.extraService === "Yes Luggage"
                          ? bookingData.extraLuggageAmount
                          : 0}
                      </span>
                    </li>
                    {bookingData.isCoupenApply ? (
                      <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                        <span className="mb-0">
                          <RiCouponLine className="me-2" />
                          Coupen Applied:
                        </span>
                        <span className="h6 fw-normal mb-0">
                          {bookingData.coupenCode}
                        </span>
                      </li>
                    ) : null}
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Total Price:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                        <BsCurrencyRupee />
                        {(parseFloat(bookingData.totalFare) +
                          parseFloat(bookingData.extraServiceAmount) -
                          parseFloat(bookingData.promoCode || 0)).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <IoMdTime className="me-2" />
                        Estimate Time:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.timeDurationInHour + " Hr"}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Driver Charges:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                        {bookingData.driverChargesType === "Included"
                          ? bookingData.driverChargesType
                          : <><BsCurrencyRupee className="me-1"/>{bookingData.driverChargesAmount}</>}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Distance Fare:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                        <BsCurrencyRupee className="me-1"/>
                        {parseFloat(bookingData.fare) +
                          parseFloat(bookingData.gstAmount)}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Pet Animal Amount:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                        
                        <BsCurrencyRupee className="me-1"/>
                        {bookingData.extraServiceDescription === "Yes Pet"
                          ? bookingData.petAnimalAmount
                          : 0}
                      </span>
                    </li>
                    {bookingData.isCoupenApply ? (
                      <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                        <span className="mb-0">
                          <RiMoneyRupeeCircleLine className="fa-fw me-2" />
                          Coupen Amount:
                        </span>
                        <span className="h6 fw-normal mb-0 d-flex justify-center">
                          <BsCurrencyRupee className="me-1" />
                          {bookingData.promoCode || 0 }
                        </span>
                      </li>
                    ) : null}
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <RiMoneyRupeeCircleLine className="me-2" />
                        Advance Amount:
                      </span>
                      <span className="h6 fw-normal mb-0 d-flex justify-center">
                      <BsCurrencyRupee className="me-1" />
                        {bookingData.paymentAmountAdvance}
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="fw-bold p-2 m-0">Vehicle Details</p>
                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <BsCarFront className="me-2" />
                        Vehicle Name:
                      </span>
                      <span className="h6 fw-normal mb-0">
                       
                        {bookingData.vehicleName}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <BsCarFront className="me-2" />
                        Vehicle Type:
                      </span>
                      <span className="h6 fw-normal mb-0">
                       
                        {bookingData.vehicleType}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <BsFuelPump className="me-2" />
                        Vehicle Fuel Type:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.vehicleFuelType}
                      </span>
                    </li>
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <PiSeatbeltLight className="me-2" />
                        Seat Count:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.vehicleCapacity || 0}
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="fw-bold p-2 m-0">{`Driver Details ${bookingData.driverId === 0 ? `(Not Assigned)` : `(Assigned)`}`}</p>
                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <CiPhone className="me-2" />
                        Driver Phone No:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.driverPhone}
                      </span>
                    </li>

                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <FcRating  className="me-2" />
                        Driver Rating:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.driverId === 0 ? "" : bookingData.driverRating}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul className="list-group list-group-borderless">
                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <CiUser className="me-2" />
                        Driver Name:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.driverName}
                      </span>
                    </li>

                    <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                      <span className="mb-0">
                        <IoMdTime className="me-2" />
                        Driver Assigned Time:
                      </span>
                      <span className="h6 fw-normal mb-0">
                        {bookingData.driverId === 0 ? "" : convertDatetoReadFormat(bookingData.driverAssignedTime)}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-12 text-end">
                  <button className="btn btn-danger mb-0">
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}
return (
  <List
    height={520} // Adjust height as needed
    itemCount={bookingList.length}
    itemSize={200} // Adjust item size based on card height
    width={"100%"}
  >
    {Row}
  </List>
);
};

export default BookingList;
