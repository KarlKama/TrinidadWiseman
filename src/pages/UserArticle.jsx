import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';
import ArticleTemplate from '../components/ArticleTemplate';

const UserArticle = () => {
    const { id } = useParams();
    const [articleData, setArticleData] = useState([]);
    const url = "https://midaiganes.irw.ee/api/list/" + id;
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
        /* {/* <div>
          <h1>{articleData.title}</h1>
          <h5 dangerouslySetInnerHTML={{ __html: articleData.intro }}/>
          <img src={articleData.image.large} alt={articleData.image.alt} />
          <label>{articleData.title}</label>
          <br />
          <div dangerouslySetInnerHTML={{ __html: articleData.body }} />
          <div>
            {
            articleData.tags.map(tag => 
              <div className={styles.tag}>
                {tag}
              </div>
            )}
          </div>
        </div> } */
    )
}

export default UserArticle