import ArrowImg from './assets/arrow.svg'
import Nudake from './containers/Nudake';
import RotateCanvas from './containers/RotateCanvas';

function App() {
  return (
    <>
      <div className="app">
        <section className="section-1">
          <header>
            <h1>Portfolio</h1>
            <ul>
              <li>instagram</li>
              <li>twitter</li>
              <li>codepen</li>
            </ul>
          </header>
          <main>
            <div><Nudake /></div>
          </main>
        </section>
        <section className="section-2">
          What is Lorem Ipsum?
        </section>
        <section className="section-3">
          <aside>
            <div className="top">
              1914 translation by H. Rackham
            </div>
            <div className="bottom">
              <img src={ArrowImg} />
              <img src={ArrowImg} />
            </div>
          </aside>
          <article>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </article>
        </section>
        <section className='section-4'>
          <RotateCanvas />
        </section>
      </div>
      <footer>
        <div className='email'>test@gmail.com</div>
      </footer>
    </>
  )
}

export default App
