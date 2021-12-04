# API Endpoints

## microCMS API Schema

### [GET] /api/v1/authors

| Parameter   | Type              | Description |
| :---------- | :---------------- | :---------- |
| name        | Text-Field        | Name        |
| description | Text-Area         | Description |
| avatar      | Image             | Avatar      |
| accounts    | Custom (Accounts) | List of url |

#### Custom field type: Accounts

| Parameter   | Type       | Description     |
| :---------- | :--------- | :-------------- |
| GitHub      | Text-Field | GitHub url      |
| Twitter     | Text-Field | Twitter url     |
| Zenn        | Text-Field | Zenn url        |
| Qiita       | Text-Field | Qiita url       |
| SpeakerDeck | Text-Field | SpeakerDeck url |
| WordPress   | Text-Field | WordPress url   |

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
| author       | Content-Reference (Author)               | Author        |
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
