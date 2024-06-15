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

  async function translate() {
    const options = {
      method: 'POST',
      url: 'https://translate-plus.p.rapidapi.com/translate',
      headers: {
        'x-rapidapi-key': '666d07c64dmshbea3d6f634623e9p1851bfjsn7ee4693455d1',
        'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        text: currentPost,
        source: 'la',
        target: language
      }
    };

    try {
      const response = await axios.request(options)
      setTranslatedPost(response.data.translations.translation);
      setToggleTranslatedPost(true);
    } catch (error) {
      console.error(error)
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
      <h3 className="lorem"> Lorem Ipsum Posts</h3>
      <Map position={language}></Map>
      <select
        className="select"
        onChange={(event: React.FormEvent<HTMLSelectElement>) => setLanguage(event.currentTarget.value)}>
        <option value="en">ENGLISH</option>
        <option value="iw">HEBREW</option>
        <option value="ja">JAPANESE</option>
        <option value="de">GERMAN</option>
      </select>
      {slicePost.map((post: Post) => (
        <div className="id" key={post.id}>
          <div className="bold"> {post.id}</div>
          <div
            className="title"
            onClick={(event: React.MouseEvent<HTMLElement>) =>  setCurrentPost(event.currentTarget.innerHTML)}>
            {post.title}
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
          disabled={backwardDisabled}
          className="backward"
          onClick={setBackwardPage}>
          &#x227C;
        </button>
        {toggleTranslatedPost
          ? <div className="translate">{translatedPost}</div>
          : <div className="loader">&#x1F5FA;</div>}
        <button
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
// Afrikaans	af
// Albanian	sq
// Amharic	am
// Arabic	ar
// Armenian	hy
// Azerbaijani	az
// Basque	eu
// Belarusian	be
// Bengali	bn
// Bosnian	bs
// Bulgarian	bg
// Catalan	ca
// Cebuano	ceb
// Chichewa	ny
// Chinese (Simplified)	zh-CN
// Chinese (Traditional)	zh-TW
// Corsican	co
// Croatian	hr
// Czech	cs
// Danish	da
// Dutch	nl
// English	en
// Esperanto	eo
// Estonian	et
// Filipino	tl
// Finnish	fi
// French	fr
// Frisian	fy
// Galician	gl
// Georgian	ka
// German	de
// Greek	el
// Gujarati	gu
// Haitian Creole	ht
// Hausa	ha
// Hawaiian	haw
// Hebrew	iw
// Hindi	hi
// Hmong	hmn
// Hungarian	hu
// Icelandic	is
// Igbo	ig
// Indonesian	id
// Irish	ga
// Italian	it
// Japanese	ja
// Javanese	jw
// Kannada	kn
// Kazakh	kk
// Khmer	km
// Kinyarwanda	rw
// Korean	ko
// Kurdish (Kurmanji)	ku
// Kyrgyz	ky
// Lao	lo
// Latin	la
// Latvian	lv
// Lithuanian	lt
// Luxembourgish	lb
// Macedonian	mk
// Malagasy	mg
// Malay	ms
// Malayalam	ml
// Maltese	mt
// Maori	mi
// Marathi	mr
// Mongolian	mn
// Myanmar (Burmese)	my
// Nepali	ne
// Norwegian	no
// Odia (Oriya)	or
// Pashto	ps
// Persian	fa
// Polish	pl
// Portuguese	pt
// Punjabi	pa
// Romanian	ro
// Russian	ru
// Samoan	sm
// Scots Gaelic	gd
// Serbian	sr
// Sesotho	st
// Shona	sn
// Sindhi	sd
// Sinhala	si
// Slovak	sk
// Slovenian	sl
// Somali	so
// Spanish	es
// Sundanese	su
// Swahili	sw
// Swedish	sv
// Tajik	tg
// Tamil	ta
// Tatar	tt
// Telugu	te
// Thai	th
// Turkish	tr
// Turkmen	tk
// Ukrainian	uk
// Urdu	ur
// Uyghur	ug
// Uzbek	uz
// Vietnamese	vi
// Welsh	cy
// Xhosa	xh
// Yiddish	yi
// Yoruba	yo
// Zulu	zu
// Hebrew	he
// Chinese (Simplified)	zh