/* eslint no-console:0 */
// TODO: use compose to make these functions more functional
import { EASTERN as API_KEY, ENDPOINT } from "./keys";
import { objectToGenerator } from "../utils";

function createHeader() {
  return new Headers({
    "Content-Type": "application/json"
  });
}

function createBody(method, defaultProps = {}, input = {}) {
  const basic = {
    test: false,
    key: API_KEY,
    method
  };
  const props = defaultProps;
  props.update_time = new Date();
  props.passenger_pos = props.passenger_pos || "0,0";
  const body = Object.assign(basic, props, input);
  const newBody = Object.assign({}, body, { password: "hidden" });

  console.log(
    `Creating %c${newBody.method} %crequest: `,
    "color:blue; font-weight: bold;",
    "color: black;"
  );
  console.log(newBody);

  return JSON.stringify(body);
}

function createRequest(body) {
  const headers = createHeader();
  const request = {
    method: "POST",
    headers,
    body
  };
  return new Request(ENDPOINT, request);
}

export function searchAPI(user, search, method) {
  const { email, password } = user;
  const body = createBody(
    method,
    {},
    {
      email,
      password,
      search
    }
  );
  return createRequest(body);
}

export function signup(user = {}) {
  const { company, fname, lname, phone, country_id, email, password } = user;

  const method = "register";
  const params = {
    company,
    fname,
    lname,
    phone,
    country_id,
    email,
    password
  };
  const body = createBody(
    method,
    {},
    {
      params
    }
  );
  return createRequest(body);
}

export function login(user = {}) {
  const method = "login";
  const defaultProps = {
    email: "",
    password: ""
  };
  const body = createBody(method, defaultProps, user);
  return createRequest(body);
}

export function verifyCode(user = {}) {
  const method = "verify_code";
  const defaultProps = {
    email: "",
    password: "",
    code: ""
  };
  const body = createBody(method, defaultProps, user);
  return createRequest(body);
}

export function resendCode(user = {}) {
  const method = "resend_code";
  const defaultProps = {
    email: "",
    password: ""
  };
  const body = createBody(method, defaultProps, user);
  return createRequest(body);
}

export function resetPasswordCode(user = {}) {
  const method = "reset_password_code";
  const defaultProps = {
    email: ""
  };
  const body = createBody(method, defaultProps, user);
  return createRequest(body);
}

export function verifyPasswordCode(user = {}) {
  const method = "verify_password_code";
  const defaultProps = {
    email: "",
    code: ""
  };
  const body = createBody(method, defaultProps, user);
  return createRequest(body);
}

export function resetPassword(user = {}) {
  const method = "reset_password";
  const defaultProps = {
    email: "",
    code: "",
    password: ""
  };
  const body = createBody(method, defaultProps, user);
  return createRequest(body);
}

export function updateAccount(email, oldPassword, update = {}) {
  // creates the update params to send to the backend. throws error when giving undefined values.
  function createUpdateParams(updateParams) {
    const possibles = [
      "company",
      "phone",
      "country_id",
      "password",
      "receive_email",
      "receive_sms",
      "tip"
    ];
    const submission = {};
    for (const [key, value] of objectToGenerator(updateParams)) {
      if (possibles.find(el => el === key) && value !== undefined)
        submission[key] = value;
    }
    return submission;
  }

  const method = "update_account";
  const defaultProps = {
    password: oldPassword,
    email
  };
  const params = createUpdateParams(update);
  const body = createBody(method, defaultProps, { params });
  return createRequest(body);
}

export function addCard(email, password, card = {}) {
  const { cc_type, cc_name, cc_number, cc_mo, cc_yr, cc_code, cc_zip } = card;

  const method = "add_card";
  const defaultProps = {
    email,
    password
  };
  const params = {
    cc_type,
    cc_name,
    cc_number,
    cc_mo,
    cc_yr,
    cc_code,
    cc_zip
  };
  const body = createBody(method, defaultProps, { params });
  const request = createRequest(body);
  return request;
}

export function getEstimates(email, password, ride, location, jobNumber) {
  const {
    meeting = {
      latlng: "",
      address: ""
    },
    destination = {
      latlng: "",
      address: ""
    },
    car_type,
    childseats = {
      infant: 0,
      toddler: 0,
      booster: 0
    },
    allow_pet,
    meet_greet,
    tip_rate,
    service_type,
    passenger_name,
    passenger_email,
    airline = "",
    flight_no = ""
  } = ride;
  const { lat, lng } = location;

  if (location.available && meeting.fromAutofill) {
    // means user used Find Location button
    meeting.latlng = `${lat},${lng}`;
  }

  const method = "get_estimates";
  const defaultProps = {
    email,
    password,
    passenger_pos: `${lat},${lng}`
  };
  const params = {
    pickup: meeting,
    airline,
    destination,
    car_type,
    childseats,
    allow_pet,
    meet_greet,
    tip_rate,
    flight_no,
    passenger_name,
    passenger_email,
    service_type: service_type.toLowerCase()
  };
  if (jobNumber) params.job_no = jobNumber;
  const body = createBody(method, defaultProps, { params });
  return createRequest(body);
}

export function bookTrip(email, password, name, quote_id, request, couponCode) {
  const method = "book_trip";
  const defaultProps = {
    email,
    password,
    passenger_name: name,
    quote_id
  };
  const {
    phone2,
    phone2_code,
    special_request,
    vouchers_id,
    pickupTime
  } = request;
  const rideOptions = {
    phone2,
    phone2_code,
    special_request,
    vouchers_id
  };
  if (pickupTime) {
    rideOptions.reservation = pickupTime.toISOString();
  }
  if (couponCode !== "") {
    rideOptions.coupon_code = couponCode;
  }
  const mergedProps = Object.assign({}, defaultProps, {
    params: rideOptions
  });
  const body = createBody(method, mergedProps);
  return createRequest(body);
}

export function cancelTrip(email, password, job_no) {
  const method = "cancel_trip";
  const defaultProps = {
    email,
    password,
    job_no
  };
  const body = createBody(method, defaultProps);
  const request = createRequest(body);
  return request;
}

export function getProfile(email, password, location) {
  const method = "get_profile";
  const { lat, lng } = location;
  const defaultProps = {
    email,
    password,
    passenger_pos: `${lat},${lng}`
  };
  const body = createBody(method, defaultProps);
  const request = createRequest(body);
  return request;
}

export function getJobList(email, password, limit) {
  const method = "get_job_list";
  const defaultProps = {
    email,
    password,
    limit
  };
  const body = createBody(method, defaultProps);
  const request = createRequest(body);
  return request;
}

export function getJobInfo(email, password, job_no, location) {
  const method = "get_job_info";
  const { lat, lng } = location;
  const defaultProps = {
    email,
    password,
    job_no,
    passenger_pos: `${lat},${lng}`
  };
  const body = createBody(method, defaultProps);
  const request = createRequest(body);
  return request;
}

export function updateJob(email, password, job_no, params) {
  const method = "update_job";
  const defaultProps = {
    email,
    password,
    job_no,
    params
  };
  const body = createBody(method, defaultProps);
  return createRequest(body);
}

export function chargeToken(email, password, job_no, amount, tip) {
  const method = "charge_token";
  const defaultProps = {
    cc_response: true,
    email,
    password,
    job_no,
    amount,
    tip
  };
  const body = createBody(method, defaultProps);
  const request = createRequest(body);

  return request;
}

export function alertDriver(email, password, job_no, minutes) {
  const minutesMap = {
    0: "OK",
    5: "5MIN",
    10: "10MIN",
    15: "15MIN",
    30: "30MIN"
  };
  const note_type = minutesMap[minutes];
  const method = "create_note";
  const defaultProps = {
    email,
    password,
    job_no,
    note_type
  };
  const body = createBody(method, defaultProps);
  const request = createRequest(body);

  if (!note_type)
    throw new Error(
      `${minutes} minutes is not a valid amount of waiting time.`
    );
  return request;
}
