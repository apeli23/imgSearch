###  Identify object in an image with Nextjs

##  Introduction
This article is to demonstrate how nextjs can be used to identify objects inside an image file.

##  Codesandbox 
The final version of this project can be viewed on   [Codesandbox](/).

<CodeSandbox
title="webrtc"
id=" "
/>

You can find the full source code on my [Github](/) repo.

##  Prerequisites

Basic/entry-level knowledge and understanding of javascript and React/Nextjs.

##  Setting Up the Sample Project

Create your project's root directory: `npx create-next-app videocall`

Head to the directory: `cd videocall`

We will use [Cloudinary](https://cloudinary.com/?ap=em) online storage feature to store the processed media files.

Include [Cloudinary](https://cloudinary.com/?ap=em) in your project dependencies: `npm install cloudinary`

Use this [Link](https://cloudinary.com/console) to create or log into your Cloudinary account. You should receive a dashboard containing the necessary environment variables for integration.

Create a new file named `.env.local` in your project root directory and use the following guide to fill your variables.
```
"pages/api/cloudinary.js"


CLOUDINARY_CLOUD_NAME =

CLOUDINARY_API_KEY = 

CLOUDINARY_API_SECRET=

```

Restart your project: `npm run dev`.

Create a directory `pages/api/cloudinary.js`.

Configure the environment keys and libraries.

```
"pages/api/cloudinary.js"


var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```
From Cloudinary, we will also consume one of its addons, specifically the `Cloudinary AI Content Analysis` add-on. This will enable you to have access to its content-aware detection model. There are several models involved as you can explore through this[link](https://cloudinary.com/documentation/cloudinary_ai_content_analysis_addon).

From your console, locate the addon from your navigation bar:

![Add-on](https://res.cloudinary.com/dogjmmett/image/upload/v1653037385/addons_nwlrm9.png "Add-on")

Use the Nextjs server-side handler function to execute the Nextjs post request:
```
"pages/api/cloudinary.js"


export default async function handler(req, res) {
    if (req.method === "POST") {
        let url = ""
        if (req.method === 'POST') {
        // console.log(fileStr)
        try {
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                detection:'coco_v1',
                auto_tagging : 0.6
            });
            uploaded_url = uploadedResponse.tags;
        } catch (error) {
            console.log(error);
        }
        res.status(200).json({ data:  uploaded_url});
        console.log('complete!');
    }
}
```
The above function will upload the request body media files to Cloudinary,  It will then follow the parameters instruction to detect the image items and send the list back to the front end as a response array.

## Frontend

We will require `html2canvas` to capture the image file from the DOM as a base64 string:
`npm install html2canvas`.

Include it in the home along with the react hooks we will use:

```
"pages/index.js"


import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
```

Declare the following variables in the Home function. We will use them as we move one

```
"pages/index.js"


export default function Home() {

  const imageRef = useRef(undefined);

  const [items, setItems] = useState('')
  let array;
  
  return(
      <>
      </>
  )
}
```

Fill the UI code in the return statement. The css files can be found in the Github repo:

```
"pages/index.js"


return (
    <div className="container">
      <h1>Identify object in an image with Nextjs</h1>
      <div className="row">
        <div className="column">
          <img ref={imageRef} src="sample.jpg" />

        </div>
        <div className="column">
          <section>
          <h3>Identified items Show Here</h3>

            {items && <h5>{items}</h5>}
          </section>
        </div>
      </div>
        <button className="button" onClick={tagHandler}>Identify</button>
    </div>
)
```

To identify the image items, we only require one function. Let's call it `itemHandler`:

```
"pages/index.js"


    const tagHandler = () => {
        const image = imageRef.current;
        html2canvas(image).then((canvas) => {
        try {
            fetch('/api/cloudinary', {
            method: 'POST',
            body: JSON.stringify({ data: canvas.toDataURL() }),
            headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then((data) => {
                array = data.data
                setItems(array.toString())

                console.log(items)
            });
        } catch (error) {
            console.error(error);
        }
        })
    }
```
First, we reference our initial image object(on the left below) and capture its base64 string using `html2canvas`. We then send it to the backend for item identification. The response will contain an array of items identified. We capture them as a string using the `setItems` state hook and use the hook to display the result to the user.


![complete UI](https://res.cloudinary.com/dogjmmett/image/upload/v1653033439/background_n1dung.png "complete UI")

That's it! Run your code to view your project.

Ensure to go through the article to enjoy the experience.