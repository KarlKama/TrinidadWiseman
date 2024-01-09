import React from 'react'
import styles from "../css/Article.module.css";

const ArticleTemplate = ({articleData}) => {
  return (
    <div>
          <h1>{articleData.title}</h1>
          <h5 dangerouslySetInnerHTML={{ __html: articleData.intro }}/>
          { <img className={styles.image} src={articleData.image.large} alt={articleData.image.alt} /> }
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
        </div>
  )
}

export default ArticleTemplate