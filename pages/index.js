import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function Home() {

  const imageRef = useRef(undefined);

  const [items, setItems] = useState('')
  let array;

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
}
