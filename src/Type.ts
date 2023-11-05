interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
}
