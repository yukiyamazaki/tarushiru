import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Navbar from './Navbar';

const Searchflavors = () => {
  const [modal,setModal] = useState(false);
  const [flavors,setFlavors] = useState([]);
  const [keyword,setKeyword] = useState("");
  console.log(!flavors.length);
  //絞り込みエリアのcheckbox
  // 元のデータ
  //  taste
  const [tastes,setTaste] = useState([]);
  //  type
  const [types,setType] = useState([]);
  //  category
  const [categories,setCategory] = useState([]);

  //検索inputの定義
  //keyword input
  const handleChange = (e) =>{
    // setKeyword(e.target.value);
    setKeyword(e.target.value);
  }

  // チェックボックス
  //taste
  const changeTaste = (e) =>{
    if(tastes.includes(e.target.value)){
      //OFF
      setTaste(tastes.filter(item => item !== e.target.value));
    }else{
      // ON
      setTaste([...tastes, e.target.value]);
    }
  }
  
  //type
  const changeType = (e) =>{
    if(types.includes(e.target.value)){
      //OFF
      setType(types.filter(item => item !== e.target.value));
    }else{
      // ON
      setType([...types, e.target.value]);
    }
  };
  
  //type
  const changeCategory = (e) =>{
    if(categories.includes(e.target.value)){
      //OFF
      setCategory(categories.filter(item => item !== e.target.value));
    }else{
      // ON
      setCategory([...categories, e.target.value]);
    }
  };
 
  //do the modal ON
  const handdleModal = e =>{
    e.preventDefault();
    if(!modal){
      setModal(true);
    }
  }

   //do the modal OFF
   const isModal_off = e => {
    e.preventDefault();
    if(modal){
      setModal(false);
    }
  }

  //flavorsフィールドの￥初期値は全件表示
  const getFlavors = async() =>{
    // This is error comform...
    try {
      const response = await axios.post('api/flavors');
      setFlavors(response.data.flavors);
    }catch(error){
      console.log('Searchflavor情報取得エラー');
      return;
    }
  }
  if(!flavors.length){
    getFlavors();
  }

  const narrowFlavor = async(e) =>{
    e.preventDefault();
    //formに入力された値をもとに検索結果の取得
    if(!confirm('送信します。よろしいですか？')) {
      return;
    }

    let sendParams = {
      tastes: tastes,
      types:types,
      categories:categories,
    }

    //キーワード検索のinputに値があれば、checkboxは無視して検索
    if(keyword){
      const params = new FormData();
      params.append("search_keyword",keyword);
      axios.post('api/Searchflavors',params)
      .then(function(response){
        // 成功した時
        console.log(response.data.flavors);
        setFlavors(response.data.flavors);
      })
      .catch(function(error){
        // 失敗したとき
        console.log('Keywordエラー');
      });
      //input初期化
      setKeyword("");
      //modalを閉じる
      setModal(false);

    }else{
      const params = new FormData;

      _.forEach(sendParams, (value, key) => {
        if (Array.isArray(value)) {
          _.forEach(value, (v, _) => {
            params.append(key + '[]', v)
          })
        } else {
          params.append(key, value)
        }
      })
      
      axios.post('api/checkedFlavors',params)
        .then((response)=>{
          console.log(response.data.flavors);
          setFlavors(response.data.flavors);
        })
        .catch((error)=>{
            console.log(error.data,'formdataエラー');
        });

        //初期化
        setTaste("");
        setType("");
        setCategory("");
        //input初期化
        setKeyword("");
        //modalを閉じる
        setModal(false);
    }
  }

  return(
    <>
      {/* header */}
      <div className="contents_header_wrap">
        {/* This is props TEST */}
       <Navbar
        id="12345"
        name='zakizaki'
        look='pppppppp'
       />
        
        {/* ここからMain */}
        <main>
          <div className="style_wrap_intro">
            <div className="style_topImage">
              <img src="images/design/electnic.svg"></img>
            </div>
            <h2 className="style_title">フレイバーを選ぶ</h2>
            <div className="style_description">あなたのご希望をもとに<span>あなたにおすすめの順に</span>フレイバーを全て表示しています。希望条件が明確な場合は、絞り込んでみましょう。</div>
          </div>
          <div className="style_wrap_search">
            <div className="search_btn_wrap">
              <button className="search_btn_how">
                <img/>
                <span>フレイバの選び方</span>
              </button>
              <button 
                className="search_btn_filter"
                onClick={handdleModal} 
              >
                <img/>
                <span>絞り込み</span>
              </button>
            </div>
            <div className="style_count">
              20人
            </div>
          </div>

          {/* ここからFlavorの検索結果を表示 */}
          <ul className="contents_style_ul">
          {flavors.map((flavor) =>
              <li key={flavor.id}>
                <div className="style_wraper_content">
                  <a className="content_main">
                    <div className="style_img">
                      <img src="images/coaches/S__6979644.jpg" alt="" />
                    </div>
                    <div className="style_flavor_text">
                      <div className="style_flavor_name">{flavor.name}</div>
                      <div className="style_flavor_discription">
                        {flavor.feature_intro}
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            )}            
          </ul>

          <div className="style_wrap_more">
            <button>
              もっとをみる
              <img src="images/design/cheak_blue.svg"/>
            </button>
          </div>
          <h3 className="style_subTitle">
            フレイバー選びにお困りですか？</h3>

            {/* 絞り込みbuttonをクリック時に表示 */}
            <div 
              className={modal ? "style_modalMenu_wrapper" : "style_modalMenu_wrapper style_modal_disable"}
            >
            <div className="style_modalMenu_bg"></div>
            <div className="style_modal_content">
            {/* formエリア */}
              <form 
                id="narrowForm" 
                className="style_modal_mainwapper"
                method="get"
              >
                <div className="style_main_choices">
                  <div className="style_main_inputkeyword">キーワードで絞り込み</div>
                  <div className="style_inputkeyword_wrap">
                    <input 
                      type="text" 
                      name="name"
                      className="style_inputkeyword_text"
                      value={keyword}
                      onChange={handleChange}
                    />
                  </div>
                  {/* CheckBox（teste） */}
                  <div className="style_main_inputTitle">テイスト</div>
                  <ul className="style_main_list">
                    <li className="style_main_listItem">
                      <input 
                        className="style_checkbox_teste" 
                        type="checkbox"
                        id="taste_sweet"
                        value="sweet"
                        checked={tastes.includes('sweet')}
                        onChange={changeTaste}
                      />
                      <label 
                        className="style_label_teste" 
                        htmlFor="taste_sweet"
                      >
                        <div className="taest_label_name">
                            あまめ
                        </div>
                      </label>
                    </li>
                    <li className="style_main_listItem">
                      <input 
                        className="style_checkbox_teste" 
                        type="checkbox"
                        id="taste_fefresh"
                        value="flesh"
                        checked={tastes.includes('flesh')}
                        onChange={changeTaste}
                      />
                      <label 
                        className="style_label_teste" htmlFor="taste_fefresh"
                      >
                        <div className="taest_label_name">
                            さっぱり
                        </div>
                      </label>
                    </li>
                    <li className="style_main_listItem">
                      <input 
                        className="style_checkbox_teste" 
                        type="checkbox"
                        id="taste_hot"
                        value="hot"
                        checked={tastes.includes('hot')}
                        onChange={changeTaste}
                        />
                      <label 
                        className="style_label_teste" 
                        htmlFor="taste_hot"
                      >
                        <div className="taest_label_name">
                            からめ
                        </div>
                      </label>
                    </li>
                  </ul>

                  {/* CheckBox（type） */}
                  <div className="style_main_inputTitle">タイプ</div>
                  <ul className="style_main_list__type">
                    <li className="style_main_listItem__type">
                      <input 
                        className="style_checkbox_type" 
                        type="checkbox" 
                        id="type_main"
                        value="main"
                        checked={types.includes('main')}
                        onChange={changeType}
                        />
                      <label 
                        className="style_label_type" 
                        htmlFor="type_main"
                      >
                        <div className="taest_label_name">
                          王道
                        </div>
                      </label>
                    </li>
                    <li className="style_main_listItem__type">
                      <input 
                        className="style_checkbox_type" 
                        type="checkbox" 
                        id="type_weird"
                        value="wired"
                        checked={types.includes('wired')}
                        onChange={changeType}
                        />
                      <label 
                        className="style_label_type" 
                        htmlFor="type_weird"
                      >
                        <div className="taest_label_name">
                          変わり種
                        </div>
                      </label>
                    </li>
                  </ul>

                  {/* CheckBox（category） */}
                  <div className="style_main_inputTitle">カテゴリ</div>
                  {/* フルーツ系 */}
                  <div className="style_main_input__category">
                    <ul className="style_category_wrap">
                      <li className="style_cate_listItem">
                        <input 
                          type="checkbox" 
                          id="category_fruit" className="style_checkbox_category"
                          value="fruit"
                          checked={categories.includes('fruit')}
                          onChange={changeCategory}
                          />
                        <label 
                          htmlFor="category_fruit" className="style_label_category"
                        >フルーツ系</label>
                      </li>
                      {/* カクテル */}
                      <li className="style_cate_listItem">
                        <input 
                          type="checkbox" 
                          id="category_drink" className="style_checkbox_category"
                          value="drink"
                          checked={categories.includes('drink')}
                          onChange={changeCategory}
                        />
                        <label 
                          htmlFor="category_drink" className="style_label_category"
                        >カクテル系</label>
                      </li>
                      {/* スパイス系 */}
                      <li className="style_cate_listItem">
                        <input 
                          type="checkbox" 
                          id="category_spices" className="style_checkbox_category"
                          value="spices"
                          checked={categories.includes('spices')}
                          onChange={changeCategory}
                        />
                        <label 
                          htmlFor="category_spices" className="style_label_category"
                        >スパイス系</label>
                      </li>
                      {/* その他 */}
                      <li className="style_cate_listItem">
                        <input 
                          type="checkbox" 
                          id="category_other" className="style_checkbox_category"
                          value="other"
                          checked={categories.includes('other')}
                          onChange={changeCategory}
                        />
                        <label 
                          htmlFor="category_other" className="style_label_category"
                        >その他</label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="style_main_modalFooter">
                  <div className="style_modal_result">
                    該当10つ
                  </div>
                  <button 
                    className="style_modal_btn"
                    onClick={narrowFlavor}
                  >この条件で絞り込む</button>
                </div>
              </form>
              {/* ここまでformエリア */}
              <div className="style_modal_headerwapper">
                フレイバーを絞り込む
                <button       
                  className="style_modal_header_close"
                  onClick={isModal_off}
                >
                  <img src="images/design/batumark.svg"></img>
                </button>
              </div>
            </div>
          </div>
        </main>
       
       {/* footer */}
        <footer className="footer_contents_wraper">
          <div className="footer_wave">
            <img />
          </div>
          <div className="footer_contents_main">
            <div className="footer_contents_logo">TARUSHIRU</div>
            <small>©TARUSHIRU inc.</small>
          </div>
        </footer>

      </div>

      {/* main */}
      


      {/* footer */}
    </>
  );
}


export default Searchflavors;