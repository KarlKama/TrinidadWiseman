import React, {useState} from 'react';

const SortButton = ({tableData, setTableData, tableDataCopy}) => {

    const [sortOrder, setSortOrder] = useState(null);

    const toggleSortOrder = (attribute) => {
        let newSortOrder = null;
    
        if (sortOrder === null) {
          // Original unsorted order
          newSortOrder = 'asc';
        } else if (sortOrder === 'asc') {
          newSortOrder = 'desc';
        } else {
          newSortOrder = null;
        }
    
        setSortOrder(newSortOrder);
    
        if (newSortOrder === null) {
            // Reset to original unsorted order
            setTableData(tableDataCopy);
          } else {
            const sortedList = [...tableData].sort((a, b) => {
                const valueA = a[attribute];
                const valueB = b[attribute];
        
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                  // If both values are numeric, compare numerically
                  return newSortOrder === 'asc' ? valueA - valueB : valueB - valueA;
                } else {
                  // Compare as strings
                  const stringValueA = String(valueA).toUpperCase();
                  const stringValueB = String(valueB).toUpperCase();
        
                  return newSortOrder === 'asc' ? stringValueA.localeCompare(stringValueB) : stringValueB.localeCompare(stringValueA);
                }
              });
      
            setTableData(sortedList);
        }
      };
    
    
  return (
    <tr>
        <th scope="col" onClick={() => toggleSortOrder('firstname')}>Eesnimi</th>
        <th scope="col" onClick={() => toggleSortOrder('surname')}>Perekonnanimi</th>
        <th scope="col" onClick={() => toggleSortOrder('sex')}>Sugu</th>
        <th scope="col" onClick={() => toggleSortOrder('date')}>Sünnikuupäev</th>
        <th scope="col" onClick={() => toggleSortOrder('phone')}>Telefon</th>
    </tr>
  )
}

export default SortButton