# Netflix copy created with React App

This is another React project I created to challenge myself about learning more about React. 
This project is based on creating a front end copycat of Netflix browser website, it uses	**React**, **Typescript**, **Sass**, **React Router** and **Axios**.
In terms of the content, I have used [The Movie DB](https://www.themoviedb.org/documentation/api) to get the data and fill up the page.


## Setup

In order for everything to work, you are going to need an API key from [The Movie DB](https://www.themoviedb.org/documentation/api), and insert it in a file "src/helper/useAxios.ts"

![Code preview](/Readme/Capture1.JPG)

Dependencies : 
- "sass": "^1.54.4",
- "react-router-dom": "^6.4.1",
- "typescript": "^4.8.4"

## About the project
| First Header  | Second Header |
| ------------- | ------------- |
| ![Sitemap](/Readme/netflix-base.jpg)  | ![Sitemap](/Readme/netflix-tv.jpg)  |
| ![Sitemap](/Readme/netflix-login.jpg)  | ![Sitemap](/Readme/netflix-preview.jpg)  |
| ![Sitemap](/Readme/netflix-arrowlist.jpg)  | ![Sitemap](/Readme/netflix-language.jpg)  |



## Project structure

![Sitemap](/Readme/full-structure.png)


## Abstract structure
This layout contains all the unique sequences of components. It also shows where useContext and useAxios hooks are used.

![Abstract structure](/Readme/abstract-structure.png)

As there is a quite few hight level components that require specific data, I have decided to use context to send global functions and lists to those specific components. 
- ContextGlobal
  - All tile components require the access to global list of shows that have been liked or added to list. This is due to the fact that I am using external database to get the shows and I am unable to modify them at the source to contain user information. 
  - Button component uses context to get global functions responsible for playing, adding, removing, changing, rating shows. 

- ContextFilter
  -  This context is responsible for managing filter data inside the NavSub component, as well as the list view type (list/tiled).



## Components list

![Components list](/Readme/components.png)

### Components description
- **Highlight** - | Main show display found in Home, Tv shows, and Movies pages. Takes a show information and displays general information about it.
- **ListDistributor** - | Distributes different lists of shows for different pages. Takes an array of lists.
- **List** - A list of shows with interactive back and forward button which allows horizontal scrolling for different shows. takes list of shows.
- **ListPreview** - Window that displays a list of shows through the title link of list component. Takes list of shows.
- **TiledList** - List of shows in tiled view, which supports filtering.
- **Tile** - An image tile for a show with hover animation that expands it.
- **Nav** - Navigation bar with different links
- **NavSub** - 2 level of navigation that contains different genre options and view mode selection.
- **Preview** - Displays a detailed information's about a show, its episodes, cast, and similar/recommended shows.
- **EpisodeTile** - Tile used to displays season episode inside preview component.
- **RecommendationTile** - Tile used to display recommended shows inside preview component.
- **Loading** - Displays Netflix loading animation while the data is being loaded to the page.
- **Dropdown** - Different reusable dropdowns for filters
- **Button** - Creates different reusable buttons.



## Data Flow

![Data flow](/Readme/data-flow.png)

The data starts in the Global level, goes through a sorting function that arranges it into more functional way. It then goes to individual pages where it is split across more components.

# Site Map
![Sitemap](/Readme/sitemap.png)


## Limitations
 - Filter settings are based on the source database therefore, different lists of shows might be displayed each time.
 - No playback window, [The Movie DB](https://www.themoviedb.org/documentation/api) does not support direct clips.

## Improvements
- [ ] Tile Animation stops working sometimes,
- [ ] useAxios could possible be re-arranged to remove sorting function when the data is fetched.
- [ ] Individual pages could be compressed into 1 component.
- [ ] ListPreview currently shows only the list that user clicks on, and not all, and no filter option.
- [ ] Custom filter functions 

