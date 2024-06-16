import axios from "axios";
import "./App.css";
import * as React from "react";
import { memo, useState, useEffect, useCallback } from "react";
import Map from "./components/Map";

type EffectCallback = () => (void | any);

interface Post {
  completed: boolean,
  id: number,
  title: string,
  userId: number,
}

const App: React.FC = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>("en")
  const [currentPost, setCurrentPost] = useState<string>("click on post for translation");
  const [translatedPost, setTranslatedPost] = useState<string>("");
  const [page, setPage] = useState<number>(10);
  const limit: number = 100;
  const [showDescription, setShowDescription] = useState<boolean>(false);
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
    const responce = await axios.get("https://jsonplaceholder.typicode.com/posts",{params: {_limit: limit}});
    setPosts(responce.data);
  }

   //   setTranslatedPost(response.data[0]);
    //       setToggleTranslatedPost(true);

  async function translate() {
    const options = {
      method: 'POST',
      url: 'https://google-api31.p.rapidapi.com/gtranslate',
      headers: {
        'x-rapidapi-key': '666d07c64dmshbea3d6f634623e9p1851bfjsn7ee4693455d1',
        'x-rapidapi-host': 'google-api31.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        text: currentPost,
        to: language,
        from_lang: 'la'
      }
    };

    try {
      const response = await axios.request(options);
      setTranslatedPost(response.data.translated_text);
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
  }, [page,posts])

  const setBackwardPage = useCallback(() => {
    if (page <= 10) {
      setBackwardDisabled(true);
    } else {
      setForwardDisabled(false);
      setBackwardDisabled(false);
      setPage(page - 10);
    }
  }, [page])

  return (
    <div className="App">
      <h3
      data-title="click on title for description"
      className="lorem"
      onClick={(event: React.MouseEvent<HTMLElement>) =>  setShowDescription(!showDescription)}>
      Lorem Ipsum Posts
      </h3>
      {showDescription && <h5 className="description">app is extracting posts from api and using api for translate</h5>}
      <Map position={language}/>
      <div data-title="select language">
      <select
        className="select"
        onChange={(event: React.FormEvent<HTMLSelectElement>) => setLanguage(event.currentTarget.value)}>
        <option value="en">ENGLISH</option>
        <option value="he">HEBREW</option>
        <option value="ja">JAPANESE</option>
        <option value="de">GERMAN</option>
      </select>
      </div>
      {slicePost.map((post: Post) => (
        <div className="id" key={post.id}>
          <div className="bold"> {post.id}</div>
          <div
            className="post"
            onClick={(event: React.MouseEvent<HTMLElement>) =>  setCurrentPost(event.currentTarget.innerHTML)}>
            {post.title}
          </div>
          <button
            data-title="delete"
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
          &#x227C;
        </button>
        {toggleTranslatedPost
          ? <div  data-title="translated post" className="translate">{translatedPost}</div>
          : <div className="loader">&#x1F5FA;</div>}
        <button
          data-title="next page"
          disabled={forwardDisabled}
          className="forward"
          onClick={setForwardPage}>
          &#x227D;
        </button>
      </div>
    </div>
  );
}

export default memo(App);
