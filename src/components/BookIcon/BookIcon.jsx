const BookIcon = ({ width = 42, height = 17, color = "#F9F9F9" }) =>  {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 42 17"
          fill="none"
        >
          <path
            d="M0 11V0H12.8903C14.6428 0 16.3497 0.558477 17.7633 1.59437C18.6084 2.21371 19.2833 3.0366 19.7252 3.98661L21.2165 7.19231C21.7922 5.78595 22.5143 4.44406 23.3707 3.18876L23.4446 3.08053C23.6905 2.72004 23.9717 2.38484 24.2838 2.07984L24.919 1.4592C25.333 1.05464 25.8242 0.737558 26.3634 0.526835L26.4183 0.505373C27.2728 0.171398 28.1822 0 29.0996 0H42V11H0Z"
            fill={color}
          />
          <rect y="13" width="42" height="4" fill={color} />
        </svg>
      );
    };

export default BookIcon;
