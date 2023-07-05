import React, { useEffect } from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import Header from "@/components/Header";
import Home from "@/views/Home";
import Explore from "@/views/Explore";
import Category from "@/views/Category";
import Setting from "@/views/Setting";
import Writing from "@/views/Writing";
import Article from "@/views/ArticlePage";
import BackTop from "@/components/BackTop";
// import Login from "./views/Login";
import Admin from "@/views/Admin";
import Search from "@/views/Search";
import CategoryManage from "@/views/Admin/Category";
import CoverManage from "@/views/Admin/CoverManage";
import EditorDemo from "@/views/EditorDemo";
import "./assets/fonts/iconfont";

const App: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    if (document.body.scrollTop || document.documentElement.scrollTop > 0) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  return (
    <div className="App">
      {location.pathname !== "/login" && <Header />}
      <BackTop />
      <Route path="/" exact component={Home} />
      <Route path="/explore" component={Explore} />
      {/* <Route path="/login" component={Login} /> */}
      <Route path="/category" exact render={() => <Redirect to="/category/all" />} />
      <Route path="/category/:category" exact component={Category} />
      <Route path="/setting" exact component={Setting} />
      <Route path="/writing" exact component={Writing} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/search" exact component={Search} />
      <Route path="/admin/category" exact component={CategoryManage} />
      <Route path="/admin/coverManage" exact component={CoverManage} />
      <Route path="/writing/:articleId" exact component={Writing} />
      <Route path="/article/:articleId" exact component={Article} />
      <Route path="/editor-demo" exact component={EditorDemo} />
    </div>
  );
};

export default App;
