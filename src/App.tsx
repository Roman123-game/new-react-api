import axios from "axios";
import "./App.css";
import * as React from "react";
import { memo, useState, useEffect, useCallback } from "react";
import Map from "./components/Map";
import SelectLanguage from "./components/Select/SelectLanguage";

type EffectCallback = () => (void | any);

interface Post {
  id: number,
  text: string,
  author: string,
  category: string
}

const App: React.FC = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>("en")
  const [currentPost, setCurrentPost] = useState<string>("click on text");
  const [translatedPost, setTranslatedPost] = useState<string>("");
  const [page, setPage] = useState<number>(10);
  const limit: number = 100;
  const [forwardDisabled, setForwardDisabled] = useState<boolean>(false);
  const [backwardDisabled, setBackwardDisabled] = useState<boolean>(false);
  const [toggleTranslatedPost, setToggleTranslatedPost] = useState<boolean>(false);
  let slicePost = posts.slice(page - 10, page)

  useEffect((): ReturnType<EffectCallback> => {
    fetchPost()
  }, []);

  useEffect((): ReturnType<EffectCallback> => {
    slicePost = posts.slice(page - 10, page)
  }, [page]);

  useEffect((): ReturnType<EffectCallback> => {
    translate();
  }, [currentPost]);

  async function fetchPost() {
    const options = {
  method: 'GET',
  url: 'https://famous-quotes4.p.rapidapi.com/random',
  params: {
    category: 'all',
    count: limit
  },
  headers: {
    'x-rapidapi-key': '666d07c64dmshbea3d6f634623e9p1851bfjsn7ee4693455d1',
    'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  setPosts(response.data);

} catch (error) {
	console.error(error);
}
  }

  async function translate() {
    const options = {
      method: 'POST',
      url: 'https://simple-translate2.p.rapidapi.com/translate',
      params: {
        source_lang: 'la',
        target_lang: language
      },
      headers: {
        'x-rapidapi-key': '666d07c64dmshbea3d6f634623e9p1851bfjsn7ee4693455d1',
        'x-rapidapi-host': 'simple-translate2.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        sourceText: currentPost
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.data.targetText)
      setTranslatedPost(response.data.data.targetText);
      setToggleTranslatedPost(true);
    } catch (error) {
      console.error(error);
    }

  }


  const removePost = useCallback((event: any) => {
    const afterFilter = posts.filter((value: any) => value.id !== parseInt(event.target.value));
    setPosts(afterFilter);
  }, [posts])

  const setForwardPage = useCallback(() => {
    if (page >= posts.length) {
      setForwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page + 10);
    }
  }, [page, posts])

  const setBackwardPage = useCallback(() => {
    if (page <= 10) {
      setBackwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page - 10);
    }
  }, [page])

  const ArrowBackwardFunction = () => {
    if (page > 50) {
      return <>&#x022D8;</>;
    }
    else if (page > 20) {
      return <>&#x0226A;</>;
    }
    else {
      return <>&#60;</>;
    }
  }

  const ArrowForwarddFunction = () => {
    if (page > 80) {
      return <>&#x3E;</>;
    }
    else if (page > 50) {
      return <>&#x0226B;</>;
    }
    else {
      return <>&#x022D9;</>;
    }
  }

  return (
    <div className="App">
      <h3
        data-title="app is extracting famous people quotes from api and using api for translate"
        className="lorem">
        famous people quotes
      </h3>
      <Map position={language} />
      <SelectLanguage onChange={(event: React.FormEvent<HTMLSelectElement>) => setLanguage(event.currentTarget.value)} />
      {slicePost.map((post: Post) => (
        <div className="post_container" key={post.id}>
          <div className="id"> {post.author}</div>
          <div
            className="post"
            onClick={(event: React.MouseEvent<HTMLElement>) => setCurrentPost(event.currentTarget.innerHTML)}>
            {post.text}
          </div>
          <button
            className="buttonX"
            value={post.id}
            onClick={(event: React.FormEvent<HTMLButtonElement>) => { removePost(event) }}>
            x
          </button>
        </div>
      ))}
      <div className="container">
        <button
          data-title="previous page"
          disabled={backwardDisabled}
          className="backward"
          onClick={setBackwardPage}>
          <ArrowBackwardFunction />
        </button>
        {toggleTranslatedPost
          ? <div data-title="translated post" className="translate">{translatedPost}</div>
          : <div className="loader">&#x1F4A4;</div>}
        <button
          data-title="next page"
          disabled={forwardDisabled}
          className="forward"
          onClick={setForwardPage}>
          <ArrowForwarddFunction />
        </button>
      </div>
    </div>
  );
}

export default memo(App);
