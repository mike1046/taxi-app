// actions related to navigation
export const NAVIGATE_TO = 'NAVIGATE_TO'
export const NAVIGATE_BACK = 'NAVIGATE_BACK'
export const MODAL_ON = 'MODAL_ON'
export const MODAL_OFF = 'MODAL_OFF'
export const ALERT_TEXT = 'ALERT_TEXT'

// actions related to application state
export const APPSTATE_SHUTDOWN = 'APPSTATE_SHUTDOWN'
export const APPSTATE_STARTUP = 'APPSTATE_STARTUP'

// actions related to user state
export const SIGNUP_SUBMIT = 'SIGNUP_SUBMIT'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'
export const GETPROFILE_SUCCESS = 'GETPROFILE_SUCCESS'
export const GETPROFILE_ERROR = 'GETPROFILE_ERROR'
export const GETJOBLIST_SUCCESS = 'GETJOBLIST_SUCCESS'
export const SETLOCATION_SUCCESS = 'SETLOCATION_SUCCESS'
export const SETLOCATION_ERROR = 'SETLOCATION_ERROR'
export const TOGGLE_REMEMBERME = 'TOGGLE_REMEMBERME'
export const CHECKPERSISTANTLOGIN_SUBMIT = 'CHECKPERSISTANTLOGIN_SUBMIT'
export const CHECKPERSISTANTLOGIN_ERROR = 'CHECKPERSISTANTLOGIN_ERROR'

// actions related to user verification
export const CODE_VERIFY_SUCCESS = 'CODE_VERIFY_SUCCESS'
export const CODE_VERIFY_ERROR = 'CODE_VERIFY_ERROR'
export const CODE_RESEND_SUCCESS = 'CODE_RESEND_SUCCESS'
export const CODE_RESEND_ERROR = 'CODE_RESEND_ERROR'

// actions related to user password
export const PASSWORD_RESETCODE_SUCCESS = 'PASSWORD_RESETCODE_SUCCESS'
export const PASSWORD_RESETCODE_ERROR = 'PASSWORD_RESETCODE_ERROR'
export const PASSWORD_VERIFY_SUCCESS = 'PASSWORD_VERIFY_SUCCESS'
export const PASSWORD_VERIFY_ERROR = 'PASSWORD_VERIFY_ERROR'

// actions related to updating account information
export const PASSWORD_SETNEW_SUCCESS = 'PASSWORD_SETNEW_SUCCESS'
export const PASSWORD_SETNEW_ERROR = 'PASSWORD_SETNEW_ERROR'
export const ACCOUNT_UPDATE_SUCCESS = 'ACCOUNT_UPDATE_SUCCESS'
export const ACCOUNT_UPDATE_ERROR = 'ACCOUNT_UPDATE_ERROR'

// actions related to editing credit card information
export const ADDCARD_SUCCESS = 'ADDCARD_SUCCESS'
export const ADDCARD_ERROR = 'ADDCARD_ERROR'

// actions related to ride
export const GETESTIMATE_SUBMIT = 'GETESTIMATE_SUBMIT'
export const GETESTIMATE_SUCCESS = 'GETESTIMATE_SUCCESS'
export const GETESTIMATE_ERROR = 'GETESTIMATE_ERROR'
export const CONFIRMRIDE_SUCCESS = 'CONFIRMRIDE_SUCCESS'
export const CONFIRMRIDE_ERROR = 'CONFIRMRIDE_ERROR'
export const CANCELRIDE_SUCCESS = 'CANCELRIDE_SUCCESS'
export const CANCELRIDE_ERROR = 'CANCELRIDE_ERROR'
export const GETJOBINFO_SUBMIT = 'GETJOBINFO_SUBMIT'
export const GETJOBINFO_SUCCESS = 'GETJOBINFO_SUCCESS'
export const GETJOBINFO_ERROR = 'GETJOBINFO_ERROR'
export const UPDATEJOB_SUCCESS = 'UPDATEJOB_SUCCESS'
export const UPDATEJOB_ERROR = 'UPDATEJOB_ERROR'
export const GETUPDATEQUOTE_SUBMIT = 'GETUPDATEQUOTE_SUBMIT'
export const GETUPDATEQUOTE_SUCCESS = 'GETUPDATEQUOTE_SUCCESS'
export const GETUPDATEQUOTE_ERROR = 'GETUPDATEQUOTE_ERROR'
export const ALERTDRIVER_SUCCESS = 'ALERTDRIVER_SUCCESS'
export const ALERTDRIVER_ERROR = 'ALERTDRIVER_ERROR'
export const JOBCOMPLETED = 'JOBCOMPLETED'
export const SETDRIVERWAITSTATUSMESSAGEINDEX = 'SETDRIVERWAITSTATUSMESSAGEINDEX'
export const GETRECEIPT_SUCCESS = 'GETRECEIPT_SUCCESS'

// actions related to payment
export const CHARGETOKEN_SUCCESS = 'CHARGETOKEN_SUCCESS'
export const CHARGETOKEN_ERROR = 'CHARGETOKEN_ERROR'
export const SETPAYMENT = 'SETPAYMENT'
export const SETTIP = 'SETTIP'

// actions related to API settings update
export const SETAPISETTINGS = 'SETAPISETTINGS'

// actions relating to debouncing buttons
export const RESETDEBOUNCE = 'RESETDEBOUNCE'
export const TOGGLECLICKABILITY = 'TOGGLECLICKABILITY'

// actions related to airport and airline autocomplete
export const SET_AIRPORTS_LIST = 'SET_AIRPORTS_LIST'
export const SET_AIRLINES_LIST = 'SET_AIRLINES_LIST'

// actions related to pickup options
export const SET_SCHEDULE_PICKUP = 'SET_SCHEDULE_PICKUP'
export const SET_PICKUP_LOCATION = 'SET_PICKUP_LOCATION'
export const SET_DESTINATION = 'SET_DESTINATION'
export const SET_DESTINATION_AIRLINE = 'SET_DESTINATION_AIRLINE'
export const SET_PICKUP_AIRLINE = 'SET_PICKUP_AIRLINE'
export const SET_PICKUP_MEET_GREET = 'SET_PICKUP_MEET_GREET'
export const SET_PICKUP_TIME = 'SET_PICKUP_TIME'
export const SET_PICKUP_FLIGHT_NUM = 'SET_PICKUP_FLIGHT_NUM'
export const SET_DEFAULT_PICKUP = 'SET_DEFAULT_PICKUP'
export const RESET_PICKUP_OPTIONS = 'RESET_PICKUP_OPTIONS'

// actions related to the menu
export const TOGGLE_MENU = 'TOGGLE_MENU'
export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'

