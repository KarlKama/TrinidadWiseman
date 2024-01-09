import React, {useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import styles from "../css/Table.module.css";
import SortButton from '../components/SortButton';
import { Link } from 'react-router-dom';

const Table = () => {
    const [tableData, setTableData] = useState([]);
    const [tableDataCopy, setTableDataCopy] = useState([]);
    const [pagesShownList, setPagesShownList] = useState([1,2,3,4,5])

    const [tableDataLength, setTableDatalength] = useState(0);
    const lengthPerPage = 10;
    const totalPages = Math.ceil(tableDataLength / lengthPerPage);

    const nrOfShownButtons = 5;

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * lengthPerPage;
    const endIndex = startIndex + lengthPerPage;
    const currentList = tableData.slice(startIndex, endIndex);
    
    
    const url = "https://midaiganes.irw.ee/api/list?limit=500";

    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          setTableData(json.list);
          setTableDataCopy(json.list);
          setTableDatalength(json.list.length)
          setLoading(false);
        })
      console.log("Fetching done!");
    }, [url]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp*1000);
        const formattedDate = date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return formattedDate
    }

    const determinePagesShownList = (page) => {
        if (page <= 2) {
            setPagesShownList(addToArray(1));
        } 
        else if (page <= (totalPages - 2) ) {
            setPagesShownList(addToArray(page-2))
        }
        else {
            setPagesShownList(addToArray(totalPages - 4))
        }
    }

    const addToArray = (start) => {

        let pagesArray = [];
        let counter = start
        for(let i = 0; i < nrOfShownButtons; i++){
            pagesArray.push(counter);
            counter++;
        }
        return pagesArray;
    }

    const parseDateOfBirthFromPersonalCode = (personalCode) => {
        const personalCodeString = personalCode.toString();
        const date = personalCodeString.substring(5,7);
        const month = personalCodeString.substring(3,5);
        const year = personalCodeString.substring(1,3);
        const millenium = (personalCodeString.substring(0,0) === 3 || 4) ? "19" : "20";
        return date+"."+month+"."+millenium+year;
    }

    const [expandedRows, setExpandedRows] = useState([]);
    const openExtraInfo = (id) => {
        setExpandedRows((prevExpandedRows) => {
            if (prevExpandedRows.includes(id)) {
                // If the row is already expanded, collapse it
                return prevExpandedRows.filter((rowId) => rowId !== id);
            } else {
                // If the row is not expanded, expand it
                //return [...prevExpandedRows, id]; //kui tahta jätta teised lahti
                return [id];
            }
        });  
    }

    const handleGender = (gender) => {
        if (gender === "m") {
            return "Mees";
        } else {
            return "Naine"
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        determinePagesShownList(newPage);
    };

    if (loading) {
      return <Spinner/>
    }

    return (
        <div>
            <table className="table table-striped table-hover ">
            <thead className='table-dark'>
                <SortButton 
                    tableData={tableData} 
                    setTableData={setTableData} 
                    tableDataCopy={tableDataCopy}
                />
            </thead>
            <tbody>
                {
                currentList.map(user =>
                    <React.Fragment key={user.id}>
                        <tr  onClick={() => openExtraInfo(user.id)}>
                            <th scope="row">{user.firstname}</th> 
                            <td>{user.surname}</td>
                            <td>{handleGender(user.sex)}</td>
                            <td>{parseDateOfBirthFromPersonalCode(user.personal_code)}</td>
                            <td>{user.phone}</td>
                        </tr>
                        {expandedRows.includes(user.id) && (
                        <tr>
                            <td colSpan="5">
                                <div className={styles.infoContainer}>
                                    <div>
                                        <img src={user.image.small} alt={user.image.alt} className={styles.infoImage}/>
                                    </div>
                                    <div className={styles.infoBox}>
                                        <div dangerouslySetInnerHTML={{ __html: user.intro }}/>
                                        <Link to={{ pathname: '/article/'+user.id }}>
                                            <button className={styles.additionalInfoBtn}>Loe rohkem</button>
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        )}
                    </React.Fragment> 
                    
                )}
                
                
            </tbody>
            </table>
            <div className={styles.buttonWrapper}>
                {(currentPage > 1) &&
                <button onClick={() => handlePageChange(currentPage - 1)} className={styles.navigationButton}>
                    &#60;
                </button>
                }
                {
                pagesShownList.map((index) => 
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`${styles.navigationButton} ${currentPage === index ? styles.active : ''}` }
                    >
                        {index}
                    </button>
                    )
                }

                {(currentPage < totalPages) &&
                <button onClick={() => handlePageChange(currentPage + 1)} className={styles.navigationButton}>
                    &#62;
                </button>
                }

                
            </div>

        </div>
    )
}

export default Table