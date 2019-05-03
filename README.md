# CosyPlaces 

## Description

Compare your favorite places from other similars matched by users when you travel.

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
- **Search by location** - As a user I want to search for a location and see all the matches with my favorite places and if I don´t have matches, see similar places.
- **Add matches** - As a user I want to look for a place and add a match with my favorite places or a new other that I can search and compare.
- **Place profile** - As a user I want to check the place profile and from there add it to my favorites, match it with other or search similar places to this place in other locations.

## Routes:

| Method | Route | Description|
|------|-------|------------|
| GET  | /     | Splash page route. If logged in takes to profile. If not redirects show splash and sign up button
| GET  | /login | Login route. Renders login formulary view
| POST | /login | Login route. Sends login formulary info to the server
| GET | /signup | Signup route. Renders signup formulary view
| POST | /signup | Signup route. Sends signup info to server and creates user in DB
| GET | /profile/:userId | Profile route. Renders profile view
| GET | /findplaces | Profile route. Sends add friends formaliry into DB
<!-- .. -->

## Models

User model

```javascript
{
  userId: String
  username: String
  email: String
  password: String
  timeStamp: Date
  myPlaces: [String]
}

```

Places model

```javascript

id: String

```

* Relations

```javascript
[ {
 id_A:String,
id_B: String,
users:[] } ]
```


## Backlog

..

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)