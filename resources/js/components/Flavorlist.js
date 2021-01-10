import React from 'react';
import {Link, useParams} from 'react-router-dom';

import Navbar from './Navbar';

const Flavorlist = () => {
  return(
    <>
      <Navbar />
      <div className="flavor_list_main">
        <div className="flavor_category_contents">
          <div className="flavor_category_content">
            <h2 className="category_title">フルーツ系</h2>
            <ul className="flavor_category_lists">
              <li>
                <Link to="/Flavor/1">
                  <span>▶レモン</span>
                </Link>
              </li>
              <li>
                <Link to="/Flavor/2">
                  <span>▶ダブルアップル</span>
                </Link>
              </li>
              <li>
                <Link to="/Flavor/3">
                  <span>▶オレンジ</span>
                </Link>
              </li>
              <li>
                <Link to="/Flavor/4">
                  <span>▶かぼす</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flavor_category_content">
            <h2 className="category_title">スパイス系</h2>
            <ul className="flavor_category_lists">
              <li>
                <Link to="/">
                  <span>▶レモン</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>▶ダブルアップル</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>▶オレンジ</span>
                </Link>
              </li>

            </ul>
          </div>

          <div className="flavor_category_content">
            <h2 className="category_title">カクテル系</h2>
            <ul className="flavor_category_lists">
              <li>
                <Link to="/">
                  <span>▶レモン</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>▶ダブルアップル</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>▶オレンジ</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flavor_category_content">
            <h2 className="category_title">その他</h2>
            <ul className="flavor_category_lists">
              <li>
                <Link to="/">
                  <span>▶レモン</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>▶ダブルアップル</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span>▶オレンジ</span>
                </Link>
              </li>
            </ul>
          </div>
        
        </div>
      </div>


    </>
  )
}

export default Flavorlist;