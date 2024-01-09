import React, {useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import ArticleTemplate from '../components/ArticleTemplate';

const Article = () => {
    const [articleData, setArticleData] = useState([]);
    const url = "https://midaiganes.irw.ee/api/list/972d2b8a";
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          setArticleData(json);
          setLoading(false);
        })
      console.log("Fetching done!");
    }, [url]);

    console.log(articleData)

    if (loading) {
      return <Spinner/>
    }

    return (
      <ArticleTemplate
        articleData={articleData} />
    )
}

export default Article