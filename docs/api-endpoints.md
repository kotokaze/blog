# API Endpoints

## microCMS API Schema

### [GET] /api/v1/site

| Parameter   | Type                                    | Description            |
| :---------- | :-------------------------------------- | :--------------------- |
| title       | Text-Field                              | Site Name              |
| url         | Text-Field                              | Site's baseUrl         |
| repo        | Text-Field                              | GitHub Repo Link       |
| author      | Content-Reference (Author)              | Site author            |
| description | Text-Area                               | Site description       |
| categories  | Multiple-Content-Reference (Category[]) | Recommended categories |


### [GET] /api/v1/authors

| Parameter   | Type              | Description |
| :---------- | :---------------- | :---------- |
| name        | Text-Field        | Name        |
| description | Text-Area         | Description |
| avatar      | Image             | Avatar      |
| accounts    | Custom (Accounts) | List of Ids |

#### Custom field type: Accounts

| Parameter   | Type       | Description    |
| :---------- | :--------- | :------------- |
| GitHub      | Text-Field | GitHub Id      |
| Twitter     | Text-Field | Twitter Id     |
| Zenn        | Text-Field | Zenn Id        |
| Qiita       | Text-Field | Qiita Id       |
| SpeakerDeck | Text-Field | SpeakerDeck Id |

---

### [GET] /api/v1/categories

| Parameter | Type       | Description |
| :-------- | :--------- | :---------- |
| name      | Text-Field | Tag name    |

---

### [GET] /api/v1/blogs

| Parameter    | Type                                     | Description   |
| :----------- | :--------------------------------------- | :------------ |
| title        | Text-Field                               | Title         |
| subtitle     | Text-Field                               | Subtitle      |
| categories   | Multiple-Content-References (Category[]) | Tags          |
| body         | Repeating-Fieald (Rich/Text-Area)        | Body Text     |
| description  | Text-Area                                | Abstruct      |
| ogImage      | Image                                    | Open Graph    |
| relatedBlogs | Multiple-Content-References (Blog[])     | Related Blogs |

---

### [GET] /api/v1/slides

| Parameter   | Type                                     | Description  |
| :---------- | :--------------------------------------- | :----------- |
| title       | Text-Field                               | Title        |
| description | Text-Area                                | Description  |
| ogImage     | Image                                    | Open Graph   |
| categories  | Multiple-Content-References (Category[]) | Tags         |
| filename    | Text-Field                               | PDF filename |

---

[Go Top](../README.md)
