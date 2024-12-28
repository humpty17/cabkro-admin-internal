export const ApiHeader = {
  UserType : '0',
  'Content-Type': 'application/json'
}

export const DEFAULTDATE = "1900-01-01T00:00:00";

export const LOGINPAGE ="Login"
export const REGISTERPAGE = "Register"
export const DASHBOARDPAGE="Dashboard"
// Data Section
export const POPULARDESTINATIONPAGE="PopularDestinations"
export const ADDBOOKINGPACKAGE = "AddBookingPackage"
export const ADDVEHICLELIST = "AddVehicleList"
export const BOOKINGPACKAGELIST = "BookingPackageList"

// Setting Section
export const ADDUSERFORM = "AddUserForm"
export const USERADMINLIST = "UserAdminList"
export const PROFILE = "Profile"
export const CHANGEPASSWORD = "ChangePassword"

// Customer Section 
export const ADDCUSTOMER = "AddCustomer"
export const CUSTOMERLIST = "CustomerList"

// Extra Section
export const FAQS = "Faqs"
export const SMTP = "SMTPDetails"
export const COUPONS = "Coupons"
export const CONTACTUS = "ContactUs"

//REGEX CONSTANTS
export const PHONENOREGEX = /^\d{10}$/;
export const EMAILREGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

//API ERROR NULL
export const APINULLERROR = "API returned an invalid response"
export const APICALLFAIL = "API call failed:"

//FETCH DATA ERROR
export const FETCHDATAERROR = "Error while fetching data"
//SAVE DATA ERROR
export const SAVEDATAERROR = "Error while saving data"
//DELETE DATA ERROR
export const DELETEDATAERROR = "Error while deleting data"
//UPDATE DATA ERROR
export const UPDATEDATAERROR = "Error while updating data"

//ACTION COLUMN HEADING
export const ACTION = "Action"
export const WIDTH = 50
