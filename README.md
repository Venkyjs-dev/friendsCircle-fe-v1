# friendsCircle-fe-v1

### unit 1:

- Create vite + react applicaton
- Remove unnessary code and create Hello world app.
- Install tailwind css
- Configure tailwind into project - follow steps from tailwind official website
- check tailwind is working or not by adding some basic classes
- Install daisyUI library for custom component - check official documentation and react more about it.
- Add nav bar component from daisyUI to App.jsx
- Create separate NavBar.jsx and import it into App.js
- Install react-router-dom
- Create BrowserRouter > Routes > Route = / Body > ChildRoutes
- Create Outlet in your body component
- Create footer.

### unit 2:

- install axios
- solve cors problem:
  - install cors in backend ==> add this cors middleware to app with configuration: origin, credientials: true
  - in front-end, while making api call using axios, pass withcredentials:true in axios api calls

#### Body

    NavBar
    Route = / => Feed
    Route = /login => Login
    Route = /signup ==> SignUp
    Route = /connections => Connections
    Route = /profile => Profile

### unit 3

- Intall react-redux and redux toolkit
- configureStroe => Provider store to app => createSlice => add reducers to store
- Check login user data is updated in the store, using redux dev tools
- Navbar should update as soon as user login
- Add conctansta file + create component folder

### unit 4

- You should not be access other routes without login
- If token is not present redirect user to login page
