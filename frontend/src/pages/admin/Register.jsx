import { useState, useEffect } from 'react';
import { Alert, Spinner } from 'flowbite-react';
import { LockClosedIcon, ArrowLeftCircleIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MainLogo from '../../assets/main-logo.png';
import { addUser, reset } from '../../features/users/userSlice';
import moment from 'moment';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    dept: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, email, role, dept, contact, password, confirmPassword } =
    formData;
  const join_date = selectedDate;

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.users,
  );

  useEffect(() => {
    if (user.role !== 'Admin') {
      navigate('/');
    }
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      navigate('/admin/dashboard');
    }
  }, [user, users, isError, isSuccess, message, navigate, dispatch, error]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getCurrentDate = () => {
    return moment().format('YYYY-MM-DD');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Password do not match');
    } else {
      const userData = {
        name,
        email,
        role,
        dept,
        contact,
        join_date,
        password,
      };
      dispatch(addUser(userData));
      dispatch(reset());
    }
  };

  const ErrorContainer = () => {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Error!</span> {error}
        </span>
      </Alert>
    );
  };

  return (
    <>
      <a onClick={() => navigate('/admin/employees')}>
        <ArrowLeftCircleIcon
          className="h-10 w-10 absolute m-4 text-teal-500 hover:text-teal-600 cursor-pointer"
          aria-hidden="true"
        />
      </a>
      <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={MainLogo}
              height={100}
              width={70}
            />
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add New User
            </h2>
          </div>
          {error ? <ErrorContainer /> : <></>}
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <div className="flex">
                  <button
                    className="relative block w-max appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    type="button"
                    disabled
                  >
                    Role
                  </button>
                  <label htmlFor="roles" className="sr-only">
                    Select an option
                  </label>
                  <select
                    id="roles"
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    name="role"
                    value={role}
                    onChange={onChange}
                    required
                  >
                    <option>Select a Role</option>
                    <option value="Admin">Admin </option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex">
                  <button
                    className="relative block w-max appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    type="button"
                    disabled
                  >
                    Department
                  </button>
                  <label htmlFor="roles" className="sr-only">
                    Select an option
                  </label>
                  <select
                    id="depts"
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    name="dept"
                    value={dept}
                    onChange={onChange}
                    required
                  >
                    <option>Select a Dept</option>
                    <option value="IT">IT </option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing </option>
                    <option value="Administration">Administration </option>
                    <option value="Human Resources">Human Resources </option>
                    <option value="Operations Management">
                      Operations Management{' '}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-number" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="contact-number"
                  name="contact"
                  type="text"
                  value={contact}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <div className="flex">
                  <button
                    className="relative block w-max appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    type="button"
                    disabled
                  >
                    DoJ
                  </button>
                  <label htmlFor="join-date" className="sr-only">
                    Joining Date
                  </label>
                  {/* <input
                    id="join-date"
                    name="date"
                    type="date"
                    value={join_date}
                    onChange={onChange}
                    max={getCurrentDate}
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    placeholder="Joining Date"
                  /> */}
                  <DatePicker
                    name="join-date"
                    selected={join_date}
                    onChange={handleDateChange}
                    maxDate={getCurrentDate}
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    placeholderText="Select a date"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                    aria-hidden="true"
                  />
                </span>
                {isLoading ? (
                  <Spinner aria-label="Default status example" />
                ) : (
                  <>Add</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
