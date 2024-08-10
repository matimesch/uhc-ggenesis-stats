import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import './sheetData.css'

const getImageUrl = (playerName) => {
    // Generate URL based on player name
    return `https://mc-heads.net/avatar/${encodeURIComponent(playerName)}`;
  };
  
  const SheetsData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://uhc-ggenesis-stats.vercel.app/api/sheet-data');
          
          const transformedData = response.data.map(item => {
            const matches = parseInt(item[1], 10);
            const wins = parseInt(item[2], 10);
            const winrate = matches > 0 ? ((wins / matches) * 100).toFixed(2) : '0.00'; 
  
            return {
              image: getImageUrl(item[0]),
              player: item[0],
              matches,
              wins,
              winrate: `${winrate}%`
            };
          });
          
          setData(transformedData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const columns = React.useMemo(
      () => [
        {
          Header: 'Skin',
          accessor: 'image',
          Cell: ({ value }) => <img src={value} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        },
        {
          Header: 'Player',
          accessor: 'player',
        },
        {
          Header: 'Matches',
          accessor: 'matches',
        },
        {
          Header: 'Wins',
          accessor: 'wins',
        },
        {
          Header: 'Winrate',
          accessor: 'winrate',
        },
      ],
      []
    );
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    );
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      
      <div className="table-container">
        {/* <h1>Web oficial de estadísticas de GGeneSiS</h1> */}
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
};

export default SheetsData;
