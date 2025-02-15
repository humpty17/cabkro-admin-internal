import {
  BsArrowRight,
  BsCarFront,
  BsCurrencyRupee,
  BsFuelPump,
} from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { convertDatetoReadFormat } from "../../General/GeneralMethod";
import { CiPhone, CiUser } from "react-icons/ci";
import { GrStatusInfo } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { GiPathDistance } from "react-icons/gi";
import {
  RiCouponLine,
  RiMoneyRupeeCircleLine,
  RiPinDistanceLine,
} from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { PiSeatbeltLight } from "react-icons/pi";
import { FcRating } from "react-icons/fc";
import BackButton from "../../General/Buttons/BackButton";
import { ONEWAY } from "../../General/ConstStates";
import SubmitButton from "../../General/Buttons/SubmitButton";

const BookingDetails = ({
  bookingData,
  handleCancelBooking,
  handleBackClick,
  handleAssignDriver
}) => {
  return (
    <div className="card border-dark bg-transparent m-4">
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
              <span className="badge text-bg-warning fw-bold">Out Station</span>
              <BsArrowRight></BsArrowRight>
              <span className="badge text-bg-warning fw-bold">
                {bookingData.bookingType === ONEWAY ? "One Way" : "Round Trip"}
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
                    <span className="badge text-bg-success mb-1">Pickup</span>
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
                    {bookingData.bookingType === ONEWAY ? "N/A" : convertDatetoReadFormat(bookingData.dropOffTime)}
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
            {/* Booking details */}
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
                    {(
                      parseFloat(bookingData.totalFare) +
                      parseFloat(bookingData.extraServiceAmount) -
                      parseFloat(bookingData.promoCode || 0)
                    ).toFixed(2)}
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
                    {bookingData.driverChargesType === "Included" ? (
                      bookingData.driverChargesType
                    ) : (
                      <>
                        <BsCurrencyRupee className="me-1" />
                        {bookingData.driverChargesAmount}
                      </>
                    )}
                  </span>
                </li>
                <li className="list-group-item d-sm-flex justify-content-between align-items-center">
                  <span className="mb-0">
                    <RiMoneyRupeeCircleLine className="me-2" />
                    Distance Fare:
                  </span>
                  <span className="h6 fw-normal mb-0 d-flex justify-center">
                    <BsCurrencyRupee className="me-1" />
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
                    <BsCurrencyRupee className="me-1" />
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
                      {bookingData.promoCode || 0}
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
            {/* Vehicle details */}
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
            {/* driver details */}
            <p className="fw-bold p-2 m-0">{`Driver Details ${
              bookingData.driverId === 0 ? `(Not Assigned)` : `(Assigned)`
            }`}</p>
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
                    <FcRating className="me-2" />
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
                    {bookingData.driverId === 0
                      ? ""
                      : convertDatetoReadFormat(bookingData.driverAssignedTime)}
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-lg-12 mt-2 d-flex justify-content-between">
              <BackButton handleBackClick={handleBackClick}></BackButton>
              <div>
              {bookingData.bookingStatus === "pending" ? <SubmitButton handleClick={handleAssignDriver} buttonName={bookingData.driverId === 0 ? "Assign Driver" : "Re-Assign Driver"}></SubmitButton> : null}
              {bookingData.bookingStatus === "pending" ? (
                <button
                  className="btn btn-danger mb-0"
                  onClick={(e) => handleCancelBooking(bookingData)}
                >
                  Cancel Booking
                </button>
              ) : null}
              </div>
              
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
