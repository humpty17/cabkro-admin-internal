import { NotificationManager } from "react-notifications"
import { APICALLFAIL, ApiHeadersUserType, APINULLERROR } from "../../General/ConstStates"
import { callApi } from "../../General/GeneralMethod"
import Swal from "sweetalert2";


export const handleCancelBooking = (bookingData, startLoading, stopLoading,setBookingData,fetchBookingList) =>{
    Swal.fire({
      icon:"warning",
      text: "Are you sure you want to cancel?",
      input: "text",
      inputPlaceholder: "Reason for cancellation...",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText:"No",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel it!",
      preConfirm: (inputValue) => {
        if (!inputValue) {
            Swal.showValidationMessage("Enter reason for cancellation");
        }
        return inputValue;
      }
    }).then(async(result) => {
      if (result.isConfirmed) {
          // console.log(result.value)
          const isCancelled = await cancelBooking(result.value, bookingData, startLoading, stopLoading)
          if(isCancelled){
            setBookingData({})
            fetchBookingList()
          }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
          
      }
    });
  }

export const cancelBooking = async (cancelReason, bookingData, startLoading, stopLoading) =>{
    startLoading()
    try{
      const response = await callApi("get", `${process.env.REACT_APP_API_URL}api/Booking/CancelBooking?bookingId=${bookingData.booking_id}&remark=${cancelReason}`,{}, {...ApiHeadersUserType})

      if(response){
        if(response?.data?.code === 200){
          NotificationManager.success("Boooking Cancelled Successfully")
          return true
        }
        else{
          NotificationManager.error(response?.data?.message || "Error while cancelling booking")
          return false
        }
      }
      else{
        NotificationManager.error(APINULLERROR)
        return false
      }
    }
    catch(err){
      console.log(err)
      NotificationManager.error(APICALLFAIL)
      return false
    }
    finally{
      stopLoading()
    }
  }


  export const handleBackClick = (setBookingData)=>{
    setBookingData({})
  }


  export const GetDriversList = async(startLoading, stopLoading, booking_id,setBookingData, fetchBookingList) =>{
    startLoading()
    try{
      const response = await callApi("get", `${process.env.REACT_APP_API_URL_ADMIN}Data/GetNearestDriver/${booking_id}`,{},{})

      if(response){
        if(response?.data?.code ===200){
          stopLoading()
          AssignDriver(response?.data?.data, startLoading, stopLoading, booking_id,setBookingData, fetchBookingList)
        }
        else{
          NotificationManager.error(response?.data?.message)
        }
      }
      else{
        NotificationManager.error(APINULLERROR)
      }
    }
    catch(err){
      console.log(err)
      NotificationManager.error(APICALLFAIL)
    }
    finally{
      stopLoading()
    }
  }


  const AssignDriver = (drivers,startLoading, stopLoading, booking_id,setBookingData, fetchBookingList) =>{
    Swal.fire({
      title: 'Available Drivers',
      icon: 'info',
      html: `
      <div style="height: 200px; overflow: auto;">
        <table border="1" width="100%">
          <thead style="font-size: 13px; border-width: 1px">
            <tr>
              <th style="width: 15%;">Select</th>
              <th style="width: 25%;">Driver Name</th>
              <th style="width: 25%;">Phone Number</th>
              <th style="width: 25%;">Vehicle Type</th>
              <th style="width: 15%;">Seat Count</th>
            </tr>
          </thead>
          <tbody id="driverTableBody" style="font-size: 13px; border-width: 1px">
            <!-- Dynamic Rows Will Be Inserted Here -->
          </tbody>
        </table></div>
      `,
      didOpen: () => {
        
        
        const tableBody = document.getElementById("driverTableBody");
        tableBody.innerHTML = drivers.map((driver, index) => `
          <tr>
            <td style="padding: 5px;"><input type="radio" name="selectedDriver" value="${index}"></td>
            <td style="padding: 5px;">${driver.driverName}</td>
            <td style="padding: 5px;">${driver.driverPhoneNumber}</td>
            <td style="padding: 5px;">${driver.vehicleType ? driver.vehicleType : ""}</td>
            <td style="padding: 5px;">${driver.vehicleSeaterCount}</td>
          </tr>
        `).join('');
      },
      showCancelButton: true,
      confirmButtonText: 'Assign Driver',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const selectedDriver = document.querySelector('input[name="selectedDriver"]:checked');
        // console.log(drivers[selectedDriver.value])
        if (!selectedDriver) {
          Swal.showValidationMessage('Please select a driver');
          return false;
        }
        return selectedDriver.value;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        AssignSelectedDriver({...drivers[result.value], booking_id: booking_id},startLoading, stopLoading,setBookingData, fetchBookingList)
      }
    });
  }

  const AssignSelectedDriver = async(requestBody,startLoading, stopLoading,setBookingData, fetchBookingList)=>{
    startLoading()
    try{
      const response = await callApi("post", `${process.env.REACT_APP_API_URL}api/Drivers/AcceptBookingByDriver`, {...requestBody}, {...ApiHeadersUserType})
      if(response){
        if(response?.data?.code === 200){
          NotificationManager.success("Driver assign successfully")
          setBookingData({})
          fetchBookingList()
        }
        else{
          NotificationManager.error(response?.data?.message)
        }
      }
      else{
        NotificationManager.error(APINULLERROR)
      }

    } 
    catch(err){
      NotificationManager.error(APICALLFAIL)
    }
    finally{
      stopLoading()
    }
  }
