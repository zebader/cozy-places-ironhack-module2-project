# MVP - CozyPlaces 

## Description

Compare your favorite places from other similars matched by users when you travel. Using FourSquare API

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Splash** - As a user I want to be able to access the splash screen so that I see what the app is about. Before I can access it I will acces the login or the sign up.
- **sign up** - As a user I want to sign up on the webapp so that I can add places and compare them with other similars in other locations.
- **login** - As a user I want to be able to log in on the webapp so that I can get back to my profile
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my profile
- **Profile - Main page** - As a user I want a screen where I can check my places and personal information and add new favorite places. 
- **Add favorite place** - As a user I want to add my favorite places to my profile
- **Favorite places - List** - As a user I want to see the list of places I can add that match my query and add one.
- **Search by location** - As a user I want to search for a location and see all the matches with my favorite places .
- **Add matches** - As a user I want to look for a place and add a match with my favorite places or a new other that I can search and compare.
- **Place profile** - As a user I want to check the place profile and from there add it to my favorites, match it with other or search similar places to this place in other locations.

## Routes:

| Method | Route | Description|
|------|-------|------------|
| GET  | /     | Splash page route. If logged in takes to profile. If not redirects show splash and sign up button
| GET  | /auth/login | Login route. Renders login formulary view
| POST | /auth/login | Login route. Sends login formulary info to the server
| GET | /auth/signup | Signup route. Renders signup formulary view
| POST | /auth/signup | Signup route. Sends signup info to server and creates user in DB
| GET | /profile | Profile route. Renders profile view with a list of your favorite places
| GET | /places | Render form for search your favorite place
| GET | /places/search | Render the list for places from the previous search to Foursquare API
| GET | /places/:id | Render the details of a place
| POST | /places/delete/:id | Deletes a place form your profile
| POST | /places/new | Add a plce to your favorites
| GET | /create-match | Renders a two form to make the match posible
| GET | /create-match/search | Renders the list of places form the first place
| GET | /create-match/searchB | Renders the list of places form the second place
| GET | /create-match/new | Add the first place, using  querys
| GET | /create-match/newB | Add second place, using querys
| POST | /create-match/relations | Creates the relations between the two places
| GET | /display-match | Render a form to look after matches searching by city and your favorites
| GET | /display-match/search-by-city | Display the result of the search and render the result

<!-- .. -->

## Models

User model

```javascript
{
  username: String,
  password: String,
  img: { type: String, default: '../images/man.svg' },
  favoPlace: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

```

Places model

```javascript
 
{
  API_id: String,
  location: String,
  city: String,
  name: String,
  img: String,
  tips: String,
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}

```

* Relations

```javascript
{
  placeAId: String,
  nameA: String,
  imgAUrl: String,
  locationA: String,
  cityA: String,
  placeBId: String,
  nameB: String,
  imgBUrl: String,
  locationB: String,
  cityB: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}
```


## Backlog

- Edit user profile
- Upload pictures with cloudinary
- See other user profile and what user made a relation
- Refactor to scss
- Add similar places to place profile or recomendations
- Improve validations

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/zebader/cozy-places-ironhack-module2-project)

[Deploy Link](https://cozy-places-v2.herokuapp.com/)
